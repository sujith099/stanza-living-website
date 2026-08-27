"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, HelpCircle, Phone, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BookingNavProps {
  propertySlug: string;
  className?: string;
}

export function BookingNav({ propertySlug, className }: BookingNavProps) {
  const [helpOpen, setHelpOpen] = useState(false);

  return (
    <header
      className={cn(
        "w-full bg-[#FDFCF8] border-b border-roomly-border py-4 px-5 sm:px-8 lg:px-12 select-none sticky top-0 z-40 backdrop-blur-md",
        className
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Brand + Back to Room link */}
        <div className="flex items-center gap-4 sm:gap-6">
          <Link href="/" className="inline-flex items-center gap-1 group">
            <span className="font-display font-black text-base sm:text-lg tracking-wider text-roomly-dark whitespace-nowrap">
              STANZA LIVING
            </span>
            <span className="text-roomly-lime font-bold text-lg group-hover:rotate-45 transition-transform">
              *
            </span>
          </Link>

          <div className="h-4 w-px bg-roomly-border hidden sm:block" />

          <Link
            href={`/rooms/${propertySlug}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-roomly-muted hover:text-roomly-dark transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to room</span>
          </Link>
        </div>

        {/* Right: Need help trigger */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setHelpOpen(!helpOpen)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-roomly-muted hover:text-roomly-dark transition-colors cursor-pointer"
          >
            <HelpCircle className="w-4 h-4 text-roomly-green" />
            <span className="hidden sm:inline">Need help?</span>
          </button>

          {/* Need help tooltip/card */}
          {helpOpen && (
            <div className="absolute right-0 top-8 z-50 w-72 p-4 rounded-2xl bg-[#FDFCF8] border border-roomly-border shadow-2xl flex flex-col gap-2.5 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between">
                <span className="font-display font-bold text-sm text-roomly-dark">
                  Booking Assistance
                </span>
                <button
                  type="button"
                  onClick={() => setHelpOpen(false)}
                  className="text-roomly-muted hover:text-roomly-dark p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <p className="text-xs text-roomly-muted leading-relaxed">
                Have questions about deposits, house rules, or visit scheduling before reserving?
              </p>

              <div className="p-2.5 rounded-xl bg-roomly-bg border border-roomly-border flex items-center gap-2 text-xs">
                <Phone className="w-3.5 h-3.5 text-roomly-green" />
                <span className="font-semibold text-roomly-dark">
                  Support Desk: +91 80 4012 0000
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
