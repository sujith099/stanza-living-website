"use client";

import React, { useState } from "react";
import { Briefcase, GraduationCap, Compass, HelpCircle, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

export interface OnboardingLocationStepProps {
  routine: "Work" | "College" | "Both" | "Not sure yet";
  locationName: string;
  onRoutineChange: (routine: "Work" | "College" | "Both" | "Not sure yet") => void;
  onLocationChange: (loc: string) => void;
  className?: string;
}

const ROUTINE_OPTIONS = [
  { id: "Work" as const, label: "Work / Office", icon: Briefcase },
  { id: "College" as const, label: "College / University", icon: GraduationCap },
  { id: "Both" as const, label: "Both (Hybrid)", icon: Compass },
  { id: "Not sure yet" as const, label: "Not sure yet", icon: HelpCircle },
];

const SUGGESTIONS = [
  "Indiranagar 100ft Road",
  "Manyata Tech Park",
  "Koramangala 4th Block",
  "HSR Sector 1",
  "Bagmane Tech Park",
  "Electronic City Phase 1",
];

export function OnboardingLocationStep({
  routine,
  locationName,
  onRoutineChange,
  onLocationChange,
  className,
}: OnboardingLocationStepProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);

  return (
    <div className={cn("flex flex-col gap-6 w-full select-none", className)}>
      <div className="flex flex-col gap-1.5">
        <h2 className="font-display font-black text-3xl sm:text-4xl text-roomly-dark">
          Where will your everyday happen?
        </h2>
        <p className="text-xs sm:text-sm text-roomly-muted">
          Tell us about your daily commute so we can prioritize locations near your routine.
        </p>
      </div>

      {/* Routine pills */}
      <div className="grid grid-cols-2 gap-3">
        {ROUTINE_OPTIONS.map((opt) => {
          const Icon = opt.icon;
          const isSelected = routine === opt.id;

          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onRoutineChange(opt.id)}
              className={cn(
                "p-4 rounded-2xl border-2 text-left transition-all flex items-center gap-3 cursor-pointer",
                isSelected
                  ? "bg-roomly-dark text-roomly-lime border-roomly-dark shadow"
                  : "bg-[#FDFCF8] text-roomly-dark border-roomly-border hover:border-roomly-dark/40"
              )}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span className="font-display font-bold text-xs sm:text-sm">
                {opt.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Optional Location Search */}
      <div className="flex flex-col gap-2 relative">
        <label className="text-xs font-bold uppercase tracking-wider text-roomly-dark">
          Specific Workplace or Campus (Optional)
        </label>

        <div className="relative flex items-center">
          <input
            type="text"
            value={locationName}
            onChange={(e) => {
              onLocationChange(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            placeholder="e.g. Manyata Tech Park, Indiranagar, IIT Campus..."
            className="w-full px-4 py-3 rounded-2xl bg-white border border-roomly-border focus:border-roomly-dark focus:ring-2 focus:ring-roomly-dark/10 text-xs sm:text-sm text-roomly-dark placeholder:text-roomly-muted/60 outline-none"
          />
          <MapPin className="w-4 h-4 text-roomly-muted absolute right-4 pointer-events-none" />
        </div>

        {/* Mock Suggestions dropdown */}
        {showSuggestions && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            <span className="text-[10px] text-roomly-muted uppercase tracking-wider font-semibold mr-1">
              Popular hubs:
            </span>
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => {
                  onLocationChange(s);
                  setShowSuggestions(false);
                }}
                className="px-2.5 py-1 rounded-full bg-roomly-bg border border-roomly-border text-[11px] text-roomly-dark hover:bg-roomly-cream/60 transition-colors cursor-pointer"
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
