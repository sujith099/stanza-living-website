"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Calendar } from "lucide-react";
import { Property } from "@/data/properties";
import { RoomlyButton } from "@/components/ui/RoomlyButton";
import { StanzaSelect, StanzaSelectOption } from "@/components/ui/StanzaSelect";
import { cn } from "@/lib/utils";

export interface BookingPanelProps {
  property: Property;
  selectedDate: string;
  onDateChange: (date: string) => void;
  onScheduleVisit: () => void;
  onBookRoom: () => void;
  className?: string;
}

export function BookingPanel({
  property,
  selectedDate,
  onDateChange,
  onScheduleVisit,
  onBookRoom,
  className,
}: BookingPanelProps) {
  return (
    <>
      {/* Desktop Sticky Panel */}
      <div
        className={cn(
          "hidden lg:flex flex-col gap-6 bg-[#FDFCF8] border border-roomly-border rounded-3xl p-7 shadow-xl sticky top-28",
          className
        )}
      >
        {/* Pricing Header */}
        <div className="flex flex-col gap-1">
          <div className="flex items-baseline gap-1.5">
            <span className="font-display font-bold text-3xl sm:text-4xl text-roomly-dark tracking-tight">
              ₹{property.rent.toLocaleString("en-IN")}
            </span>
            <span className="text-xs sm:text-sm text-roomly-muted font-normal">
              / {property.rentPeriod}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-roomly-green font-semibold mt-1">
            <span className="w-2 h-2 rounded-full bg-roomly-lime animate-pulse" />
            <span>{property.availability}</span>
          </div>
        </div>

        {/* Move-in Date Picker */}
        <div className="flex flex-col gap-1.5 pt-4 border-t border-roomly-border">
          <label
            htmlFor="panel-movein-date"
            className="text-[11px] uppercase tracking-wider font-semibold text-roomly-muted flex items-center gap-1.5"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Move-in date</span>
          </label>
          <StanzaSelect
            id="panel-movein-date"
            options={property.availableDates.map((date) => ({
              value: date,
              label: new Date(date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              }),
            }))}
            value={selectedDate}
            onChange={onDateChange}
            size="md"
            shape="rounded"
            triggerClassName="w-full bg-roomly-bg text-xs font-semibold"
          />
        </div>

        {/* Primary Booking CTAs */}
        <div className="flex flex-col gap-3 pt-2">
          <Link href={`/booking/${property.slug}`} className="w-full">
            <RoomlyButton
              variant="lime"
              size="lg"
              shape="pill"
              withArrow
              arrowStyle="circle"
              className="w-full justify-center text-sm font-semibold shadow-md py-3.5"
            >
              Book this room
            </RoomlyButton>
          </Link>

          <RoomlyButton
            variant="outline"
            size="md"
            shape="pill"
            onClick={onScheduleVisit}
            className="w-full justify-center text-xs py-2.5 bg-white hover:bg-roomly-bg border-roomly-border text-roomly-dark"
          >
            Schedule a private visit
          </RoomlyButton>
        </div>

        {/* Reassurance Micro-Copy */}
        <div className="flex items-center justify-center gap-2 pt-3 border-t border-roomly-border text-[11px] text-roomly-muted">
          <ShieldCheck className="w-4 h-4 text-roomly-green flex-shrink-0" />
          <span>No hidden booking charges · 100% verified</span>
        </div>
      </div>

      {/* Mobile Sticky Bottom Booking Bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-roomly-border px-5 py-3.5 shadow-2xl flex items-center justify-between gap-4">
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1">
            <span className="font-display font-bold text-xl text-roomly-dark">
              ₹{property.rent.toLocaleString("en-IN")}
            </span>
            <span className="text-[11px] text-roomly-muted font-normal">
              /{property.rentPeriod}
            </span>
          </div>
          <span className="text-[10px] font-medium text-roomly-green">
            {property.availability}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onScheduleVisit}
            className="px-3.5 py-2 rounded-full border border-roomly-border text-xs font-semibold text-roomly-dark bg-white"
          >
            Visit
          </button>

          <RoomlyButton
            variant="lime"
            size="sm"
            shape="pill"
            onClick={onBookRoom}
            className="px-5 py-2 text-xs font-semibold"
          >
            Book now
          </RoomlyButton>
        </div>
      </div>
    </>
  );
}
