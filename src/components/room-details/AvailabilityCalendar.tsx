"use client";

import React from "react";
import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";
import { Property } from "@/data/properties";
import { cn } from "@/lib/utils";

export interface AvailabilityCalendarProps {
  property: Property;
  selectedDate: string;
  onSelectDate: (date: string) => void;
  className?: string;
}

export function AvailabilityCalendar({
  property,
  selectedDate,
  onSelectDate,
  className,
}: AvailabilityCalendarProps) {
  // Days of September 2026 (Starts on a Tuesday = day index 2, 30 days)
  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const totalDays = 30;
  const startDayOffset = 2; // Tuesday

  const availableDateMap = new Set(property.availableDates);

  return (
    <section
      className={cn(
        "p-6 sm:p-7 rounded-2xl bg-[#FDFCF8] border border-roomly-border flex flex-col gap-5",
        className
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex flex-col gap-0.5">
          <h3 className="font-display font-bold text-lg text-roomly-dark flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-roomly-green" />
            <span>When can you move in?</span>
          </h3>
          <span className="text-xs text-roomly-muted">
            Select a verified available move-in slot for September 2026
          </span>
        </div>

        <div className="flex items-center gap-4 text-[11px]">
          <div className="flex items-center gap-1.5 text-roomly-dark font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-roomly-lime border border-roomly-dark/40" />
            <span>Available slot</span>
          </div>
          <div className="flex items-center gap-1.5 text-roomly-muted">
            <span className="w-2.5 h-2.5 rounded-full bg-roomly-border" />
            <span>Reserved</span>
          </div>
        </div>
      </div>

      {/* Calendar Grid Container */}
      <div className="max-w-md w-full mx-auto p-4 rounded-2xl bg-roomly-bg border border-roomly-border/70 select-none">
        <div className="text-center font-display font-bold text-xs text-roomly-dark mb-3">
          September 2026
        </div>

        <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-semibold text-roomly-muted mb-2">
          {daysOfWeek.map((d) => (
            <div key={d} className="py-1">
              {d}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 text-center">
          {/* Empty offset cells */}
          {Array.from({ length: startDayOffset }).map((_, i) => (
            <div key={`empty-${i}`} className="p-2" />
          ))}

          {/* Days 1 to 30 */}
          {Array.from({ length: totalDays }).map((_, i) => {
            const dayNum = i + 1;
            const dateStr = `2026-09-${dayNum < 10 ? `0${dayNum}` : dayNum}`;
            const isAvailable = availableDateMap.has(dateStr);
            const isSelected = selectedDate === dateStr;

            if (isAvailable) {
              return (
                <motion.button
                  key={dayNum}
                  type="button"
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onSelectDate(dateStr)}
                  className={cn(
                    "p-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex flex-col items-center justify-center relative",
                    isSelected
                      ? "bg-roomly-dark text-roomly-lime shadow-md ring-2 ring-roomly-lime"
                      : "bg-white text-roomly-dark hover:bg-roomly-lime/30 border border-roomly-dark/20 shadow-sm"
                  )}
                >
                  <span>{dayNum}</span>
                  <span className="w-1 h-1 rounded-full bg-roomly-lime mt-0.5" />
                </motion.button>
              );
            }

            return (
              <div
                key={dayNum}
                className="p-2 rounded-xl text-xs text-roomly-muted/40 font-normal select-none flex items-center justify-center"
              >
                {dayNum}
              </div>
            );
          })}
        </div>
      </div>

      <div className="text-center text-xs text-roomly-dark font-medium">
        Selected move-in:{" "}
        <span className="text-roomly-green font-bold">
          {new Date(selectedDate).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      </div>
    </section>
  );
}
