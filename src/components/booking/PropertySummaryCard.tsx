"use client";

import React from "react";
import Image from "next/image";
import { Star, ShieldCheck, Calendar, Home } from "lucide-react";
import { Property } from "@/data/properties";
import { PropertyRoomOption } from "@/data/bookings";
import { cn } from "@/lib/utils";

export interface PropertySummaryCardProps {
  property: Property;
  selectedRoom: PropertyRoomOption;
  selectedDate: string;
  className?: string;
}

export function PropertySummaryCard({
  property,
  selectedRoom,
  selectedDate,
  className,
}: PropertySummaryCardProps) {
  const deposit = 25000;
  const bookingFee = 1000;
  const totalDueToday = deposit + bookingFee;

  return (
    <aside
      className={cn(
        "p-6 sm:p-7 rounded-3xl bg-[#FDFCF8] border border-roomly-border shadow-md flex flex-col gap-6 select-none",
        className
      )}
    >
      {/* Property Thumbnail & Title */}
      <div className="flex gap-4 items-center">
        <div className="relative w-20 h-20 rounded-2xl overflow-hidden shadow-sm flex-shrink-0 bg-roomly-cream/50">
          <Image
            src={property.images[0]}
            alt={property.name}
            fill
            sizes="80px"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-1 text-[11px] text-amber-500 font-bold">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>{property.rating}</span>
            <span className="text-roomly-muted font-normal">
              ({property.reviewCount} reviews)
            </span>
          </div>

          <h3 className="font-display font-bold text-lg text-roomly-dark">
            {property.name}
          </h3>

          <span className="text-xs text-roomly-muted">
            {property.neighbourhood}, {property.city}
          </span>
        </div>
      </div>

      {/* Selected Room & Move-in Date Callout */}
      <div className="p-4 rounded-2xl bg-roomly-bg border border-roomly-border flex flex-col gap-2 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-roomly-muted flex items-center gap-1.5">
            <Home className="w-3.5 h-3.5 text-roomly-green" />
            <span>Selected Room</span>
          </span>
          <span className="font-bold text-roomly-dark">
            {selectedRoom.name} ({selectedRoom.type})
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-roomly-muted flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-roomly-green" />
            <span>Target Move-in</span>
          </span>
          <span className="font-bold text-roomly-dark">
            {selectedDate}
          </span>
        </div>
      </div>

      {/* Cost Summary Snapshot */}
      <div className="flex flex-col gap-2.5 py-3 border-y border-roomly-border text-xs">
        <div className="flex items-center justify-between">
          <span className="text-roomly-muted">Monthly Rent (All-inclusive)</span>
          <span className="font-bold text-roomly-dark text-sm">
            ₹{selectedRoom.price.toLocaleString("en-IN")} / mo
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-roomly-muted">Security Deposit (Refundable)</span>
          <span className="font-semibold text-roomly-dark">
            ₹{deposit.toLocaleString("en-IN")}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-roomly-muted">One-time Reservation Fee</span>
          <span className="font-semibold text-roomly-dark">
            ₹{bookingFee.toLocaleString("en-IN")}
          </span>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-roomly-border/70 text-sm font-bold text-roomly-dark">
          <span>Amount due today</span>
          <span className="font-display font-black text-xl text-roomly-dark">
            ₹{totalDueToday.toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      {/* Reassurance Badge */}
      <div className="flex items-start gap-2 text-[11px] text-roomly-muted leading-relaxed">
        <ShieldCheck className="w-4 h-4 text-roomly-green flex-shrink-0 mt-0.5" />
        <span>
          You&apos;re reviewing before confirming. Nothing is charged until you submit your booking request.
        </span>
      </div>
    </aside>
  );
}
