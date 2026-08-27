"use client";

import React from "react";
import Link from "next/link";
import { RoomlyButton } from "@/components/ui/RoomlyButton";
import { cn } from "@/lib/utils";

export interface LocationsCTAProps {
  cityName: string;
  className?: string;
}

export function LocationsCTA({ cityName, className }: LocationsCTAProps) {
  return (
    <section
      className={cn(
        "p-8 sm:p-14 lg:p-18 rounded-3xl bg-roomly-dark text-roomly-cream relative overflow-hidden shadow-2xl border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-8",
        className
      )}
    >
      <div className="absolute top-0 right-0 w-80 h-80 bg-roomly-green/25 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-xl flex flex-col gap-3">
        <span className="text-[11px] uppercase tracking-widest font-semibold text-roomly-lime">
          Next Step
        </span>

        <h3 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
          Found your
          <br />
          neighbourhood?
        </h3>

        <p className="text-xs sm:text-sm text-roomly-cream/70 leading-relaxed pt-1">
          Now let&apos;s find your room. Filter by move-in date, budget, and private or shared quarters in {cityName}.
        </p>
      </div>

      <div className="relative z-10 flex-shrink-0">
        <Link href={`/rooms?city=${encodeURIComponent(cityName)}`}>
          <RoomlyButton
            variant="lime"
            size="lg"
            shape="pill"
            withArrow
            arrowStyle="circle"
            className="text-xs sm:text-sm font-semibold shadow-2xl px-8 py-4"
          >
            Explore available rooms
          </RoomlyButton>
        </Link>
      </div>
    </section>
  );
}
