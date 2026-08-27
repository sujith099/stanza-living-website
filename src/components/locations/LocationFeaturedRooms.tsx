"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Property } from "@/data/properties";
import { PropertyCard } from "@/components/ui/PropertyCard";
import { cn } from "@/lib/utils";

export interface LocationFeaturedRoomsProps {
  cityName: string;
  allProperties: Property[];
  className?: string;
}

export function LocationFeaturedRooms({
  cityName,
  allProperties,
  className,
}: LocationFeaturedRoomsProps) {
  // Filter properties by current city or fallback to first 3
  const cityRooms = allProperties.filter(
    (p) => p.city.toLowerCase() === cityName.toLowerCase()
  );
  const roomsToShow = cityRooms.length > 0 ? cityRooms.slice(0, 3) : allProperties.slice(0, 3);

  return (
    <section className={cn("flex flex-col gap-8 w-full", className)}>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h3 className="font-display font-bold text-2xl sm:text-3xl text-roomly-dark">
            Rooms around {cityName}.
          </h3>
          <p className="text-xs sm:text-sm text-roomly-muted">
            Verified private and shared residences available for September move-in
          </p>
        </div>

        <Link
          href={`/rooms?city=${encodeURIComponent(cityName)}`}
          className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-roomly-dark hover:text-roomly-green transition-colors"
        >
          <span>See all {cityRooms.length || allProperties.length} rooms in {cityName}</span>
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
        {roomsToShow.map((property, idx) => (
          <PropertyCard
            key={property.id}
            property={property}
            priority={idx === 0}
          />
        ))}
      </div>
    </section>
  );
}
