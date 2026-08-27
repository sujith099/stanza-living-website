"use client";

import React from "react";
import { Train } from "lucide-react";
import { cn } from "@/lib/utils";

export interface NeighbourhoodFilterState {
  budget: "all" | "under-15k" | "15k-20k" | "above-20k";
  lifestyle: "all" | "Quiet" | "Social" | "Work-friendly" | "Student";
  nearMetroOnly: boolean;
}

export interface NeighbourhoodFiltersProps {
  filters: NeighbourhoodFilterState;
  onChange: (filters: NeighbourhoodFilterState) => void;
  className?: string;
}

export function NeighbourhoodFilters({
  filters,
  onChange,
  className,
}: NeighbourhoodFiltersProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-2 text-xs select-none",
        className
      )}
    >
      {/* Budget Pills */}
      <span className="text-[11px] font-bold text-roomly-muted uppercase tracking-wider hidden sm:inline mr-1">
        Budget:
      </span>
      {[
        { id: "all", label: "All rents" },
        { id: "under-15k", label: "Under ₹15k" },
        { id: "15k-20k", label: "₹15k – ₹20k" },
        { id: "above-20k", label: "₹20k+" },
      ].map((b) => {
        const isSelected = filters.budget === b.id;
        return (
          <button
            key={b.id}
            type="button"
            onClick={() =>
              onChange({ ...filters, budget: b.id as NeighbourhoodFilterState["budget"] })
            }
            className={cn(
              "px-3 py-1.5 rounded-full font-medium transition-colors cursor-pointer",
              isSelected
                ? "bg-roomly-dark text-roomly-lime font-semibold"
                : "bg-white text-roomly-dark border border-roomly-border hover:bg-roomly-bg"
            )}
          >
            {b.label}
          </button>
        );
      })}

      <div className="w-px h-4 bg-roomly-border mx-1 hidden sm:block" />

      {/* Lifestyle Pills */}
      <span className="text-[11px] font-bold text-roomly-muted uppercase tracking-wider hidden sm:inline mr-1">
        Vibe:
      </span>
      {[
        { id: "all", label: "All vibes" },
        { id: "Social", label: "Social" },
        { id: "Quiet", label: "Quiet" },
        { id: "Work-friendly", label: "Work" },
      ].map((l) => {
        const isSelected = filters.lifestyle === l.id;
        return (
          <button
            key={l.id}
            type="button"
            onClick={() =>
              onChange({
                ...filters,
                lifestyle: l.id as NeighbourhoodFilterState["lifestyle"],
              })
            }
            className={cn(
              "px-3 py-1.5 rounded-full font-medium transition-colors cursor-pointer",
              isSelected
                ? "bg-roomly-dark text-roomly-lime font-semibold"
                : "bg-white text-roomly-dark border border-roomly-border hover:bg-roomly-bg"
            )}
          >
            {l.label}
          </button>
        );
      })}

      {/* Near Metro Toggle */}
      <button
        type="button"
        onClick={() =>
          onChange({ ...filters, nearMetroOnly: !filters.nearMetroOnly })
        }
        className={cn(
          "px-3 py-1.5 rounded-full font-medium flex items-center gap-1.5 transition-colors cursor-pointer ml-auto sm:ml-0",
          filters.nearMetroOnly
            ? "bg-roomly-green text-white font-semibold"
            : "bg-white text-roomly-dark border border-roomly-border hover:bg-roomly-bg"
        )}
      >
        <Train className="w-3 h-3" />
        <span>Near metro</span>
      </button>
    </div>
  );
}
