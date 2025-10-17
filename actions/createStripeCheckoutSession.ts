"use server";

import { auth } from "@clerk/nextjs/server";
import { api } from "../convex/_generated/api";
import { Id } from "../convex/_generated/dataModel";
import { DURATIONS } from "../convex/constants";
import baseUrl from "../lib/baseUrl";
import { getConvexClient } from "../lib/convex";
import { stripe } from "../lib/stripe";

export type StripeCheckoutMetaData = {
  eventId: Id<"events">;
  userId: string;
  waitingListId?: Id<"waitingList"> | null;
  quantity: string;
};

export async function createStripeCheckoutSession({
  eventId,
  quantity,
  waitingListId,
}: {
  eventId: Id<"events">;
  quantity: number,
  waitingListId?: Id<"waitingList">;
}) {
  const { userId } = await auth();
  if (!userId) throw new Error("Not authenticated");

  const convex = getConvexClient();

  // 1. Lấy thông tin event
  const event = await convex.query(api.events.getById, { eventId });
  if (!event) throw new Error("Event not found");

  // 2. Kiểm tra offer còn valid không
  const queuePosition = await convex.query(api.waitingList.getQueuePosition, {
    eventId,
    userId,
  });

  if (!queuePosition || queuePosition.status !== "offered") throw new Error("No valid ticket offer found");
  // 3. Lấy Stripe Connect ID của seller
  const seller = await convex.query(api.users.getUserById, { userId: event.userId });
  const stripeConnectId = seller?.stripeConnectId;
  if (!stripeConnectId) throw new Error("Stripe Connect ID not found for owner of the event!");

  if (!queuePosition.offerExpiresAt) throw new Error("Ticket offer has no expiration date");

  const qty = Math.max(1, Number(quantity) || 1);
  // 4. Chuẩn bị metadata (sẽ được gửi lại qua webhook)
  const metadata: StripeCheckoutMetaData = {
    eventId,
    userId,
    waitingListId: queuePosition._id,
    quantity: String(qty),
  };

  // 5. Tạo Stripe Checkout Session
  const session = await stripe.checkout.sessions.create(
    {
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: event.name,
              description: event.description,
            },
            unit_amount: Math.round(event.price * 100),
          },
          quantity: qty,
        },
      ],
      payment_intent_data: {
        application_fee_amount: Math.round(event.price * 100 * 0.01), // 1% fee
      },
      expires_at: Math.floor(Date.now() / 1000) + DURATIONS.TICKET_OFFER / 1000, // 30 minutes (stripe checkout minimum expiration time)
      mode: "payment",
      success_url: `${baseUrl}/tickets/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/event/${eventId}`,
      metadata,
    },
    {
      stripeAccount: stripeConnectId, // CONNECT ACCOUNT của seller
    }
  );

  return { sessionId: session.id, sessionUrl: session.url! };
}