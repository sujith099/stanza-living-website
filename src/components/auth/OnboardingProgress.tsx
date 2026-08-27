"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface OnboardingProgressProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

export function OnboardingProgress({
  currentStep,
  totalSteps,
  className,
}: OnboardingProgressProps) {
  const percentage = Math.min(Math.round((currentStep / totalSteps) * 100), 100);

  return (
    <div className={cn("w-full flex flex-col gap-4 select-none", className)}>
      <div className="flex items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-1 group">
          <span className="font-display font-black text-xl tracking-wider text-roomly-dark">
            ROOMLY
          </span>
          <span className="text-roomly-lime font-bold text-lg group-hover:rotate-45 transition-transform">
            *
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <span className="font-display font-black text-xs uppercase tracking-widest text-roomly-muted">
            0{currentStep} / 0{totalSteps}
          </span>

          <Link
            href="/rooms"
            className="text-xs text-roomly-muted hover:text-roomly-dark transition-colors"
          >
            Skip for now
          </Link>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 rounded-full bg-roomly-border/70 overflow-hidden">
        <div
          style={{ width: `${percentage}%` }}
          className="h-full bg-roomly-dark rounded-full transition-all duration-500 ease-out"
        />
      </div>
    </div>
  );
}
