"use client";

import React from "react";
import { Neighbourhood } from "@/data/locations";
import { NeighbourhoodCard } from "./NeighbourhoodCard";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export interface NeighbourhoodGridProps {
  neighbourhoods: Neighbourhood[];
  cityName: string;
  selectedNeighbourhoodSlug?: string;
  onSelectNeighbourhood: (n: Neighbourhood) => void;
  onResetFilters: () => void;
  className?: string;
}

export function NeighbourhoodGrid({
  neighbourhoods,
  cityName,
  selectedNeighbourhoodSlug,
  onSelectNeighbourhood,
  onResetFilters,
  className,
}: NeighbourhoodGridProps) {
  if (neighbourhoods.length === 0) {
    return (
      <div className="text-center py-16 px-6 border border-dashed border-roomly-border rounded-3xl bg-[#FDFCF9] flex flex-col items-center gap-3 w-full">
        <div className="w-10 h-10 rounded-full bg-roomly-cream/80 flex items-center justify-center text-roomly-green mb-1">
          <Sparkles className="w-5 h-5" />
        </div>
        <h4 className="font-display font-bold text-lg text-roomly-dark">
          No neighbourhoods match those filters in {cityName}.
        </h4>
        <p className="text-xs text-roomly-muted max-w-sm">
          Try clearing your search query or relaxing your budget and lifestyle filters.
        </p>
        <button
          type="button"
          onClick={onResetFilters}
          className="mt-2 px-4 py-2 rounded-full bg-roomly-dark text-roomly-cream text-xs font-semibold hover:bg-roomly-green transition-colors"
        >
          Reset filters
        </button>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 w-full",
        className
      )}
    >
      {neighbourhoods.map((n) => (
        <NeighbourhoodCard
          key={n.slug}
          neighbourhood={n}
          cityName={cityName}
          isSelected={n.slug === selectedNeighbourhoodSlug}
          onSelect={onSelectNeighbourhood}
        />
      ))}
    </div>
  );
}
