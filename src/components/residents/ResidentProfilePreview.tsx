"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";
import { SAMPLE_RESIDENT } from "@/data/residents";
import { cn } from "@/lib/utils";

export interface ResidentProfilePreviewProps {
  className?: string;
}

export function ResidentProfilePreview({
  className,
}: ResidentProfilePreviewProps) {
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleAction = (label: string) => {
    setFeedback(label);
    setTimeout(() => setFeedback(null), 2500);
  };

  return (
    <section
      className={cn(
        "p-7 sm:p-9 rounded-3xl bg-[#FDFCF8] border border-roomly-border shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 select-none",
        className
      )}
    >
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-roomly-dark text-roomly-lime font-display font-black text-xl flex items-center justify-center flex-shrink-0 shadow">
          MS
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <h4 className="font-display font-bold text-xl text-roomly-dark">
              {SAMPLE_RESIDENT.name}
            </h4>
            <span className="px-2.5 py-0.5 rounded-full bg-roomly-green/10 text-roomly-green text-[10px] font-bold">
              {SAMPLE_RESIDENT.room}
            </span>
          </div>

          <span className="text-xs text-roomly-muted">
            {SAMPLE_RESIDENT.property} · {SAMPLE_RESIDENT.neighbourhood}, {SAMPLE_RESIDENT.city} · Resident since {SAMPLE_RESIDENT.moveInDate}
          </span>

          <div className="flex flex-wrap gap-1.5 pt-2">
            {SAMPLE_RESIDENT.preferences.map((pref) => (
              <span
                key={pref}
                className="px-2.5 py-0.5 rounded-full bg-roomly-bg border border-roomly-border text-[10px] font-medium text-roomly-muted"
              >
                {pref}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2.5 flex-shrink-0">
        <button
          type="button"
          onClick={() => handleAction("Opening profile editor...")}
          className="px-4 py-2 rounded-full border border-roomly-border text-xs font-semibold text-roomly-dark hover:bg-roomly-dark hover:text-white transition-colors cursor-pointer"
        >
          Edit profile →
        </button>

        <button
          type="button"
          onClick={() => handleAction("Opening living preferences...")}
          className="px-4 py-2 rounded-full bg-roomly-dark text-roomly-cream text-xs font-semibold hover:bg-roomly-green transition-colors cursor-pointer"
        >
          Manage preferences
        </button>
      </div>

      {feedback && (
        <div className="fixed bottom-8 left-8 z-50 px-4 py-2.5 rounded-full bg-roomly-dark text-roomly-lime text-xs font-bold shadow-xl flex items-center gap-2">
          <Check className="w-3.5 h-3.5" />
          <span>{feedback}</span>
        </div>
      )}
    </section>
  );
}
