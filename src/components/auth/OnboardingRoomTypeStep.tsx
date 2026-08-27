"use client";

import React from "react";
import { ROOM_TYPE_OPTIONS, RoomTypeOption } from "@/data/auth";
import { cn } from "@/lib/utils";

export interface OnboardingRoomTypeStepProps {
  roomType: RoomTypeOption["id"];
  onRoomTypeChange: (rt: RoomTypeOption["id"]) => void;
  className?: string;
}

export function OnboardingRoomTypeStep({
  roomType,
  onRoomTypeChange,
  className,
}: OnboardingRoomTypeStepProps) {
  return (
    <div className={cn("flex flex-col gap-6 w-full select-none", className)}>
      <div className="flex flex-col gap-1.5">
        <h2 className="font-display font-black text-3xl sm:text-4xl text-roomly-dark">
          What kind of room are you looking for?
        </h2>
        <p className="text-xs sm:text-sm text-roomly-muted">
          All rooms feature ergonomic work desks, high-speed Wi-Fi, and clean ensuite baths.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {ROOM_TYPE_OPTIONS.map((opt) => {
          const isSelected = roomType === opt.id;

          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onRoomTypeChange(opt.id)}
              className={cn(
                "p-5 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between gap-3",
                isSelected
                  ? "bg-roomly-dark text-roomly-cream border-roomly-dark shadow scale-[1.01]"
                  : "bg-[#FDFCF8] text-roomly-dark border-roomly-border hover:border-roomly-dark/40"
              )}
            >
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center justify-between">
                  <span className="font-display font-black text-xs tracking-wider uppercase text-roomly-green">
                    {opt.title}
                  </span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-roomly-lime" />
                  )}
                </div>
                <div className="font-display font-bold text-lg mt-0.5">
                  {opt.subtitle}
                </div>
                <p
                  className={cn(
                    "text-xs leading-relaxed mt-1",
                    isSelected ? "text-roomly-cream/70" : "text-roomly-muted"
                  )}
                >
                  {opt.description}
                </p>
              </div>

              <span
                className={cn(
                  "text-[11px] font-semibold pt-2 border-t",
                  isSelected ? "border-white/10 text-roomly-lime" : "border-roomly-border/70 text-roomly-green"
                )}
              >
                {opt.typicalRent}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
