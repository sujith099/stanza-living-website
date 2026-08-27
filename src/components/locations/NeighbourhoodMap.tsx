"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Plus, Minus, MapPin, Train } from "lucide-react";
import { Neighbourhood } from "@/data/locations";
import { RoomlyButton } from "@/components/ui/RoomlyButton";
import { cn } from "@/lib/utils";

export interface NeighbourhoodMapProps {
  neighbourhoods: Neighbourhood[];
  cityName: string;
  className?: string;
}

export function NeighbourhoodMap({
  neighbourhoods,
  cityName,
  className,
}: NeighbourhoodMapProps) {
  const [selectedSlug, setSelectedSlug] = useState<string>(
    neighbourhoods[0]?.slug || ""
  );
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const selectedNeighbourhood =
    neighbourhoods.find((n) => n.slug === selectedSlug) || neighbourhoods[0];

  const handleZoomIn = () => setZoomLevel((z) => Math.min(z + 0.15, 1.4));
  const handleZoomOut = () => setZoomLevel((z) => Math.max(z - 0.15, 0.85));

  return (
    <section className={cn("flex flex-col gap-6 w-full", className)}>
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
        <div className="flex flex-col gap-1">
          <h3 className="font-display font-bold text-2xl sm:text-3xl text-roomly-dark">
            Interactive {cityName} Map
          </h3>
          <p className="text-xs sm:text-sm text-roomly-muted">
            Tap markers to preview typical monthly rent and transit times
          </p>
        </div>

        <span className="text-xs font-semibold text-roomly-green hidden sm:inline">
          {neighbourhoods.length} mapped hubs
        </span>
      </div>

      {/* Map Graphic Canvas */}
      <div className="relative w-full h-[450px] sm:h-[500px] rounded-3xl bg-[#ECE8DF] border border-roomly-border overflow-hidden shadow-inner select-none flex items-center justify-center">
        {/* Architectural Canvas */}
        <div
          style={{ transform: `scale(${zoomLevel})` }}
          className="relative w-full h-full transition-transform duration-300 ease-out"
        >
          {/* Subtle Grid SVG */}
          <svg
            className="absolute inset-0 w-full h-full opacity-35"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="cityLocationsGrid"
                width="60"
                height="60"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 60 0 L 0 0 0 60"
                  fill="none"
                  stroke="#DDDCD5"
                  strokeWidth="0.8"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cityLocationsGrid)" />

            {/* Urban Arteries */}
            <path
              d="M 50,180 Q 300,120 750,260"
              stroke="#111412"
              strokeWidth="4"
              className="opacity-20"
              fill="none"
            />
            <path
              d="M 450,40 Q 500,320 400,600"
              stroke="#111412"
              strokeWidth="4"
              className="opacity-20"
              fill="none"
            />
            <path
              d="M 120,420 Q 420,380 820,440"
              stroke="#164F3D"
              strokeWidth="2.5"
              strokeDasharray="6 6"
              className="opacity-40"
              fill="none"
            />
          </svg>

          {/* Neighbourhood Markers */}
          {neighbourhoods.map((n) => {
            const isSelected = selectedSlug === n.slug;

            return (
              <button
                key={n.slug}
                type="button"
                onClick={() => setSelectedSlug(n.slug)}
                style={{
                  left: `${n.mapCoords.x}%`,
                  top: `${n.mapCoords.y}%`,
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
                aria-label={`View ${n.name}`}
              >
                <div
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg transition-all duration-300",
                    isSelected
                      ? "bg-roomly-dark text-roomly-lime ring-4 ring-roomly-lime scale-110 shadow-2xl"
                      : "bg-white text-roomly-dark border border-roomly-border hover:bg-roomly-dark hover:text-white"
                  )}
                >
                  <MapPin className="w-3 h-3 text-roomly-lime flex-shrink-0" />
                  <span>{n.name}</span>
                  <span className="text-[10px] font-normal opacity-80 hidden sm:inline">
                    · {n.rooms} rms
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Floating Preview Card on Marker Select */}
        {selectedNeighbourhood && (
          <div className="absolute bottom-5 left-5 right-5 sm:right-auto sm:w-80 z-30 bg-[#FDFCF8] border border-roomly-border rounded-2xl p-4 shadow-2xl flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-wider text-roomly-muted">
                  {cityName}
                </span>
                <h4 className="font-display font-bold text-base text-roomly-dark">
                  {selectedNeighbourhood.name}
                </h4>
              </div>
              <span className="text-xs font-bold text-roomly-green">
                {selectedNeighbourhood.rooms} rooms
              </span>
            </div>

            <div className="flex items-center justify-between text-xs py-1 border-y border-roomly-border">
              <span className="text-roomly-muted">Rent: {selectedNeighbourhood.rentRange}</span>
              <span className="font-semibold text-roomly-dark flex items-center gap-1">
                <Train className="w-3 h-3 text-roomly-green" />
                <span>{selectedNeighbourhood.metroTime.split(" ")[0]}m</span>
              </span>
            </div>

            <Link
              href={`/rooms?city=${encodeURIComponent(
                cityName
              )}&neighbourhood=${encodeURIComponent(selectedNeighbourhood.name)}`}
            >
              <RoomlyButton
                variant="lime"
                size="sm"
                shape="pill"
                withArrow
                arrowStyle="circle"
                className="w-full justify-center text-xs font-semibold"
              >
                Explore rooms in {selectedNeighbourhood.name}
              </RoomlyButton>
            </Link>
          </div>
        )}

        {/* Zoom Controls */}
        <div className="absolute top-5 right-5 z-30 flex flex-col gap-1.5 bg-white border border-roomly-border rounded-xl p-1 shadow-md">
          <button
            type="button"
            onClick={handleZoomIn}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-roomly-dark hover:bg-roomly-bg transition-colors cursor-pointer"
            aria-label="Zoom in"
          >
            <Plus className="w-4 h-4" />
          </button>
          <div className="h-px bg-roomly-border" />
          <button
            type="button"
            onClick={handleZoomOut}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-roomly-dark hover:bg-roomly-bg transition-colors cursor-pointer"
            aria-label="Zoom out"
          >
            <Minus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
