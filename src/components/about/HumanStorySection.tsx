"use client";

import React from "react";
import Image from "next/image";
import { FadeIn } from "@/components/ui/FadeIn";
import { cn } from "@/lib/utils";

export interface HumanStorySectionProps {
  className?: string;
}

export function HumanStorySection({ className }: HumanStorySectionProps) {
  return (
    <section
      className={cn(
        "p-8 sm:p-14 lg:p-18 rounded-3xl bg-[#FDFCF8] border border-roomly-border shadow-sm flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-14",
        className
      )}
    >
      {/* Left Narrative */}
      <div className="flex flex-col gap-6 max-w-xl">
        <FadeIn>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-roomly-green" />
            <span className="text-[11px] uppercase tracking-widest font-bold text-roomly-muted">
              ORIGIN NOTE
            </span>
          </div>

          <h3 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-roomly-dark tracking-tight leading-tight mt-2">
            It started with a room.
          </h3>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="font-display font-bold text-lg sm:text-xl text-roomly-dark border-l-2 border-roomly-green pl-4 space-y-1">
            <div>Not a perfect room.</div>
            <div>Not a luxury apartment.</div>
            <div className="text-roomly-green">Just a place that felt right.</div>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="flex flex-col gap-4 text-xs sm:text-sm text-roomly-muted leading-relaxed">
            <p>
              Roomly began as an idea around a simple question: why should discovering a place to sleep, work, and build your life in a new city feel like an adversarial puzzle?
            </p>
            <p>
              We wanted to replace suspicious classified ads with high-fidelity architectural documentation, transparent pricing, verified wifi speeds, and neighbors who respect both deep work and shared dinners.
            </p>
          </div>
        </FadeIn>
      </div>

      {/* Right Lived-in Photo */}
      <FadeIn delay={0.25} className="w-full lg:w-[460px] flex-shrink-0">
        <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-xl border border-roomly-border bg-roomly-cream/60">
          <Image
            src="https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=1000&auto=format&fit=crop"
            alt="Warm morning light spilling into a quiet study desk and bedroom"
            fill
            sizes="(max-width: 1024px) 100vw, 460px"
            className="object-cover"
          />
        </div>
      </FadeIn>
    </section>
  );
}
