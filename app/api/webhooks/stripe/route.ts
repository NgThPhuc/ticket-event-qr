import { headers } from "next/headers";
import Stripe from "stripe";
import { StripeCheckoutMetaData } from "../../../../actions/createStripeCheckoutSession";
import { api } from "../../../../convex/_generated/api";
import { getConvexClient } from "../../../../lib/convex";
import { stripe } from "../../../../lib/stripe";

export async function POST(req: Request) {
  console.log("Webhook received");

  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature") as string;

  console.log("Webhook signature:", signature ? "Present" : "Missing");
  // 1. Verify webhook signature (bảo mật)
  let event: Stripe.Event;

  try {
    console.log("Attempting to construct webhook event");
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
    console.log("Webhook event constructed successfully:", event.type);
  } catch (err) {
    console.error("Webhook construction failed:", err);
    return new Response(`Webhook Error: ${(err as Error).message}`, { status: 400 });
  }

  const convex = getConvexClient();
  // 2. Xử lý event "checkout.session.completed"
  if (event.type === "checkout.session.completed") {
    console.log("Processing checkout.session.completed");
    const session = event.data.object as Stripe.Checkout.Session;
    const metadata = session.metadata as Partial<StripeCheckoutMetaData>;
    // Lấy thông tin từ session
    const paymentIntentId = session.payment_intent?.toString() ?? "unknown_intent";
    const quantity = Math.max(1, Number(metadata.quantity ?? 1));
    const amountTotal = Number(session.amount_total ?? 0);
    console.log("Session metadata:", metadata);
    console.log("Convex client:", convex);
    console.log("Payment Intend ID: ", paymentIntentId);
    console.log("Quantity: ", quantity);
    console.log("Amount Total: ", amountTotal)
    // 3. Validate metadata
    if (!metadata.eventId || !metadata.userId || !metadata.waitingListId) {
      console.error("Missing required metadata");
      return new Response("Missing required metadata", { status: 400 });
    }
    // 4. Gọi mutation tạo vé
    await convex.mutation(api.events.purchaseTicket, {
      eventId: metadata.eventId,
      userId: metadata.userId,
      quantity,
      waitingListId: metadata.waitingListId, // Bắt buộc phải có
      paymentInfo: {
        paymentIntentId,
        amount: amountTotal
      }
    });

    // try {
    //   const result = await convex.mutation(api.events.purchaseTicket, {
    //     eventId: metadata.eventId,
    //     userId: metadata.userId,
    //     waitingListId: metadata.waitingListId,
    //     paymentInfo: {
    //       paymentIntentId: session.payment_intent as string,
    //       amount: session.amount_total ?? 0,
    //     },
    //   });
    //   console.log("Purchase ticket mutation completed:", result);
    // } catch (error) {
    //   console.error("Error processing webhook:", error);
    //   return new Response("Error processing webhook", { status: 500 });
    // }
  }

  return new Response(null, { status: 200 });
}