"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface QuickFilterChipsProps {
  activeChips: string[];
  onToggleChip: (chipId: string) => void;
  className?: string;
}

export const CHIPS = [
  { id: "private", label: "Private room" },
  { id: "under-20k", label: "Under ₹20k" },
  { id: "near-metro", label: "Near metro" },
  { id: "available-now", label: "Available now" },
  { id: "furnished", label: "Fully furnished" },
];

export function QuickFilterChips({
  activeChips,
  onToggleChip,
  className,
}: QuickFilterChipsProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar select-none",
        className
      )}
    >
      <span className="text-[11px] font-semibold text-roomly-muted uppercase tracking-wider mr-1 hidden sm:inline flex-shrink-0">
        Quick filter:
      </span>
      {CHIPS.map((chip) => {
        const isActive = activeChips.includes(chip.id);

        return (
          <button
            key={chip.id}
            type="button"
            onClick={() => onToggleChip(chip.id)}
            className={cn(
              "px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 flex-shrink-0 cursor-pointer",
              isActive
                ? "bg-roomly-dark text-roomly-lime font-semibold shadow-sm border border-roomly-dark"
                : "bg-white text-roomly-dark border border-roomly-border hover:border-roomly-dark/60 hover:bg-roomly-bg"
            )}
          >
            {chip.label}
          </button>
        );
      })}
    </div>
  );
}
