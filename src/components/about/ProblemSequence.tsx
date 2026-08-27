"use client";

import React from "react";
import { BROKEN_STEPS } from "@/data/about";
import { FadeIn } from "@/components/ui/FadeIn";
import { cn } from "@/lib/utils";

export interface ProblemSequenceProps {
  className?: string;
}

export function ProblemSequence({ className }: ProblemSequenceProps) {
  return (
    <section
      className={cn(
        "p-8 sm:p-14 lg:p-20 rounded-3xl bg-roomly-dark text-roomly-cream relative overflow-hidden shadow-2xl border border-white/10 flex flex-col gap-12 sm:gap-16",
        className
      )}
    >
      {/* Section Header */}
      <div className="flex flex-col gap-3 max-w-xl">
        <span className="text-[11px] uppercase tracking-widest font-semibold text-roomly-coral">
          The Problem
        </span>
        <h3 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
          The old way is broken.
        </h3>
        <p className="text-xs sm:text-sm text-roomly-cream/70 leading-relaxed pt-1">
          Every urban tenant recognizes this cycle. It drains energy, creates anxiety, and wastes weeks of valuable focus.
        </p>
      </div>

      {/* 6-Step Visual Sequence Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {BROKEN_STEPS.map((step, idx) => (
          <FadeIn key={step.number} delay={idx * 0.08}>
            <div className="flex flex-col gap-3 p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-roomly-coral/40 transition-colors h-full">
              <div className="flex items-center justify-between">
                <span className="font-display font-black text-2xl text-roomly-coral/80">
                  {step.number}
                </span>
                <span className="w-2 h-2 rounded-full bg-roomly-coral/40" />
              </div>

              <h4 className="font-display font-bold text-lg text-white leading-snug">
                {step.title}
              </h4>

              <p className="text-xs text-roomly-cream/60 leading-relaxed">
                {step.detail}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
