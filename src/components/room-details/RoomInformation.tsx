"use client";

import React from "react";
import {
  Bed,
  User,
  Sparkles,
  Bath,
  CheckCircle2,
} from "lucide-react";
import { Property } from "@/data/properties";
import { cn } from "@/lib/utils";

export interface RoomInformationProps {
  property: Property;
  className?: string;
}

export function RoomInformation({ property, className }: RoomInformationProps) {
  return (
    <section className={cn("flex flex-col gap-6", className)}>
      <div className="flex flex-col gap-1">
        <h2 className="font-display font-bold text-2xl text-roomly-dark">
          The room
        </h2>
        <p className="text-xs sm:text-sm text-roomly-muted">
          Private quarters with natural ventilation and dedicated work setup
        </p>
      </div>

      {/* 4 Core Pillars */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-[#FDFCF8] border border-roomly-border flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-roomly-cream/60 flex items-center justify-center text-roomly-dark flex-shrink-0">
            <Bed className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-semibold text-roomly-muted">
              Format
            </span>
            <span className="text-xs font-bold text-roomly-dark">
              {property.roomType} room
            </span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#FDFCF8] border border-roomly-border flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-roomly-cream/60 flex items-center justify-center text-roomly-dark flex-shrink-0">
            <User className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-semibold text-roomly-muted">
              Occupancy
            </span>
            <span className="text-xs font-bold text-roomly-dark">
              {property.occupancy}
            </span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#FDFCF8] border border-roomly-border flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-roomly-cream/60 flex items-center justify-center text-roomly-dark flex-shrink-0">
            <Sparkles className="w-4 h-4 text-roomly-green" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-semibold text-roomly-muted">
              Furnishing
            </span>
            <span className="text-xs font-bold text-roomly-dark">
              {property.furnishing}
            </span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#FDFCF8] border border-roomly-border flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-roomly-cream/60 flex items-center justify-center text-roomly-dark flex-shrink-0">
            <Bath className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-semibold text-roomly-muted">
              Bath
            </span>
            <span className="text-xs font-bold text-roomly-dark">
              Attached Ensuite
            </span>
          </div>
        </div>
      </div>

      {/* Room Details Checklist with Small Icons */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#FDFCF8] border border-roomly-border flex flex-col gap-4">
        <span className="text-[11px] font-bold uppercase tracking-wider text-roomly-dark">
          In-room furnishings & specs
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-roomly-dark">
          {property.furnishingDetails.map((detail) => (
            <div key={detail} className="flex items-center gap-2.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-roomly-green flex-shrink-0" />
              <span className="leading-snug">{detail}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
