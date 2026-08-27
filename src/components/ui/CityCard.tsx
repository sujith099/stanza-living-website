"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { CityLocation } from "@/data/locations";
import { cn } from "@/lib/utils";

export interface CityCardProps {
  city: CityLocation;
  onClick?: () => void;
  className?: string;
}

export function CityCard({ city, onClick, className }: CityCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "group relative flex flex-col justify-between bg-[#FDFCF8] border border-roomly-border rounded-2xl p-5 sm:p-6 select-none cursor-pointer transition-all duration-400 overflow-hidden",
        "hover:-translate-y-1.5 hover:shadow-xl hover:border-roomly-dark/40",
        className
      )}
    >
      {/* Top row: City Name + Arrow */}
      <div className="flex items-start justify-between z-10">
        <div className="flex flex-col gap-1">
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-roomly-dark tracking-tight transition-colors duration-300 group-hover:text-roomly-green">
            {city.name}
          </h3>
          <span className="text-xs sm:text-sm text-roomly-muted font-medium">
            {city.propertyCount} homes
          </span>
        </div>

        {/* Action Arrow */}
        <div className="w-9 h-9 rounded-full border border-roomly-border flex items-center justify-center bg-white text-roomly-dark transition-all duration-300 group-hover:bg-roomly-dark group-hover:text-roomly-cream group-hover:border-roomly-dark shadow-sm">
          <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>

      {/* Subtle architectural image representation */}
      <div className="relative mt-6 aspect-[16/10] w-full rounded-xl overflow-hidden bg-roomly-cream/40">
        <Image
          src={city.image}
          alt={city.name}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-roomly-dark/40 to-transparent" />
      </div>

      {/* Bottom neighborhood tagline */}
      <div className="pt-3.5 z-10">
        <p className="text-[11px] sm:text-xs text-roomly-muted line-clamp-1">
          {city.tagline}
        </p>
      </div>
    </div>
  );
}
