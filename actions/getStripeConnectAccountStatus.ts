"use server";

import { stripe } from "../lib/stripe";

export type AccountStatus = {
  isActive: boolean;
  requiresInformation: boolean;
  requirements: {
    currently_due: string[];
    eventually_due: string[];
    past_due: string[];
  };
  chargesEnabled: boolean;
  payoutsEnabled: boolean;
};

export async function getStripeConnectAccountStatus(
  stripeAccountId: string
): Promise<AccountStatus> {
  if (!stripeAccountId) {
    throw new Error("No Stripe account ID provided");
  }

  try {
    const account = await stripe.accounts.retrieve(stripeAccountId);

    return {
      isActive:
        account.details_submitted && // Đã submit thông tin
        !account.requirements?.currently_due?.length, // Không còn yêu cầu
      requiresInformation: !!(
        account.requirements?.currently_due?.length || // Cần ngay
        account.requirements?.eventually_due?.length || // Cần sau
        account.requirements?.past_due?.length // Quá hạn
      ),
      requirements: {
        currently_due: account.requirements?.currently_due || [],
        eventually_due: account.requirements?.eventually_due || [],
        past_due: account.requirements?.past_due || [],
      },
      chargesEnabled: account.charges_enabled, // Có thể nhận thanh toán
      payoutsEnabled: account.payouts_enabled, // Có thể nhận payout
    };
  } catch (error) {
    console.error("Error fetching Stripe Connect account status:", error);
    throw new Error("Failed to fetch Stripe Connect account status");
  }
}