"use client";

import React from "react";
import { PROTOTYPE_STATS } from "@/data/about";
import { FadeIn } from "@/components/ui/FadeIn";
import { cn } from "@/lib/utils";

export interface ImpactStatsProps {
  className?: string;
}

export function ImpactStats({ className }: ImpactStatsProps) {
  return (
    <section
      className={cn(
        "p-8 sm:p-12 rounded-3xl bg-[#FDFCF8] border border-roomly-border shadow-sm flex flex-col gap-8",
        className
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-roomly-border pb-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-roomly-green" />
          <span className="text-[11px] uppercase tracking-widest font-bold text-roomly-muted">
            PROTOTYPE SNAPSHOT
          </span>
        </div>
        <span className="text-xs text-roomly-muted">
          Active beta footprint across key tech hubs
        </span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center sm:text-left">
        {PROTOTYPE_STATS.map((stat, idx) => (
          <FadeIn key={stat.label} delay={idx * 0.08}>
            <div className="flex flex-col gap-1">
              <span className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-roomly-dark">
                {stat.value}
              </span>
              <span className="font-display font-bold text-xs sm:text-sm text-roomly-dark">
                {stat.label}
              </span>
              <span className="text-[11px] text-roomly-muted">
                {stat.sub}
              </span>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
