"use client";

import React from "react";
import Link from "next/link";
import { RoomlyButton } from "@/components/ui/RoomlyButton";
import { cn } from "@/lib/utils";

export interface BookingCTAProps {
  propertyName: string;
  propertySlug?: string;
  onBookRoom?: () => void;
  onScheduleVisit: () => void;
  className?: string;
}

export function BookingCTA({
  propertyName,
  propertySlug,
  onBookRoom,
  onScheduleVisit,
  className,
}: BookingCTAProps) {
  return (
    <section
      className={cn(
        "p-8 sm:p-12 lg:p-16 rounded-3xl bg-roomly-dark text-roomly-cream relative overflow-hidden shadow-2xl border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-8",
        className
      )}
    >
      <div className="absolute top-0 right-0 w-80 h-80 bg-roomly-green/25 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-xl flex flex-col gap-3">
        <span className="text-[11px] uppercase tracking-widest font-semibold text-roomly-lime">
          Next Step
        </span>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
          Could you see yourself here?
        </h2>
        <p className="text-xs sm:text-sm text-roomly-cream/70 leading-relaxed">
          Choose your move-in date and reserve {propertyName}. No hidden booking fees, 48-hour refundable deposits, and verified room keys.
        </p>
      </div>

      <div className="relative z-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-shrink-0">
        <Link href={propertySlug ? `/booking/${propertySlug}` : "/rooms"}>
          <RoomlyButton
            variant="lime"
            size="lg"
            shape="pill"
            withArrow
            arrowStyle="circle"
            className="text-xs sm:text-sm font-semibold shadow-xl justify-center"
          >
            Book this room
          </RoomlyButton>
        </Link>

        <RoomlyButton
          variant="outline"
          size="lg"
          shape="pill"
          onClick={onScheduleVisit}
          className="text-xs sm:text-sm font-semibold text-white border-white/20 hover:bg-white/10 justify-center"
        >
          Schedule a visit
        </RoomlyButton>
      </div>
    </section>
  );
}
