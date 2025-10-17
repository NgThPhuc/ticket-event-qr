"use client";

import { Ban } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { refundEventTickets } from "../actions/refundEventTickets";
import { Id } from "../convex/_generated/dataModel";

export default function CancelEventButton({
  eventId,
}: {
  eventId: Id<"events">;
}) {
  const [isCancelling, setIsCancelling] = useState(false);
  const router = useRouter();

  const handleCancel = async () => {
    if (
      !confirm(
        "Are you sure you want to cancel this event? All tickets will be refunded and the event will be cancelled permanently."
      )
    ) {
      return;
    }

    setIsCancelling(true);
    try {
      // refundEventTickets will handle both refunding AND cancelling the event
      const result = await refundEventTickets(eventId);

      const message = result.refundedCount > 0
        ? `Event cancelled successfully. ${result.refundedCount} ticket(s) have been refunded.`
        : "Event cancelled successfully.";

      toast.success("Event cancelled", {
        description: message,
      });
      router.push("/seller/events");
    } catch (error) {
      console.error("Failed to cancel event:", error);
      toast.error("Error", {
        description: error instanceof Error
          ? error.message
          : "Failed to cancel event. Please try again.",
      });
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <button
      onClick={handleCancel}
      disabled={isCancelling}
      className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <Ban className="w-4 h-4" />
      <span>{isCancelling ? "Processing..." : "Cancel Event"}</span>
    </button>
  );
}