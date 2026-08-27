"use client";

import React, { useState } from "react";
import { PriceBreakdownAccordion } from "./PriceBreakdownAccordion";
import { PaymentMethodSelector } from "./PaymentMethodSelector";
import { RoomlyButton } from "@/components/ui/RoomlyButton";
import { GuestDetails, PropertyRoomOption } from "@/data/bookings";
import { Property } from "@/data/properties";
import { cn } from "@/lib/utils";

export interface BookingReviewStepProps {
  property: Property;
  room: PropertyRoomOption;
  moveInDate: string;
  guestDetails: GuestDetails;
  onConfirm: () => void;
  isLoading: boolean;
  className?: string;
}

export function BookingReviewStep({
  property,
  room,
  moveInDate,
  guestDetails,
  onConfirm,
  isLoading,
  className,
}: BookingReviewStepProps) {
  const [paymentMethod, setPaymentMethod] = useState<"UPI" | "Card" | "Net banking">("UPI");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreeAccuracy, setAgreeAccuracy] = useState(false);

  const canConfirm = agreeTerms && agreeAccuracy && !isLoading;

  return (
    <div className={cn("flex flex-col gap-8 w-full select-none", className)}>
      {/* Reservation Overview Card */}
      <div className="p-5 rounded-2xl bg-roomly-bg border border-roomly-border flex flex-col gap-2 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-roomly-muted">Reserving</span>
          <span className="font-bold text-roomly-dark">
            {property.name} · {room.name}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-roomly-muted">Move-in Date</span>
          <span className="font-semibold text-roomly-dark">{moveInDate}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-roomly-muted">Guest</span>
          <span className="font-semibold text-roomly-dark">
            {guestDetails.fullName || "Guest"} ({guestDetails.phone || "Phone on file"})
          </span>
        </div>
      </div>

      {/* Price breakdown */}
      <PriceBreakdownAccordion
        monthlyRent={room.price}
        deposit={25000}
        bookingFee={1000}
      />

      {/* Payment Method */}
      <PaymentMethodSelector
        selectedMethod={paymentMethod}
        onSelectMethod={setPaymentMethod}
      />

      {/* Checkboxes */}
      <div className="p-5 rounded-2xl bg-[#FDFCF8] border border-roomly-border flex flex-col gap-3 text-xs">
        <label className="flex items-start gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
            className="mt-0.5 accent-roomly-dark"
          />
          <span className="text-roomly-dark font-medium leading-relaxed">
            I agree to Stanza Living&apos;s{" "}
            <span className="underline font-bold hover:text-roomly-green cursor-pointer">
              booking terms and cancellation policy
            </span>
            .
          </span>
        </label>

        <label className="flex items-start gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            checked={agreeAccuracy}
            onChange={(e) => setAgreeAccuracy(e.target.checked)}
            className="mt-0.5 accent-roomly-dark"
          />
          <span className="text-roomly-dark font-medium leading-relaxed">
            I confirm that the guest information provided is accurate and matches my government ID.
          </span>
        </label>
      </div>

      {/* Confirm CTA */}
      <div className="flex flex-col gap-2">
        <RoomlyButton
          type="button"
          variant={canConfirm ? "lime" : "primary"}
          size="lg"
          shape="pill"
          withArrow
          arrowStyle="circle"
          disabled={!canConfirm}
          onClick={onConfirm}
          className="w-full justify-center text-xs sm:text-sm font-semibold py-4 shadow-xl"
        >
          {isLoading ? "Confirming your booking..." : "Confirm booking request →"}
        </RoomlyButton>

        <span className="text-center text-[11px] text-roomly-muted">
          Your room will be held for 48 hours pending property host verification
        </span>
      </div>
    </div>
  );
}
