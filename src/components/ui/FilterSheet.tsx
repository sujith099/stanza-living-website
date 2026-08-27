"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, RotateCcw } from "lucide-react";
import { FilterState } from "./FilterSidebar";
import { RoomlyButton } from "./RoomlyButton";
import { ROOMLY_EASE } from "@/lib/animations";

export interface FilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
  activeFilterCount: number;
  totalResultCount: number;
}

export function FilterSheet({
  isOpen,
  onClose,
  filters,
  onChange,
  onReset,
  activeFilterCount,
  totalResultCount,
}: FilterSheetProps) {
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
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end lg:hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.35, ease: ROOMLY_EASE }}
            className="relative z-10 bg-[#FDFCF8] rounded-t-3xl max-h-[85vh] flex flex-col shadow-2xl border-t border-roomly-border"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-roomly-border">
              <div className="flex items-center gap-2">
                <h3 className="font-display font-bold text-lg text-roomly-dark">
                  Filters
                </h3>
                {activeFilterCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-roomly-dark text-roomly-lime text-[11px] font-bold flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-4">
                {activeFilterCount > 0 && (
                  <button
                    type="button"
                    onClick={onReset}
                    className="text-xs font-semibold text-roomly-muted hover:text-roomly-dark flex items-center gap-1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Clear all</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-roomly-bg flex items-center justify-center text-roomly-dark"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Scrollable Filters Content */}
            <div className="px-6 py-6 overflow-y-auto flex flex-col gap-6">
              {/* 1. Price */}
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-display font-bold text-roomly-dark uppercase tracking-wider text-[11px]">
                    Price Range
                  </span>
                  <span className="font-semibold text-roomly-dark">
                    Up to ₹{(filters.maxPrice / 1000).toFixed(0)}k/mo
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
                  className="w-full accent-roomly-dark h-2 bg-roomly-border rounded-lg"
                />
              </div>

              {/* 2. Room Type */}
              <div className="flex flex-col gap-2 pt-3 border-t border-roomly-border">
                <span className="font-display font-bold text-roomly-dark uppercase tracking-wider text-[11px]">
                  Room Type
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {["Private", "Twin sharing", "Triple sharing"].map((t) => {
                    const isSelected = filters.roomTypes.includes(t);
                    return (
                      <button
                        key={t}
                        type="button"
                        onClick={() => toggleArrayItem("roomTypes", t)}
                        className={`py-2 px-3 rounded-xl text-xs font-medium border text-left transition-colors ${
                          isSelected
                            ? "bg-roomly-dark text-roomly-cream border-roomly-dark"
                            : "bg-white text-roomly-dark border-roomly-border"
                        }`}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Amenities */}
              <div className="flex flex-col gap-2 pt-3 border-t border-roomly-border">
                <span className="font-display font-bold text-roomly-dark uppercase tracking-wider text-[11px]">
                  Key Amenities
                </span>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Wi-Fi",
                    "AC",
                    "Washing machine",
                    "Housekeeping",
                    "Food",
                    "Parking",
                    "Power backup",
                  ].map((amenity) => {
                    const isSelected = filters.amenities.includes(amenity);
                    return (
                      <button
                        key={amenity}
                        type="button"
                        onClick={() => toggleArrayItem("amenities", amenity)}
                        className={`py-1.5 px-3 rounded-full text-xs font-medium border transition-colors ${
                          isSelected
                            ? "bg-roomly-green text-white border-roomly-green"
                            : "bg-white text-roomly-dark border-roomly-border"
                        }`}
                      >
                        {amenity}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 4. Lifestyle */}
              <div className="flex flex-col gap-2 pt-3 border-t border-roomly-border">
                <span className="font-display font-bold text-roomly-dark uppercase tracking-wider text-[11px]">
                  Vibe & Lifestyle
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {["Quiet", "Social", "Work-friendly", "Budget"].map((l) => {
                    const isSelected = filters.lifestyles.includes(l);
                    return (
                      <button
                        key={l}
                        type="button"
                        onClick={() => toggleArrayItem("lifestyles", l)}
                        className={`py-2 px-3 rounded-xl text-xs font-medium border text-left transition-colors ${
                          isSelected
                            ? "bg-roomly-dark text-roomly-cream border-roomly-dark"
                            : "bg-white text-roomly-dark border-roomly-border"
                        }`}
                      >
                        {l}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Sticky Apply Button */}
            <div className="p-4 border-t border-roomly-border bg-white">
              <RoomlyButton
                variant="primary"
                size="lg"
                shape="pill"
                onClick={onClose}
                className="w-full justify-center"
              >
                Show {totalResultCount} rooms
              </RoomlyButton>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
