"use client";

import React from "react";
import { TIMELINE_STAGES } from "@/data/about";
import { FadeIn } from "@/components/ui/FadeIn";
import { cn } from "@/lib/utils";

export interface RoomlyTimelineProps {
  className?: string;
}

export function RoomlyTimeline({ className }: RoomlyTimelineProps) {
  return (
    <section className={cn("flex flex-col gap-12 sm:gap-16 w-full", className)}>
      <FadeIn>
        <div className="flex flex-col gap-2 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-roomly-green" />
            <span className="text-[11px] uppercase tracking-widest font-bold text-roomly-muted">
              MILESTONES
            </span>
          </div>

          <h3 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-roomly-dark tracking-tight leading-tight">
            How we&apos;re getting there.
          </h3>
          <p className="text-xs sm:text-sm text-roomly-muted max-w-md">
            Step-by-step progress from a simple observation to a curated multi-city living standard.
          </p>
        </div>
      </FadeIn>

      {/* Timeline Progression Cards */}
      <div className="relative flex flex-col gap-8 md:gap-0 pl-6 md:pl-0">
        {/* Central Connecting Line on Desktop */}
        <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-px bg-roomly-border -translate-x-1/2" />

        {/* Mobile Connecting Line */}
        <div className="md:hidden absolute left-2.5 top-4 bottom-4 w-px bg-roomly-border" />

        {TIMELINE_STAGES.map((stage, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <FadeIn key={stage.step} delay={idx * 0.1}>
              <div
                className={cn(
                  "relative flex flex-col md:flex-row items-start md:items-center w-full mb-8 md:mb-12",
                  isEven ? "md:flex-row-reverse" : ""
                )}
              >
                {/* Content Box */}
                <div
                  className={cn(
                    "w-full md:w-[45%] p-6 sm:p-7 rounded-2xl bg-[#FDFCF8] border border-roomly-border shadow-sm",
                    isEven ? "md:text-right" : "md:text-left"
                  )}
                >
                  <span className="text-[11px] font-bold text-roomly-green uppercase tracking-wider">
                    Stage {stage.step}
                  </span>

                  <h4 className="font-display font-bold text-lg sm:text-xl text-roomly-dark mt-1">
                    {stage.title}
                  </h4>

                  <p className="font-semibold text-xs text-roomly-dark mt-1">
                    &ldquo;{stage.tagline}&rdquo;
                  </p>

                  <p className="text-xs text-roomly-muted leading-relaxed mt-2">
                    {stage.description}
                  </p>
                </div>

                {/* Node Center Dot */}
                <div className="absolute -left-6 md:left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-roomly-dark border-4 border-roomly-bg text-roomly-lime shadow flex items-center justify-center z-10" />

                {/* Empty Half Space for balance */}
                <div className="hidden md:block w-[45%]" />
              </div>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}
