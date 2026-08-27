"use client";

import React from "react";
import { RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FilterState {
  minPrice: number;
  maxPrice: number;
  roomTypes: string[];
  furnishings: string[];
  amenities: string[];
  locations: string[];
  lifestyles: string[];
  availability: string[];
}

export interface FilterSidebarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
  activeFilterCount: number;
  className?: string;
}

export function FilterSidebar({
  filters,
  onChange,
  onReset,
  activeFilterCount,
  className,
}: FilterSidebarProps) {
  const toggleArrayItem = (category: keyof FilterState, item: string) => {
    const current = (filters[category] as string[]) || [];
    const updated = current.includes(item)
      ? current.filter((x) => x !== item)
      : [...current, item];

    onChange({
      ...filters,
      [category]: updated,
    });
  };

  return (
    <aside
      className={cn(
        "w-full bg-[#FDFCF8] border border-roomly-border rounded-2xl p-6 flex flex-col gap-6 select-none",
        className
      )}
    >
      {/* Title & Clear All */}
      <div className="flex items-center justify-between pb-4 border-b border-roomly-border">
        <div className="flex items-center gap-2">
          <h3 className="font-display font-bold text-base text-roomly-dark">
            Filter rooms
          </h3>
          {activeFilterCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-roomly-dark text-roomly-lime text-[11px] font-bold flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </div>

        {activeFilterCount > 0 && (
          <button
            type="button"
            onClick={onReset}
            className="text-xs font-semibold text-roomly-muted hover:text-roomly-dark transition-colors flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Clear all</span>
          </button>
        )}
      </div>

      {/* 1. PRICE RANGE */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-display font-bold text-roomly-dark uppercase tracking-wider text-[11px]">
            Price
          </span>
          <span className="font-medium text-roomly-muted">
            ₹{(filters.minPrice / 1000).toFixed(0)}k — ₹{(filters.maxPrice / 1000).toFixed(0)}k
          </span>
        </div>
        <input
          type="range"
          min="8000"
          max="35000"
          step="1000"
          value={filters.maxPrice}
          onChange={(e) =>
            onChange({ ...filters, maxPrice: Number(e.target.value) })
          }
          className="w-full accent-roomly-dark h-1.5 bg-roomly-border rounded-lg cursor-pointer"
        />
        <div className="flex items-center justify-between text-[11px] text-roomly-muted">
          <span>₹8,000</span>
          <span>₹35,000+</span>
        </div>
      </div>

      {/* 2. ROOM TYPE */}
      <div className="flex flex-col gap-2.5 pt-3 border-t border-roomly-border">
        <span className="font-display font-bold text-roomly-dark uppercase tracking-wider text-[11px]">
          Room Type
        </span>
        {[
          { id: "Private", label: "Private" },
          { id: "Twin sharing", label: "Twin sharing" },
          { id: "Triple sharing", label: "Triple sharing" },
        ].map((item) => (
          <label
            key={item.id}
            className="flex items-center gap-2.5 text-xs text-roomly-dark cursor-pointer group hover:text-roomly-green"
          >
            <input
              type="checkbox"
              checked={filters.roomTypes.includes(item.id)}
              onChange={() => toggleArrayItem("roomTypes", item.id)}
              className="rounded border-roomly-border text-roomly-dark focus:ring-0 cursor-pointer"
            />
            <span>{item.label}</span>
          </label>
        ))}
      </div>

      {/* 3. FURNISHING */}
      <div className="flex flex-col gap-2.5 pt-3 border-t border-roomly-border">
        <span className="font-display font-bold text-roomly-dark uppercase tracking-wider text-[11px]">
          Furnishing
        </span>
        {["Fully furnished", "Semi furnished"].map((furnishing) => (
          <label
            key={furnishing}
            className="flex items-center gap-2.5 text-xs text-roomly-dark cursor-pointer group hover:text-roomly-green"
          >
            <input
              type="checkbox"
              checked={filters.furnishings.includes(furnishing)}
              onChange={() => toggleArrayItem("furnishings", furnishing)}
              className="rounded border-roomly-border text-roomly-dark focus:ring-0 cursor-pointer"
            />
            <span>{furnishing}</span>
          </label>
        ))}
      </div>

      {/* 4. AMENITIES */}
      <div className="flex flex-col gap-2.5 pt-3 border-t border-roomly-border">
        <span className="font-display font-bold text-roomly-dark uppercase tracking-wider text-[11px]">
          Amenities
        </span>
        {[
          "Wi-Fi",
          "AC",
          "Washing machine",
          "Housekeeping",
          "Food",
          "Parking",
          "Power backup",
        ].map((amenity) => (
          <label
            key={amenity}
            className="flex items-center gap-2.5 text-xs text-roomly-dark cursor-pointer group hover:text-roomly-green"
          >
            <input
              type="checkbox"
              checked={filters.amenities.includes(amenity)}
              onChange={() => toggleArrayItem("amenities", amenity)}
              className="rounded border-roomly-border text-roomly-dark focus:ring-0 cursor-pointer"
            />
            <span>{amenity}</span>
          </label>
        ))}
      </div>

      {/* 5. LOCATION PROXIMITY */}
      <div className="flex flex-col gap-2.5 pt-3 border-t border-roomly-border">
        <span className="font-display font-bold text-roomly-dark uppercase tracking-wider text-[11px]">
          Location
        </span>
        {[
          { id: "nearMetro", label: "Near metro" },
          { id: "nearCollege", label: "Near college" },
          { id: "nearOffice", label: "Near office" },
        ].map((loc) => (
          <label
            key={loc.id}
            className="flex items-center gap-2.5 text-xs text-roomly-dark cursor-pointer group hover:text-roomly-green"
          >
            <input
              type="checkbox"
              checked={filters.locations.includes(loc.id)}
              onChange={() => toggleArrayItem("locations", loc.id)}
              className="rounded border-roomly-border text-roomly-dark focus:ring-0 cursor-pointer"
            />
            <span>{loc.label}</span>
          </label>
        ))}
      </div>

      {/* 6. LIFESTYLE */}
      <div className="flex flex-col gap-2.5 pt-3 border-t border-roomly-border">
        <span className="font-display font-bold text-roomly-dark uppercase tracking-wider text-[11px]">
          Lifestyle
        </span>
        {["Quiet", "Social", "Work-friendly", "Budget"].map((lifestyle) => (
          <label
            key={lifestyle}
            className="flex items-center gap-2.5 text-xs text-roomly-dark cursor-pointer group hover:text-roomly-green"
          >
            <input
              type="checkbox"
              checked={filters.lifestyles.includes(lifestyle)}
              onChange={() => toggleArrayItem("lifestyles", lifestyle)}
              className="rounded border-roomly-border text-roomly-dark focus:ring-0 cursor-pointer"
            />
            <span>{lifestyle}</span>
          </label>
        ))}
      </div>

      {/* 7. AVAILABILITY */}
      <div className="flex flex-col gap-2.5 pt-3 border-t border-roomly-border">
        <span className="font-display font-bold text-roomly-dark uppercase tracking-wider text-[11px]">
          Availability
        </span>
        {[
          { id: "now", label: "Available now" },
          { id: "this-month", label: "Available this month" },
        ].map((avail) => (
          <label
            key={avail.id}
            className="flex items-center gap-2.5 text-xs text-roomly-dark cursor-pointer group hover:text-roomly-green"
          >
            <input
              type="checkbox"
              checked={filters.availability.includes(avail.id)}
              onChange={() => toggleArrayItem("availability", avail.id)}
              className="rounded border-roomly-border text-roomly-dark focus:ring-0 cursor-pointer"
            />
            <span>{avail.label}</span>
          </label>
        ))}
      </div>
    </aside>
  );
}
