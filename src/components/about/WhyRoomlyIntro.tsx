"use client";

import React from "react";
import { FadeIn } from "@/components/ui/FadeIn";
import { cn } from "@/lib/utils";

export interface WhyRoomlyIntroProps {
  id?: string;
  className?: string;
}

export function WhyRoomlyIntro({ id, className }: WhyRoomlyIntroProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-16 sm:py-24 max-w-4xl mx-auto w-full flex flex-col gap-8 scroll-mt-28",
        className
      )}
    >
      <FadeIn>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-roomly-green" />
          <span className="text-[11px] uppercase tracking-widest font-bold text-roomly-muted">
            WHY STANZA LIVING
          </span>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <h2 className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl text-roomly-dark tracking-tight leading-[1.12]">
          Finding a room shouldn&apos;t feel like a full-time job.
        </h2>
      </FadeIn>

      <FadeIn delay={0.2}>
        <div className="flex flex-col gap-6 text-base sm:text-lg lg:text-xl text-roomly-muted leading-relaxed max-w-3xl pt-2">
          <p>
            For students, young professionals, and people starting somewhere new, finding a room often means jumping between unverified listings, frantic broker calls, conflicting prices, and outdated photos.
          </p>
          <p className="font-display font-semibold text-roomly-dark text-xl sm:text-2xl lg:text-3xl leading-snug">
            Stanza Living brings the process into one place.
          </p>
        </div>
      </FadeIn>
    </section>
  );
}
