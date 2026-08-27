"use client";

import React, { useMemo } from "react";
import { Clock, Calendar } from "lucide-react";
import { getDaysUntilMoveIn } from "@/data/dashboard";
import { cn } from "@/lib/utils";

export interface MoveInCountdownProps {
  moveInDate?: string;
  className?: string;
}

export function MoveInCountdown({
  moveInDate = "2026-09-01",
  className,
}: MoveInCountdownProps) {
  const daysRemaining = useMemo(
    () => getDaysUntilMoveIn(moveInDate),
    [moveInDate]
  );

  return (
    <div
      className={cn(
        "p-5 rounded-3xl bg-[#FDFCF8] border border-roomly-border shadow-xs flex items-center justify-between gap-4 select-none",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-roomly-green/10 text-roomly-green flex items-center justify-center flex-shrink-0">
          <Clock className="w-5 h-5" />
        </div>

        <div className="flex flex-col">
          <span className="text-[10px] uppercase font-bold text-roomly-muted tracking-wider">
            Move-in Countdown
          </span>
          <span className="text-xs text-roomly-dark font-medium">
            Oak House · Indiranagar
          </span>
        </div>
      </div>

      <div className="text-right flex flex-col items-end">
        <div className="font-display font-black text-2xl sm:text-3xl text-roomly-dark leading-none">
          {daysRemaining} <span className="text-xs font-bold text-roomly-muted">days</span>
        </div>
        <span className="text-[11px] text-roomly-green font-semibold mt-1 flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          <span>September 1, 2026</span>
        </span>
      </div>
    </div>
  );
}
