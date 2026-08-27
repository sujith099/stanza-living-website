"use client";

import React from "react";
import { Calendar as CalendarIcon, Check } from "lucide-react";
import { AVAILABLE_MOVE_IN_DATES } from "@/data/bookings";
import { cn } from "@/lib/utils";

export interface MoveInCalendarProps {
  selectedDate: string;
  onSelectDate: (dateLabel: string) => void;
  className?: string;
}

export function MoveInCalendar({
  selectedDate,
  onSelectDate,
  className,
}: MoveInCalendarProps) {
  // September 2026 starts on Tuesday (index 2) and has 30 days
  const daysInMonth = 30;
  const startDayOffset = 2; // Tuesday

  const isAvailableDay = (day: number) => {
    return AVAILABLE_MOVE_IN_DATES.some((d) => d.day === day);
  };

  const getFullLabel = (day: number) => {
    return `September ${day}, 2026`;
  };

  return (
    <div className={cn("flex flex-col gap-5 w-full select-none", className)}>
      <div className="flex flex-col gap-1">
        <h3 className="font-display font-bold text-xl sm:text-2xl text-roomly-dark">
          When would you like to move in?
        </h3>
        <p className="text-xs text-roomly-muted">
          Available move-in dates for September 2026 based on room turnaround and deep cleaning
        </p>
      </div>

      {/* Calendar Container */}
      <div className="p-5 sm:p-6 rounded-3xl bg-[#FDFCF8] border border-roomly-border shadow-sm flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-roomly-border pb-3">
          <span className="font-display font-bold text-base text-roomly-dark flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-roomly-green" />
            <span>September 2026</span>
          </span>
          <span className="text-xs text-roomly-green font-semibold">
            5 verified move-in slots
          </span>
        </div>

        {/* Day Header */}
        <div className="grid grid-cols-7 gap-1 text-center text-[10px] uppercase font-bold text-roomly-muted tracking-wider">
          <span>Su</span>
          <span>Mo</span>
          <span>Tu</span>
          <span>We</span>
          <span>Th</span>
          <span>Fr</span>
          <span>Sa</span>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
          {/* Offset empty slots */}
          {[...Array(startDayOffset)].map((_, i) => (
            <div key={`empty-${i}`} className="h-9 sm:h-11" />
          ))}

          {/* Days */}
          {[...Array(daysInMonth)].map((_, i) => {
            const dayNumber = i + 1;
            const available = isAvailableDay(dayNumber);
            const dateLabel = getFullLabel(dayNumber);
            const isSelected = selectedDate === dateLabel;

            return (
              <button
                key={dayNumber}
                type="button"
                disabled={!available}
                onClick={() => onSelectDate(dateLabel)}
                className={cn(
                  "h-9 sm:h-11 rounded-xl text-xs font-semibold transition-all flex items-center justify-center relative",
                  isSelected
                    ? "bg-roomly-dark text-roomly-lime shadow-md font-bold scale-[1.05] z-10"
                    : available
                    ? "bg-roomly-green/10 text-roomly-green hover:bg-roomly-dark hover:text-white cursor-pointer font-bold"
                    : "text-roomly-muted/40 cursor-not-allowed"
                )}
              >
                <span>{dayNumber}</span>
                {available && !isSelected && (
                  <span className="absolute bottom-1 w-1 h-1 rounded-full bg-roomly-green" />
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Date Summary Tag */}
        <div className="flex items-center justify-between pt-3 border-t border-roomly-border text-xs">
          <span className="text-roomly-muted">Selected move-in date:</span>
          <span className="font-display font-bold text-roomly-dark flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-roomly-green" />
            <span>{selectedDate}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
