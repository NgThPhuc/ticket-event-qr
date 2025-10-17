"use server";

import { headers } from "next/headers";
import { stripe } from "../lib/stripe";

export async function createStripeConnectAccountLink(account: string) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin") || "";

    // Tạo link onboarding
    const accountLink = await stripe.accountLinks.create({
      account,
      refresh_url: `${origin}/connect/refresh/${account}`, // URL nếu hết hạn
      return_url: `${origin}/connect/return/${account}`, // URL sau khi xong
      type: "account_onboarding",
    });

    return { url: accountLink.url };
  } catch (error) {
    console.error(
      "An error occurred when calling the Stripe API to create an account link:",
      error
    );
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unknown error occurred");
  }
}