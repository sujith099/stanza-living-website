"use client";

import React from "react";
import { MessageSquare, Phone, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ContactPropertyProps {
  propertyName: string;
  onScheduleVisit: () => void;
  onToast: (msg: string) => void;
  className?: string;
}

export function ContactProperty({
  propertyName,
  onScheduleVisit,
  onToast,
  className,
}: ContactPropertyProps) {
  const handleMessage = () => {
    onToast(`Inquiry channel opened with ${propertyName} concierge.`);
  };

  const handleCall = () => {
    onToast(`Direct concierge callback requested for ${propertyName}.`);
  };

  return (
    <div
      className={cn(
        "p-6 sm:p-7 rounded-2xl bg-[#FDFCF8] border border-roomly-border flex flex-col sm:flex-row sm:items-center justify-between gap-5",
        className
      )}
    >
      <div className="flex flex-col gap-1">
        <h3 className="font-display font-bold text-lg text-roomly-dark">
          Have a question?
        </h3>
        <p className="text-xs text-roomly-muted">
          Our on-site community curator is available daily 9:00 AM – 8:00 PM
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        <button
          type="button"
          onClick={handleMessage}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-roomly-border hover:border-roomly-dark text-xs font-semibold text-roomly-dark transition-all cursor-pointer shadow-sm"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Message</span>
        </button>

        <button
          type="button"
          onClick={handleCall}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-roomly-border hover:border-roomly-dark text-xs font-semibold text-roomly-dark transition-all cursor-pointer shadow-sm"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Call curator</span>
        </button>

        <button
          type="button"
          onClick={onScheduleVisit}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-roomly-dark text-roomly-cream hover:bg-roomly-green text-xs font-semibold transition-all cursor-pointer shadow-sm"
        >
          <Calendar className="w-3.5 h-3.5 text-roomly-lime" />
          <span>Schedule visit</span>
        </button>
      </div>
    </div>
  );
}
