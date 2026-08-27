"use client";

import React from "react";
import { FUTURE_VISION_ITEMS } from "@/data/about";
import { FadeIn } from "@/components/ui/FadeIn";
import { cn } from "@/lib/utils";

export interface FutureVisionProps {
  className?: string;
}

export function FutureVision({ className }: FutureVisionProps) {
  return (
    <section
      className={cn(
        "p-8 sm:p-14 lg:p-20 rounded-3xl bg-roomly-dark text-roomly-cream relative border border-white/10 flex flex-col gap-12 sm:gap-16 shadow-lg",
        className
      )}
    >

      {/* Header */}
      <div className="relative z-10 flex flex-col gap-3 max-w-2xl">
        <span className="text-[11px] uppercase tracking-widest font-semibold text-roomly-lime">
          What&apos;s Next
        </span>

        <h3 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
          Where we&apos;re going.
        </h3>

        <p className="text-xs sm:text-sm lg:text-base text-roomly-cream/70 leading-relaxed pt-1">
          Roomly is building a better way for people to discover, choose and experience where they live — from the first search to the day they feel at home.
        </p>
      </div>

      {/* 5 Future Initiative Areas */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {FUTURE_VISION_ITEMS.map((item, idx) => (
          <FadeIn key={item.title} delay={idx * 0.08}>
            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 flex flex-col gap-2 h-full">
              <span className="text-[10px] uppercase font-bold text-roomly-lime tracking-widest">
                0{idx + 1}
              </span>
              <h4 className="font-display font-bold text-lg text-white">
                {item.title}
              </h4>
              <p className="text-xs text-roomly-cream/60 leading-relaxed">
                {item.description}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
