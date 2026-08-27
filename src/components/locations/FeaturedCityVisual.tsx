"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CityData } from "@/data/locations";
import { RoomlyButton } from "@/components/ui/RoomlyButton";
import { cn } from "@/lib/utils";

export interface FeaturedCityVisualProps {
  city: CityData;
  className?: string;
}

export function FeaturedCityVisual({
  city,
  className,
}: FeaturedCityVisualProps) {
  return (
    <div
      className={cn(
        "relative w-full rounded-3xl overflow-hidden shadow-2xl border border-roomly-border aspect-[16/8] sm:aspect-[21/9] flex items-end select-none",
        className
      )}
    >
      <Image
        src={city.image}
        alt={`${city.name} city architecture`}
        fill
        sizes="100vw"
        className="object-cover brightness-[0.7] contrast-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

      {/* Editorial Content Overlay */}
      <div className="relative z-10 p-6 sm:p-10 lg:p-14 w-full flex flex-col md:flex-row md:items-end justify-between gap-6 text-white">
        <div className="flex flex-col gap-2 max-w-xl">
          <span className="text-[11px] uppercase tracking-widest font-bold text-roomly-lime">
            {city.availableRooms} rooms available
          </span>

          <h3 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight uppercase leading-tight text-white">
            {city.name}
          </h3>

          <p className="text-xs sm:text-sm text-roomly-cream/80 leading-relaxed pt-1">
            &ldquo;{city.tagline}&rdquo;
          </p>
        </div>

        <div className="flex-shrink-0">
          <Link href={`/rooms?city=${encodeURIComponent(city.name)}`}>
            <RoomlyButton
              variant="lime"
              size="md"
              shape="pill"
              withArrow
              arrowStyle="circle"
              className="text-xs sm:text-sm font-semibold shadow-xl"
            >
              Explore rooms in {city.name}
            </RoomlyButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
