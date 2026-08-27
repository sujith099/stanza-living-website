"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, Train, IndianRupee, Check, X } from "lucide-react";
import { Neighbourhood } from "@/data/locations";
import { RoomlyButton } from "@/components/ui/RoomlyButton";
import { ROOMLY_EASE } from "@/lib/animations";
import { cn } from "@/lib/utils";

export interface NeighbourhoodDetailPreviewProps {
  neighbourhood: Neighbourhood | null;
  cityName: string;
  onClose: () => void;
  className?: string;
}

export function NeighbourhoodDetailPreview({
  neighbourhood,
  cityName,
  onClose,
  className,
}: NeighbourhoodDetailPreviewProps) {
  if (!neighbourhood) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 15 }}
        transition={{ duration: 0.35, ease: ROOMLY_EASE }}
        className={cn(
          "p-6 sm:p-8 rounded-3xl bg-[#FDFCF8] border-2 border-roomly-dark shadow-xl flex flex-col md:flex-row gap-8 items-start relative select-none",
          className
        )}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-roomly-bg hover:bg-roomly-border flex items-center justify-center text-roomly-dark transition-colors cursor-pointer"
          aria-label="Close detail preview"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left Image Aspect */}
        <div className="relative w-full md:w-80 h-56 rounded-2xl overflow-hidden shadow-md flex-shrink-0 bg-roomly-cream/50">
          <Image
            src={neighbourhood.image}
            alt={neighbourhood.name}
            fill
            sizes="(max-width: 768px) 100vw, 320px"
            className="object-cover"
          />
          <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-roomly-dark/85 backdrop-blur-md text-roomly-cream text-[11px] font-bold">
            {neighbourhood.rooms} rooms
          </div>
        </div>

        {/* Right Information */}
        <div className="flex flex-col gap-4 flex-grow pr-6">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-xs text-roomly-muted">
              <Compass className="w-3.5 h-3.5 text-roomly-green" />
              <span>
                {cityName} · {neighbourhood.lifestyle.join(" · ")}
              </span>
            </div>
            <h3 className="font-display font-black text-2xl sm:text-3xl text-roomly-dark">
              {neighbourhood.name}
            </h3>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-roomly-muted">
              Why people choose it
            </span>
            <p className="text-xs sm:text-sm text-roomly-dark leading-relaxed">
              {neighbourhood.description}
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-roomly-bg border border-roomly-border flex flex-col">
              <span className="text-[10px] uppercase font-semibold text-roomly-muted flex items-center gap-1">
                <IndianRupee className="w-3 h-3" />
                <span>Typical rent</span>
              </span>
              <span className="font-display font-bold text-xs sm:text-sm text-roomly-dark">
                {neighbourhood.rentRange}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-roomly-bg border border-roomly-border flex flex-col">
              <span className="text-[10px] uppercase font-semibold text-roomly-muted flex items-center gap-1">
                <Train className="w-3 h-3" />
                <span>Transit</span>
              </span>
              <span className="font-display font-bold text-xs sm:text-sm text-roomly-dark">
                {neighbourhood.metroTime}
              </span>
            </div>

            <div className="col-span-2 sm:col-span-1 p-3 rounded-xl bg-roomly-bg border border-roomly-border flex flex-col">
              <span className="text-[10px] uppercase font-semibold text-roomly-muted">
                Popular for
              </span>
              <span className="font-display font-bold text-xs sm:text-sm text-roomly-dark truncate">
                {neighbourhood.goodFor.slice(0, 2).join(", ")}
              </span>
            </div>
          </div>

          {/* Key Highlights */}
          <div className="flex flex-wrap gap-2 pt-1">
            {neighbourhood.keyHighlights.map((hl) => (
              <span
                key={hl}
                className="inline-flex items-center gap-1 text-[11px] font-medium text-roomly-green bg-roomly-green/10 px-2.5 py-1 rounded-full"
              >
                <Check className="w-3 h-3" />
                <span>{hl}</span>
              </span>
            ))}
          </div>

          {/* Action CTA Link */}
          <div className="pt-2">
            <Link
              href={`/rooms?city=${encodeURIComponent(
                cityName
              )}&neighbourhood=${encodeURIComponent(neighbourhood.name)}`}
            >
              <RoomlyButton
                variant="lime"
                size="md"
                shape="pill"
                withArrow
                arrowStyle="circle"
                className="text-xs font-semibold shadow-md"
              >
                See rooms in {neighbourhood.name}
              </RoomlyButton>
            </Link>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
