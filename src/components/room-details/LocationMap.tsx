"use client";

import React, { useState } from "react";
import { Train, Briefcase, Utensils, ShoppingBag, PlusSquare, GraduationCap, MapPin } from "lucide-react";
import { NearbyPlace } from "@/data/properties";
import { cn } from "@/lib/utils";

export interface LocationMapProps {
  propertyName: string;
  neighbourhood: string;
  city: string;
  nearbyPlaces: NearbyPlace[];
  className?: string;
}

const PLACE_ICON_MAP: Record<string, React.ReactNode> = {
  transit: <Train className="w-3.5 h-3.5" />,
  workspace: <Briefcase className="w-3.5 h-3.5" />,
  food: <Utensils className="w-3.5 h-3.5" />,
  grocery: <ShoppingBag className="w-3.5 h-3.5" />,
  health: <PlusSquare className="w-3.5 h-3.5" />,
  education: <GraduationCap className="w-3.5 h-3.5" />,
};

export function LocationMap({
  propertyName,
  neighbourhood,
  city,
  nearbyPlaces,
  className,
}: LocationMapProps) {
  const [selectedPlaceId, setSelectedPlaceId] = useState<string>(
    nearbyPlaces[0]?.id || ""
  );

  return (
    <section className={cn("flex flex-col gap-6", className)}>
      <div className="flex flex-col gap-1">
        <h2 className="font-display font-bold text-2xl text-roomly-dark">
          Everything around you
        </h2>
        <p className="text-xs sm:text-sm text-roomly-muted">
          Centred on 12th Main, {neighbourhood} · {city}
        </p>
      </div>

      {/* Map Graphic Canvas */}
      <div className="relative w-full h-80 sm:h-96 rounded-3xl bg-[#ECE8DF] border border-roomly-border overflow-hidden shadow-inner select-none flex items-center justify-center">
        {/* Subtle Map Grid */}
        <svg
          className="absolute inset-0 w-full h-full opacity-35"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="detailMapGrid"
              width="50"
              height="50"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 50 0 L 0 0 0 50"
                fill="none"
                stroke="#DDDCD5"
                strokeWidth="0.8"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#detailMapGrid)" />

          {/* Roads network */}
          <path
            d="M 0,160 L 800,160"
            stroke="#111412"
            strokeWidth="3"
            className="opacity-20"
          />
          <path
            d="M 400,0 L 400,600"
            stroke="#111412"
            strokeWidth="3"
            className="opacity-20"
          />
          <path
            d="M 120,40 Q 300,180 650,220"
            fill="none"
            stroke="#164F3D"
            strokeWidth="2.5"
            strokeDasharray="4 4"
            className="opacity-40"
          />
        </svg>

        {/* Central Residence Pin */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-roomly-dark text-roomly-lime shadow-2xl flex items-center justify-center ring-4 ring-white border border-white/20">
            <MapPin className="w-5 h-5 fill-roomly-lime text-roomly-dark" />
          </div>
          <span className="mt-1.5 px-2.5 py-0.5 rounded-md bg-roomly-dark text-roomly-cream text-[10px] font-bold tracking-tight shadow">
            {propertyName}
          </span>
        </div>

        {/* Nearby Place Pins */}
        {nearbyPlaces.map((place) => {
          const isSelected = selectedPlaceId === place.id;
          const icon = PLACE_ICON_MAP[place.type] || <MapPin className="w-3.5 h-3.5" />;

          return (
            <button
              key={place.id}
              type="button"
              onClick={() => setSelectedPlaceId(place.id)}
              style={{ left: `${place.x}%`, top: `${place.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
              aria-label={`View ${place.name}`}
            >
              <div
                className={cn(
                  "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold shadow-md transition-all duration-300",
                  isSelected
                    ? "bg-roomly-green text-white scale-110 ring-2 ring-roomly-lime"
                    : "bg-white text-roomly-dark hover:bg-roomly-cream/80 border border-roomly-border"
                )}
              >
                <span>{icon}</span>
                <span className="text-[11px] font-medium hidden sm:inline">
                  {place.time}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Places List Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {nearbyPlaces.map((place) => {
          const isSelected = selectedPlaceId === place.id;
          const icon = PLACE_ICON_MAP[place.type];

          return (
            <div
              key={place.id}
              onClick={() => setSelectedPlaceId(place.id)}
              className={cn(
                "p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between gap-2 select-none",
                isSelected
                  ? "bg-white border-roomly-dark shadow-md"
                  : "bg-[#FDFCF8] border-roomly-border hover:border-roomly-dark/40"
              )}
            >
              <div className="flex items-center justify-between">
                <div className="w-7 h-7 rounded-lg bg-roomly-cream/60 flex items-center justify-center text-roomly-dark">
                  {icon}
                </div>
                <span className="text-xs font-bold text-roomly-dark">
                  {place.time}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-xs font-semibold text-roomly-dark truncate">
                  {place.name}
                </span>
                <span className="text-[11px] text-roomly-muted">
                  {place.distance} walk
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
