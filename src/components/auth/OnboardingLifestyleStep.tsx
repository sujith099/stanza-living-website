"use client";

import React from "react";
import { Check } from "lucide-react";
import { LIFESTYLE_TAGS } from "@/data/auth";
import { cn } from "@/lib/utils";

export interface OnboardingLifestyleStepProps {
  selectedTags: string[];
  onToggleTag: (tag: string) => void;
  className?: string;
}

export function OnboardingLifestyleStep({
  selectedTags,
  onToggleTag,
  className,
}: OnboardingLifestyleStepProps) {
  return (
    <div className={cn("flex flex-col gap-6 w-full select-none", className)}>
      <div className="flex flex-col gap-1.5">
        <h2 className="font-display font-black text-3xl sm:text-4xl text-roomly-dark">
          What matters most?
        </h2>
        <p className="text-xs sm:text-sm text-roomly-muted">
          Select all the living priorities that define your routine.
        </p>
      </div>

      {/* Selectable lifestyle chips */}
      <div className="flex flex-wrap gap-2.5">
        {LIFESTYLE_TAGS.map((tag) => {
          const isSelected = selectedTags.includes(tag);

          return (
            <button
              key={tag}
              type="button"
              onClick={() => onToggleTag(tag)}
              className={cn(
                "px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 border",
                isSelected
                  ? "bg-roomly-dark text-roomly-lime border-roomly-dark shadow scale-[1.02]"
                  : "bg-[#FDFCF8] text-roomly-dark border-roomly-border hover:bg-roomly-bg"
              )}
            >
              {isSelected ? (
                <Check className="w-3.5 h-3.5 text-roomly-lime" />
              ) : (
                <span className="w-1.5 h-1.5 rounded-full bg-roomly-muted/50" />
              )}
              <span>{tag}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
