"use server";

import { auth } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api";
import { stripe } from "../lib/stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not set");
}

if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
  throw new Error("NEXT_PUBLIC_CONVEX_URL is not set");
}

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

export async function createStripeConnectCustomer() {
  const { userId } = await auth(); // lấy user id từ clerk

  if (!userId) {
    throw new Error("Not authenticated");
  }

  // Kiểm tra đã có account chưa
  const existingStripeConnectId = await convex.query(
    api.users.getUsersStripeConnectId,
    {
      userId,
    }
  );

  if (existingStripeConnectId) {
    return { account: existingStripeConnectId };
  }

  // Tạo Stripe Connect Express Account
  const account = await stripe.accounts.create({
    type: "express", // Express account - Stripe quản lý UI
    capabilities: {
      card_payments: { requested: true }, // Nhận thanh toán card
      transfers: { requested: true }, // Nhận tiền transfer
    },
  });

  // Update user with stripe connect id
  // Lưu stripeConnectId vào database
  await convex.mutation(api.users.updateOrCreateUserStripeConnectId, {
    userId,
    stripeConnectId: account.id,
  });

  return { account: account.id };
}