"use client";

import React from "react";
import { Compass, Train, Users, IndianRupee } from "lucide-react";
import { Property } from "@/data/properties";
import { cn } from "@/lib/utils";

export interface NeighbourhoodInfoProps {
  property: Property;
  className?: string;
}

export function NeighbourhoodInfo({
  property,
  className,
}: NeighbourhoodInfoProps) {
  const summary = property.neighbourhoodSummary;

  return (
    <div
      className={cn(
        "p-6 sm:p-7 rounded-2xl bg-[#FDFCF8] border border-roomly-border flex flex-col gap-5",
        className
      )}
    >
      <div className="flex items-center gap-2">
        <Compass className="w-4 h-4 text-roomly-green" />
        <h3 className="font-display font-bold text-lg text-roomly-dark">
          {summary.title}
        </h3>
      </div>

      <p className="text-xs sm:text-sm text-roomly-muted leading-relaxed">
        {summary.description}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-roomly-border">
        <div className="flex flex-col gap-1 p-3 rounded-xl bg-roomly-bg">
          <span className="text-[10px] uppercase font-semibold text-roomly-muted flex items-center gap-1">
            <IndianRupee className="w-3 h-3" />
            <span>Average room rent</span>
          </span>
          <span className="font-display font-bold text-sm text-roomly-dark">
            {summary.avgRent}
          </span>
        </div>

        <div className="flex flex-col gap-1 p-3 rounded-xl bg-roomly-bg">
          <span className="text-[10px] uppercase font-semibold text-roomly-muted flex items-center gap-1">
            <Train className="w-3 h-3" />
            <span>Metro Access</span>
          </span>
          <span className="font-display font-bold text-sm text-roomly-dark">
            {summary.metroDistance}
          </span>
        </div>

        <div className="flex flex-col gap-1 p-3 rounded-xl bg-roomly-bg">
          <span className="text-[10px] uppercase font-semibold text-roomly-muted flex items-center gap-1">
            <Users className="w-3 h-3" />
            <span>Popular With</span>
          </span>
          <span className="font-display font-bold text-xs text-roomly-dark leading-snug">
            {summary.popularWith}
          </span>
        </div>
      </div>
    </div>
  );
}
