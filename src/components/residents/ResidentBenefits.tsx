"use client";

import React from "react";
import { RESIDENT_BENEFITS } from "@/data/residents";
import { FadeIn } from "@/components/ui/FadeIn";
import { cn } from "@/lib/utils";

export interface ResidentBenefitsProps {
  className?: string;
}

export function ResidentBenefits({ className }: ResidentBenefitsProps) {
  return (
    <section className={cn("flex flex-col gap-12 sm:gap-16 w-full", className)}>
      <FadeIn>
        <div className="flex flex-col gap-2 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-roomly-green" />
            <span className="text-[11px] uppercase tracking-widest font-bold text-roomly-muted">
              RETENTION STANDARD
            </span>
          </div>

          <h3 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-roomly-dark tracking-tight leading-tight">
            Why residents stay
            <br />
            with Stanza Living.
          </h3>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {RESIDENT_BENEFITS.map((benefit, idx) => (
          <FadeIn key={benefit.title} delay={idx * 0.1}>
            <div className="p-8 sm:p-10 rounded-3xl bg-[#FDFCF8] border border-roomly-border hover:border-roomly-dark/50 transition-all duration-300 shadow-sm flex flex-col justify-between gap-6 h-full select-none">
              <div className="flex items-center justify-between border-b border-roomly-border pb-4">
                <span className="font-display font-black text-xs uppercase tracking-widest text-roomly-green">
                  0{idx + 1} · BENEFIT
                </span>
                <span className="w-2 h-2 rounded-full bg-roomly-lime" />
              </div>

              <div className="flex flex-col gap-3">
                <h4 className="font-display font-bold text-2xl sm:text-3xl text-roomly-dark leading-snug">
                  {benefit.title}
                </h4>
                <p className="text-xs sm:text-sm text-roomly-muted leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
