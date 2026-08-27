"use client";

import React from "react";
import { Check, Clock, Key } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BookingTimelineProps {
  className?: string;
}

export function BookingTimeline({ className }: BookingTimelineProps) {
  const STAGES = [
    {
      num: 1,
      title: "Booking submitted",
      date: "Aug 26, 2026",
      desc: "Reservation request and deposit received in escrow.",
      status: "completed" as const,
      icon: Check,
    },
    {
      num: 2,
      title: "Details verified",
      date: "Aug 27, 2026",
      desc: "Government KYC and employment identity verified.",
      status: "completed" as const,
      icon: Check,
    },
    {
      num: 3,
      title: "Property confirmation",
      date: "In progress",
      desc: "On-site property host final check & room key setup.",
      status: "active" as const,
      icon: Clock,
    },
    {
      num: 4,
      title: "Move-in day",
      date: "Sept 1, 2026",
      desc: "Arrival check-in, key collection, and room walkthrough.",
      status: "upcoming" as const,
      icon: Key,
    },
  ];

  return (
    <div className={cn("flex flex-col gap-5 w-full select-none", className)}>
      <div className="flex items-center justify-between">
        <h3 className="font-display font-bold text-lg text-roomly-dark">
          Booking Progression
        </h3>
        <span className="text-xs font-semibold text-roomly-green">
          Step 3 of 4 in progress
        </span>
      </div>

      <div className="p-6 rounded-3xl bg-[#FDFCF8] border border-roomly-border shadow-xs flex flex-col gap-6">
        <div className="relative flex flex-col gap-6">
          {STAGES.map((s, idx) => {
            const Icon = s.icon;

            return (
              <div key={s.num} className="relative flex items-start gap-4">
                {/* Vertical Connector Line */}
                {idx < STAGES.length - 1 && (
                  <div
                    className={cn(
                      "absolute left-4 top-8 bottom-0 w-0.5 -ml-px transition-colors",
                      s.status === "completed" ? "bg-roomly-green" : "bg-roomly-border"
                    )}
                  />
                )}

                {/* Step Circle */}
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 z-10 transition-colors shadow-xs",
                    s.status === "completed"
                      ? "bg-roomly-green text-white"
                      : s.status === "active"
                      ? "bg-roomly-dark text-roomly-lime ring-4 ring-roomly-lime/30"
                      : "bg-roomly-bg text-roomly-muted border border-roomly-border"
                  )}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>

                {/* Step Details */}
                <div className="flex flex-col gap-0.5 flex-grow">
                  <div className="flex items-center justify-between">
                    <span
                      className={cn(
                        "font-display font-bold text-sm",
                        s.status === "active"
                          ? "text-roomly-dark font-black"
                          : s.status === "completed"
                          ? "text-roomly-dark"
                          : "text-roomly-muted"
                      )}
                    >
                      {s.title}
                    </span>
                    <span className="text-[11px] font-semibold text-roomly-muted">
                      {s.date}
                    </span>
                  </div>
                  <p className="text-xs text-roomly-muted leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
