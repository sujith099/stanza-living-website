"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Train } from "lucide-react";
import { Neighbourhood } from "@/data/locations";
import { ROOMLY_EASE } from "@/lib/animations";
import { cn } from "@/lib/utils";

export interface NeighbourhoodCardProps {
  neighbourhood: Neighbourhood;
  cityName: string;
  isSelected?: boolean;
  onSelect: (neighbourhood: Neighbourhood) => void;
  className?: string;
}

export function NeighbourhoodCard({
  neighbourhood,
  cityName,
  isSelected = false,
  onSelect,
  className,
}: NeighbourhoodCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: ROOMLY_EASE }}
      onClick={() => onSelect(neighbourhood)}
      className={cn(
        "group relative flex flex-col bg-[#FDFCF8] border rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer select-none",
        isSelected
          ? "border-roomly-dark ring-2 ring-roomly-dark"
          : "border-roomly-border hover:border-roomly-dark/40",
        className
      )}
    >
      {/* Top Image Canvas */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-roomly-cream/50">
        <Image
          src={neighbourhood.image}
          alt={`${neighbourhood.name} in ${cityName}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Room Count Pill */}
        <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-roomly-dark/85 backdrop-blur-md text-roomly-cream text-[11px] font-bold tracking-tight shadow">
          {neighbourhood.rooms} rooms available
        </div>

        {/* Metro Time Pill */}
        <div className="absolute bottom-3.5 left-3.5 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-md text-roomly-dark text-[11px] font-semibold">
          <Train className="w-3 h-3 text-roomly-green" />
          <span>{neighbourhood.metroTime}</span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 sm:p-6 flex flex-col justify-between flex-grow gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-start justify-between gap-2">
            <h4 className="font-display font-bold text-xl text-roomly-dark group-hover:text-roomly-green transition-colors">
              {neighbourhood.name}
            </h4>

            <div className="w-8 h-8 rounded-full border border-roomly-border flex items-center justify-center bg-white group-hover:bg-roomly-dark group-hover:text-roomly-lime group-hover:border-roomly-dark transition-all duration-300 flex-shrink-0">
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>

          {/* Typical Rent Range */}
          <div className="flex items-baseline gap-1 text-xs">
            <span className="font-semibold text-roomly-muted">Typical rent:</span>
            <span className="font-bold text-roomly-dark text-sm">
              {neighbourhood.rentRange}
            </span>
            <span className="text-roomly-muted">/ mo</span>
          </div>

          {/* Description */}
          <p className="text-xs text-roomly-muted leading-relaxed line-clamp-2 pt-1">
            {neighbourhood.description}
          </p>
        </div>

        {/* Tags footer */}
        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-roomly-border/70">
          {neighbourhood.goodFor.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-full bg-roomly-bg border border-roomly-border text-[10px] font-medium text-roomly-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
