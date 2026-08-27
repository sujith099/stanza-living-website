"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Location } from "@/data/locations";
import { cn } from "@/lib/utils";

export interface LocationCardProps {
  location: Location;
  className?: string;
  onClick?: () => void;
}

export function LocationCard({
  location,
  className,
  onClick,
}: LocationCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "group relative aspect-[4/5] sm:aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer select-none bg-roomly-dark border border-roomly-border/20 shadow-lg transition-transform duration-500 hover:-translate-y-1.5",
        className
      )}
    >
      {/* Cinematic Background Image */}
      <Image
        src={location.image}
        alt={`${location.name}, ${location.city}`}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-90"
      />

      {/* Cinematic Vignette / Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-roomly-dark via-roomly-dark/40 to-transparent" />

      {/* Top Badge: Property Count */}
      <div className="absolute top-4 right-4 z-10">
        <span className="px-3 py-1 text-xs font-medium text-roomly-cream/90 bg-roomly-dark/70 backdrop-blur-md rounded-full border border-white/10">
          {location.propertyCount} residences
        </span>
      </div>

      {/* Bottom Content: Editorial Typography */}
      <div className="absolute inset-x-0 bottom-0 p-6 z-10 flex flex-col justify-end gap-2">
        <span className="text-[11px] font-semibold uppercase tracking-widest text-roomly-lime">
          {location.city}
        </span>

        <h3 className="font-display text-2xl sm:text-3xl font-bold text-roomly-cream tracking-tight group-hover:text-white transition-colors">
          {location.name}
        </h3>

        <p className="text-xs text-roomly-cream/70 line-clamp-2 leading-relaxed">
          {location.vibe}
        </p>

        <div className="pt-3 flex items-center justify-between border-t border-white/15 mt-2">
          <span className="text-xs font-medium text-roomly-cream/80">
            Explore neighborhood
          </span>
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-roomly-cream group-hover:bg-roomly-lime group-hover:text-roomly-dark transition-all duration-300">
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </div>
    </div>
  );
}
