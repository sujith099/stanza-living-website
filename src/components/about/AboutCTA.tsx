"use client";

import React from "react";
import Link from "next/link";
import { RoomlyButton } from "@/components/ui/RoomlyButton";
import { cn } from "@/lib/utils";

export interface AboutCTAProps {
  className?: string;
}

export function AboutCTA({ className }: AboutCTAProps) {
  return (
    <section
      className={cn(
        "p-8 sm:p-14 lg:p-20 rounded-3xl bg-roomly-dark text-roomly-cream relative overflow-hidden shadow-2xl border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-8",
        className
      )}
    >
      <div className="absolute top-0 right-0 w-80 h-80 bg-roomly-green/25 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-xl flex flex-col gap-3">
        <span className="text-[11px] uppercase tracking-widest font-semibold text-roomly-lime">
          Begin Discovery
        </span>

        <h3 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
          Ready to find
          <br />
          your place?
        </h3>

        <p className="text-xs sm:text-sm text-roomly-cream/70 leading-relaxed pt-1">
          Start with a neighbourhood. End with somewhere that feels like home.
        </p>
      </div>

      <div className="relative z-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-shrink-0">
        <Link href="/rooms">
          <RoomlyButton
            variant="lime"
            size="lg"
            shape="pill"
            withArrow
            arrowStyle="circle"
            className="text-xs sm:text-sm font-semibold shadow-2xl px-8 py-4 justify-center"
          >
            Explore rooms
          </RoomlyButton>
        </Link>

        <Link href="/locations">
          <RoomlyButton
            variant="outline"
            size="lg"
            shape="pill"
            className="text-xs sm:text-sm font-semibold text-white border-white/20 hover:bg-white/10 px-8 py-4 justify-center"
          >
            Explore locations
          </RoomlyButton>
        </Link>
      </div>
    </section>
  );
}
