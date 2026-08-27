"use client";

import React from "react";
import { Train, Clock, Users, IndianRupee } from "lucide-react";
import { CityData } from "@/data/locations";
import { cn } from "@/lib/utils";

export interface CityOverviewProps {
  city: CityData;
  className?: string;
}

export function CityOverview({ city, className }: CityOverviewProps) {
  return (
    <div
      className={cn(
        "p-6 sm:p-7 rounded-3xl bg-[#FDFCF8] border border-roomly-border shadow-sm flex flex-col gap-6",
        className
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-4 border-b border-roomly-border">
        <div className="flex items-baseline gap-3">
          <h3 className="font-display font-bold text-2xl text-roomly-dark">
            {city.name}
          </h3>
          <span className="text-xs font-semibold text-roomly-green">
            {city.availableRooms} verified rooms
          </span>
        </div>
        <p className="text-xs text-roomly-muted max-w-md">
          {city.description}
        </p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
        {/* Average rent */}
        <div className="p-4 rounded-2xl bg-roomly-bg border border-roomly-border flex flex-col gap-1">
          <span className="text-[10px] uppercase font-semibold text-roomly-muted flex items-center gap-1">
            <IndianRupee className="w-3 h-3" />
            <span>Average rent</span>
          </span>
          <span className="font-display font-bold text-base text-roomly-dark">
            {city.averageRent}
          </span>
          <span className="text-[11px] text-roomly-muted">per resident</span>
        </div>

        {/* Popular with */}
        <div className="p-4 rounded-2xl bg-roomly-bg border border-roomly-border flex flex-col gap-1">
          <span className="text-[10px] uppercase font-semibold text-roomly-muted flex items-center gap-1">
            <Users className="w-3 h-3" />
            <span>Popular with</span>
          </span>
          <span className="font-display font-bold text-xs text-roomly-dark line-clamp-1">
            {city.popularWith}
          </span>
          <span className="text-[11px] text-roomly-muted">verified tenants</span>
        </div>

        {/* Commute */}
        <div className="p-4 rounded-2xl bg-roomly-bg border border-roomly-border flex flex-col gap-1">
          <span className="text-[10px] uppercase font-semibold text-roomly-muted flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>Typical commute</span>
          </span>
          <span className="font-display font-bold text-base text-roomly-dark">
            {city.averageCommute}
          </span>
          <span className="text-[11px] text-roomly-muted">to major tech hubs</span>
        </div>

        {/* Metro connected */}
        <div className="p-4 rounded-2xl bg-roomly-bg border border-roomly-border flex flex-col gap-1">
          <span className="text-[10px] uppercase font-semibold text-roomly-muted flex items-center gap-1">
            <Train className="w-3 h-3" />
            <span>Rapid transit</span>
          </span>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-2 h-2 rounded-full bg-roomly-lime" />
            <span className="font-display font-bold text-sm text-roomly-dark">
              {city.metroConnected ? "Metro connected" : "Bus & Rail"}
            </span>
          </div>
          <span className="text-[11px] text-roomly-muted">high frequency lines</span>
        </div>
      </div>
    </div>
  );
}
