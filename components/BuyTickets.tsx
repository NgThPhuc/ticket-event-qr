"use client";

import { Minus, Plus, ShoppingCart } from "lucide-react"; // Import thêm icons
import { useState } from "react";
import { createStripeCheckoutSession } from "../actions/createStripeCheckoutSession";
import { Id } from "../convex/_generated/dataModel";

export function BuyTickets({
  eventId,
  remaining,
  perCustomerLimit,
}: {
  eventId: Id<"events">;
  remaining: number;
  perCustomerLimit?: number | null;
}) {
  const [qty, setQty] = useState(1);
  const max = Math.max(1, Math.min(remaining, perCustomerLimit ?? remaining));

  const handleIncrement = () => {
    setQty(prev => Math.min(max, prev + 1));
  };

  const handleDecrement = () => {
    setQty(prev => Math.max(1, prev - 1));
  };

  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-700 font-medium">Select Quantity</span>
          <span className="text-sm text-gray-500">
            {remaining} tickets remaining
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={handleDecrement}
              className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-50"
              disabled={qty <= 1}
            >
              <Minus className="w-4 h-4 text-gray-600" />
            </button>

            <input
              type="number"
              min={1}
              max={max}
              value={qty}
              onChange={(e) => {
                const v = Number(e.target.value) || 1;
                setQty(Math.min(max, Math.max(1, v)));
              }}
              className="w-16 text-center border rounded-md px-2 py-1"
            />

            <button
              onClick={handleIncrement}
              className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-50"
              disabled={qty >= max}
            >
              <Plus className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          <button
            className="flex items-center gap-2 px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={qty < 1 || qty > max}
            onClick={async () => {
              const { sessionUrl } = await createStripeCheckoutSession({
                eventId,
                quantity: qty,
              });
              window.location.href = sessionUrl;
            }}
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Buy Now</span>
          </button>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Price per ticket:</span>
          <span>$199.99</span>
        </div>
        <div className="flex justify-between font-medium mt-2">
          <span>Total:</span>
          <span>${(199.99 * qty).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}