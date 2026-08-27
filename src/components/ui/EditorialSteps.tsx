"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { FadeIn } from "./FadeIn";

export interface StepItem {
  number: string;
  title: string;
  description: string;
}

const DEFAULT_STEPS: StepItem[] = [
  {
    number: "01",
    title: "Choose where.",
    description: "Pick your city, neighbourhood, budget and move-in date.",
  },
  {
    number: "02",
    title: "Compare properly.",
    description: "See photos, amenities, pricing and availability in one place.",
  },
  {
    number: "03",
    title: "Move in.",
    description: "Book your room and get support through the move.",
  },
];

export interface EditorialStepsProps {
  steps?: StepItem[];
  className?: string;
}

export function EditorialSteps({
  steps = DEFAULT_STEPS,
  className,
}: EditorialStepsProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 lg:gap-12",
        className
      )}
    >
      {steps.map((step, idx) => (
        <FadeIn
          key={step.number}
          delay={0.1 * idx}
          className="flex flex-col gap-4 border-t border-roomly-border pt-6 sm:pt-8"
        >
          {/* Step Number */}
          <span className="font-display font-bold text-sm sm:text-base text-roomly-muted tracking-wider">
            {step.number}
          </span>

          {/* Step Title */}
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-roomly-dark tracking-tight">
            {step.title}
          </h3>

          {/* Step Description */}
          <p className="text-sm sm:text-base text-roomly-muted leading-relaxed max-w-sm">
            {step.description}
          </p>
        </FadeIn>
      ))}
    </div>
  );
}
