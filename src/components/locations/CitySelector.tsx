"use client";

import React from "react";
import { CityData } from "@/data/locations";
import { cn } from "@/lib/utils";

export interface CitySelectorProps {
  cities: CityData[];
  selectedCitySlug: string;
  onSelectCity: (slug: string) => void;
  className?: string;
}

export function CitySelector({
  cities,
  selectedCitySlug,
  onSelectCity,
  className,
}: CitySelectorProps) {
  return (
    <div className={cn("flex flex-col gap-4 w-full", className)}>
      <div className="flex items-center justify-between">
        <h2 className="font-display font-bold text-xl sm:text-2xl text-roomly-dark">
          Where are you looking?
        </h2>
        <span className="text-xs text-roomly-muted hidden sm:inline">
          Choose a city to explore neighbourhoods & rent
        </span>
      </div>

      {/* Horizontally scrollable selector */}
      <div className="w-full overflow-x-auto pb-2 no-scrollbar select-none">
        <div className="inline-flex items-center gap-2.5 p-1.5 rounded-full bg-white border border-roomly-border shadow-sm">
          {cities.map((city) => {
            const isSelected = city.slug === selectedCitySlug;

            return (
              <button
                key={city.slug}
                type="button"
                onClick={() => onSelectCity(city.slug)}
                className={cn(
                  "px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex-shrink-0 cursor-pointer",
                  isSelected
                    ? "bg-roomly-dark text-roomly-lime shadow-md border border-roomly-dark scale-[1.02]"
                    : "bg-transparent text-roomly-dark hover:bg-roomly-bg hover:text-roomly-green"
                )}
              >
                {city.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
