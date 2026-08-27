"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface RoomlyFooterProps {
  className?: string;
}

export function RoomlyFooter({ className }: RoomlyFooterProps) {
  return (
    <footer
      className={cn(
        "bg-roomly-dark text-roomly-cream/70 border-t border-white/10 py-16 px-5 sm:px-8 lg:px-12",
        className
      )}
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-6 pb-8 border-b border-white/10">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5">
              <span className="font-display font-black text-xl sm:text-2xl tracking-wider text-white">
                STANZA LIVING
              </span>
              <span className="text-roomly-lime font-bold text-lg">*</span>
            </div>
            <p className="text-xs sm:text-sm text-roomly-cream/60">
              Furnished rooms, managed student residences & shared living.
            </p>
          </div>

          {/* Minimal Links */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-8 text-xs font-medium">
            <Link href="/rooms" className="hover:text-white transition-colors">
              Rooms
            </Link>
            <Link href="/locations" className="hover:text-white transition-colors">
              Locations
            </Link>
            <Link href="/about" className="hover:text-white transition-colors">
              About
            </Link>
            <Link href="/residents" className="hover:text-white transition-colors">
              For residents
            </Link>
            <Link href="/dashboard" className="hover:text-white transition-colors">
              Dashboard
            </Link>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-roomly-cream/40">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-center sm:text-left">
            <p>© 2026 Stanza Living concept prototype.</p>
            <span className="hidden sm:inline text-white/20">•</span>
            <p className="text-roomly-cream/50 italic">Concept prototype — not an official Stanza Living website.</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-roomly-lime" />
            <span>Bengaluru · Hyderabad · Pune · Delhi NCR</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export const StanzaFooter = RoomlyFooter;
export type StanzaFooterProps = RoomlyFooterProps;
