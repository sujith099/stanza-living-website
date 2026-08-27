"use client";

import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BookingProgressProps {
  currentStep: 1 | 2 | 3;
  className?: string;
}

export function BookingProgress({ currentStep, className }: BookingProgressProps) {
  const STEPS = [
    { num: 1, label: "Date & Room" },
    { num: 2, label: "Your Details" },
    { num: 3, label: "Review & Confirm" },
  ];

  return (
    <div className={cn("w-full flex items-center justify-between select-none", className)}>
      {STEPS.map((s, idx) => {
        const isDone = currentStep > s.num;
        const isActive = currentStep === s.num;

        return (
          <React.Fragment key={s.num}>
            <div className="flex items-center gap-2.5">
              <div
                className={cn(
                  "w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-display font-bold transition-all",
                  isDone
                    ? "bg-roomly-green text-white"
                    : isActive
                    ? "bg-roomly-dark text-roomly-lime ring-4 ring-roomly-lime/30"
                    : "bg-roomly-bg text-roomly-muted border border-roomly-border"
                )}
              >
                {isDone ? <Check className="w-3.5 h-3.5" /> : `0${s.num}`}
              </div>

              <span
                className={cn(
                  "text-xs font-semibold transition-colors",
                  isActive
                    ? "text-roomly-dark font-bold"
                    : isDone
                    ? "text-roomly-green"
                    : "text-roomly-muted hidden sm:inline"
                )}
              >
                {s.label}
              </span>
            </div>

            {idx < STEPS.length - 1 && (
              <div
                className={cn(
                  "flex-grow h-px mx-3 sm:mx-4 transition-colors",
                  currentStep > s.num ? "bg-roomly-green" : "bg-roomly-border"
                )}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
