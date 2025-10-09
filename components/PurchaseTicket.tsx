"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { Minus, Plus, ShoppingCart, Ticket } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createStripeCheckoutSession } from "../actions/createStripeCheckoutSession";
import { api } from "../convex/_generated/api";
import { Id } from "../convex/_generated/dataModel";
import ReleaseTicket from "./ReleaseTicket";

export default function PurchaseTicket({ eventId }: { eventId: Id<"events"> }) {
  const router = useRouter();
  const { user } = useUser();
  const [quantity, setQuantity] = useState(1);
  const event = useQuery(api.events.getById, { eventId });
  const queuePosition = useQuery(api.waitingList.getQueuePosition, {
    eventId,
    userId: user?.id ?? "",
  });

  const availability = useQuery(api.events.getEventAvailability, {
    eventId
  });

  const [timeRemaining, setTimeRemaining] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const offerExpiresAt = queuePosition?.offerExpiresAt ?? 0;
  const isExpired = Date.now() > offerExpiresAt;

  useEffect(() => {
    const calculateTimeRemaining = () => {
      if (isExpired) {
        setTimeRemaining("Expired");
        return;
      }

      const diff = offerExpiresAt - Date.now();
      const minutes = Math.floor(diff / 1000 / 60);
      const seconds = Math.floor((diff / 1000) % 60);

      if (minutes > 0) {
        setTimeRemaining(
          `${minutes} minute${minutes === 1 ? "" : "s"} ${seconds} second${seconds === 1 ? "" : "s"
          }`
        );
      } else {
        setTimeRemaining(`${seconds} second${seconds === 1 ? "" : "s"}`);
      }
    };

    calculateTimeRemaining();
    const interval = setInterval(calculateTimeRemaining, 1000);
    return () => clearInterval(interval);
  }, [offerExpiresAt, isExpired]);

  const handlePurchase = async () => {
    if (!user || !queuePosition) return;

    try {
      setIsLoading(true);
      const { sessionUrl } = await createStripeCheckoutSession({
        eventId,
        quantity,
        waitingListId: queuePosition._id
      });

      if (sessionUrl) {
        router.push(sessionUrl);
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user || !queuePosition || queuePosition.status !== "offered") {
    return null;
  }
  const maxTickets = availability ? availability.totalTickets - availability.purchasedCount : 0;
  const price = event?.price || 0;

  return (
    // <div className="bg-white p-6 rounded-xl shadow-lg border border-amber-200">
    //   <div className="space-y-4">
    //     <div className="bg-white rounded-lg p-6 border border-gray-200">
    //       <div className="flex flex-col gap-4">
    //         <div className="flex items-center gap-3">
    //           <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
    //             <Ticket className="w-6 h-6 text-amber-600" />
    //           </div>
    //           <div>
    //             <h3 className="text-lg font-semibold text-gray-900">
    //               Ticket Reserved
    //             </h3>
    //             <p className="text-sm text-gray-500">
    //               Expires in {timeRemaining}
    //             </p>
    //           </div>
    //         </div>

    //         <div className="text-sm text-gray-600 leading-relaxed">
    //           A ticket has been reserved for you. Complete your purchase before
    //           the timer expires to secure your spot at this event.
    //         </div>
    //       </div>
    //     </div>

    //     <button
    //       onClick={handlePurchase}
    //       disabled={isExpired || isLoading}
    //       className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-4 rounded-lg font-bold shadow-md hover:from-amber-600 hover:to-amber-700 transform hover:scale-[1.02] transition-all duration-200 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed disabled:hover:scale-100 text-lg"
    //     >
    //       {isLoading
    //         ? "Redirecting to checkout..."
    //         : "Purchase Your Ticket Now →"}
    //     </button>

    //     <div className="mt-4">
    //       <ReleaseTicket eventId={eventId} waitingListId={queuePosition._id} />
    //     </div>
    //   </div>
    // </div>

    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
        .spinner {
          border-top-color: transparent;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>

      {/* <div className="bg-slate-100 min-h-screen flex items-center justify-center p-4"> */}
      <div className="bg-slate-100 p-4">
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 max-w-md w-full animate-fadeIn space-y-6">

          {/* Section 1: Reservation Notice */}
          <div className="border border-amber-200 bg-amber-50 rounded-xl p-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                <Ticket className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Ticket Reserved
                </h3>
                <p className={`text-sm font-medium ${isExpired ? 'text-red-600' : 'text-gray-600'}`}>
                  Expires in {timeRemaining}
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed mt-3">
              Your ticket is held. Complete the purchase before the timer runs out to secure your spot.
            </p>
          </div>

          {/* Section 2: Quantity Selector */}
          <div className="border border-gray-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-900 font-bold text-base">Select Quantity</span>
              <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                {maxTickets} tickets left
              </span>
            </div>
            <div className="flex items-center justify-between">
              <button
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                disabled={quantity <= 1 || isLoading}
                className="w-11 h-11 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 disabled:opacity-50 transition-all duration-200 active:scale-90"
              >
                <Minus className="w-5 h-5" />
              </button>
              <span className="text-3xl font-extrabold text-gray-900">{quantity}</span>
              <button
                onClick={() => setQuantity(prev => Math.min(maxTickets, prev + 1))}
                disabled={quantity >= maxTickets || isLoading}
                className="w-11 h-11 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 disabled:opacity-50 transition-all duration-200 active:scale-90"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Section 3: Price Summary */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Price per ticket:</span>
              <span>${price.toFixed(2)}</span>
            </div>
            <div className="w-full border-t border-slate-200"></div>
            <div className="flex justify-between items-center font-bold text-lg">
              <span className="text-gray-900">Total:</span>
              <span className="text-amber-600">
                ${(price * quantity).toFixed(2)}
              </span>
            </div>
          </div>

          {/* Section 4: Actions */}
          <div className="space-y-3 pt-2">
            <button
              onClick={handlePurchase}
              disabled={isExpired || isLoading || quantity < 1 || quantity > maxTickets}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3.5 rounded-xl font-bold shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/40 transform hover:-translate-y-0.5 transition-all duration-300 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:shadow-none text-base flex items-center justify-center gap-3"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white rounded-full spinner"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5" />
                  <span>{`Purchase ${quantity} Ticket${quantity > 1 ? "s" : ""}`}</span>
                </>
              )}
            </button>

            {!isExpired && (
              <ReleaseTicket eventId={eventId} waitingListId={queuePosition._id} />
            )}

            <div className="text-xs text-gray-500 text-center pt-1">
              All prices include VAT if applicable.
            </div>
          </div>

        </div>
      </div>
    </>
  );
}