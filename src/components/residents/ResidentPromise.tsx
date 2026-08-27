"use client";

import React from "react";
import { FadeIn } from "@/components/ui/FadeIn";
import { cn } from "@/lib/utils";

export interface ResidentPromiseProps {
  id?: string;
  className?: string;
}

export function ResidentPromise({ id, className }: ResidentPromiseProps) {
  const PILLARS = [
    {
      num: "01",
      category: "PAYMENTS",
      tagline: "Know exactly what you owe.",
      desc: "One transparent invoice each month including room rent, high-speed Wi-Fi, electricity, and housekeeping with zero unexpected line items.",
    },
    {
      num: "02",
      category: "SUPPORT",
      tagline: "Get help when something needs fixing.",
      desc: "Direct digital maintenance dispatch with tracked technician resolution times instead of following up on chaotic messaging groups.",
    },
    {
      num: "03",
      category: "COMMUNITY",
      tagline: "Feel connected to the people around you.",
      desc: "Thoughtful neighbors who respect quiet work hours, shared dinners on the terrace, and neighborhood weekend activities.",
    },
  ];

  return (
    <section
      id={id}
      className={cn(
        "py-16 sm:py-24 max-w-6xl mx-auto w-full flex flex-col gap-12 sm:gap-16 scroll-mt-28",
        className
      )}
    >
      <FadeIn>
        <div className="flex flex-col gap-3 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-roomly-green" />
            <span className="text-[11px] uppercase tracking-widest font-bold text-roomly-muted">
              THE ONGOING PROMISE
            </span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-roomly-dark tracking-tight leading-tight">
            Stanza Living stays with you after you move in.
          </h2>

          <p className="text-sm sm:text-base text-roomly-muted leading-relaxed pt-1">
            Finding the room is only the beginning. Your home needs support, communication and simple tools every day.
          </p>
        </div>
      </FadeIn>

      {/* Three Large Editorial Statement Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
        {PILLARS.map((p, idx) => (
          <FadeIn key={p.num} delay={idx * 0.1}>
            <div className="p-8 rounded-3xl bg-[#FDFCF8] border border-roomly-border hover:border-roomly-dark/40 transition-all duration-300 shadow-sm flex flex-col justify-between gap-6 h-full select-none">
              <div className="flex items-center justify-between border-b border-roomly-border pb-4">
                <span className="font-display font-black text-xs uppercase tracking-widest text-roomly-green">
                  {p.num} · {p.category}
                </span>
                <span className="w-2 h-2 rounded-full bg-roomly-lime" />
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="font-display font-bold text-2xl text-roomly-dark leading-snug">
                  &ldquo;{p.tagline}&rdquo;
                </h3>
                <p className="text-xs text-roomly-muted leading-relaxed">
                  {p.desc}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
