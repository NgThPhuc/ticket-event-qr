"use server";

import { api } from "../convex/_generated/api";
import { Id } from "../convex/_generated/dataModel";
import { getConvexClient } from "../lib/convex";
import { stripe } from "../lib/stripe";

export async function refundEventTickets(eventId: Id<"events">) {
  const convex = getConvexClient();

  // Get event details
  const event = await convex.query(api.events.getById, { eventId });
  if (!event) throw new Error("Event not found");

  // Get event owner's Stripe Connect ID
  const stripeConnectId = await convex.query(
    api.users.getUsersStripeConnectId,
    {
      userId: event.userId,
    }
  );

  if (!stripeConnectId) {
    throw new Error("Stripe Connect ID not found");
  }

  // Get all valid tickets for this event
  const tickets = await convex.query(api.tickets.getValidTicketsForEvent, {
    eventId,
  });

  if (tickets.length === 0) {
    // No tickets to refund, just cancel the event
    await convex.mutation(api.events.cancelEvent, { eventId });
    return { success: true, refundedCount: 0 };
  }

  // Group tickets by payment intent ID to avoid duplicate refunds
  const ticketsByPaymentIntent = new Map<string, typeof tickets>();
  tickets.forEach((ticket) => {
    if (ticket.paymentIntentId) {
      const existing = ticketsByPaymentIntent.get(ticket.paymentIntentId) || [];
      existing.push(ticket);
      ticketsByPaymentIntent.set(ticket.paymentIntentId, existing);
    }
  });

  // Process refunds for each unique payment intent
  const refundResults = await Promise.allSettled(
    Array.from(ticketsByPaymentIntent.entries()).map(
      async ([paymentIntentId, relatedTickets]) => {
        try {
          // Issue refund through Stripe (once per payment intent)
          await stripe.refunds.create(
            {
              payment_intent: paymentIntentId,
              reason: "requested_by_customer",
            },
            {
              stripeAccount: stripeConnectId,
            }
          );

          // Update all tickets associated with this payment intent to refunded
          await Promise.all(
            relatedTickets.map((ticket) =>
              convex.mutation(api.tickets.updateTicketStatus, {
                ticketId: ticket._id,
                status: "refunded",
              })
            )
          );

          return {
            success: true,
            paymentIntentId,
            ticketCount: relatedTickets.length,
          };
        } catch (error) {
          console.error(
            `Failed to refund payment intent ${paymentIntentId}:`,
            error
          );
          return { success: false, paymentIntentId, error };
        }
      }
    )
  );

  // Check if all refunds were successful
  const failedRefunds = refundResults.filter(
    (result) => result.status === "rejected" || !result.value.success
  );

  if (failedRefunds.length > 0) {
    console.error("Failed refunds:", failedRefunds);
    const failedCount = failedRefunds.length;
    throw new Error(
      `Failed to refund ${failedCount} payment(s). Please check the logs and try again.`
    );
  }

  // Calculate total refunded tickets
  const totalRefunded = refundResults.reduce((sum, result) => {
    if (result.status === "fulfilled" && result.value.success && result.value.ticketCount) {
      return sum + result.value.ticketCount;
    }
    return sum;
  }, 0);

  // Cancel the event after all refunds are successful
  await convex.mutation(api.events.cancelEvent, { eventId });

  return { success: true, refundedCount: totalRefunded };
}