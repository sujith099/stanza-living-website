"use client";

import React from "react";
import { ONBOARDING_CITIES } from "@/data/auth";
import { cn } from "@/lib/utils";

export interface OnboardingCityStepProps {
  selectedCity: string;
  onSelectCity: (city: string) => void;
  className?: string;
}

export function OnboardingCityStep({
  selectedCity,
  onSelectCity,
  className,
}: OnboardingCityStepProps) {
  return (
    <div className={cn("flex flex-col gap-6 w-full select-none", className)}>
      <div className="flex flex-col gap-1.5">
        <h2 className="font-display font-black text-3xl sm:text-4xl text-roomly-dark">
          Where are you looking?
        </h2>
        <p className="text-xs sm:text-sm text-roomly-muted">
          Choose the city where your new chapter begins.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {ONBOARDING_CITIES.map((c) => {
          const isSelected = selectedCity.toLowerCase() === c.name.toLowerCase();

          return (
            <button
              key={c.id}
              type="button"
              onClick={() => onSelectCity(c.name)}
              className={cn(
                "p-5 rounded-2xl border-2 text-left transition-all duration-200 cursor-pointer flex flex-col justify-between gap-2",
                isSelected
                  ? "bg-roomly-dark text-roomly-cream border-roomly-dark shadow-md scale-[1.01]"
                  : "bg-[#FDFCF8] text-roomly-dark border-roomly-border hover:border-roomly-dark/40"
              )}
            >
              <div className="flex items-center justify-between">
                <span className="font-display font-bold text-lg">
                  {c.name}
                </span>
                <span
                  className={cn(
                    "text-[10px] uppercase font-bold px-2 py-0.5 rounded-full",
                    isSelected ? "bg-white/10 text-roomly-lime" : "bg-roomly-bg text-roomly-muted"
                  )}
                >
                  {c.state}
                </span>
              </div>
              <p
                className={cn(
                  "text-xs leading-relaxed",
                  isSelected ? "text-roomly-cream/70" : "text-roomly-muted"
                )}
              >
                {c.tagline}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
