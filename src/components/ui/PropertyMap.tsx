"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Navigation, X, Star, ArrowUpRight } from "lucide-react";
import { Property } from "@/data/properties";
import { cn } from "@/lib/utils";
import { ROOMLY_EASE } from "@/lib/animations";

export interface PropertyMapProps {
  properties: Property[];
  className?: string;
  selectedCity?: string;
}

export function PropertyMap({
  properties,
  className,
  selectedCity = "Bengaluru",
}: PropertyMapProps) {
  const [zoom, setZoom] = useState(1);
  const [activePropertyId, setActivePropertyId] = useState<string | null>(
    properties[0]?.id || null
  );

  const activeProperty = properties.find((p) => p.id === activePropertyId);

  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.2, 1.6));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.2, 0.8));
  const handleReset = () => {
    setZoom(1);
    if (properties[0]) setActivePropertyId(properties[0].id);
  };

  return (
    <div
      className={cn(
        "relative w-full h-[640px] md:h-[720px] bg-[#EBE7DC] border border-roomly-border rounded-3xl overflow-hidden shadow-inner select-none",
        className
      )}
    >
      {/* Map Interactive Canvas */}
      <motion.div
        animate={{ scale: zoom }}
        transition={{ duration: 0.4, ease: ROOMLY_EASE }}
        className="relative w-full h-full origin-center"
      >
        {/* Subtle Architectural Grid Lines & Metro Network Lines */}
        <svg
          className="absolute inset-0 w-full h-full opacity-35 pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="architecturalGrid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="#DDDCD5"
                strokeWidth="0.75"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#architecturalGrid)" />

          {/* Stylized Transit Arteries */}
          <path
            d="M 50,150 Q 250,220 500,280 T 900,450"
            fill="none"
            stroke="#164F3D"
            strokeWidth="3.5"
            strokeDasharray="6 6"
            className="opacity-40"
          />
          <path
            d="M 300,50 Q 420,300 480,550 T 600,800"
            fill="none"
            stroke="#727A74"
            strokeWidth="2.5"
            className="opacity-30"
          />
        </svg>

        {/* Neighborhood Area Typography Watermarks */}
        <div className="absolute top-[32%] left-[54%] -translate-x-1/2 text-sm md:text-base font-display font-bold tracking-widest text-[#727A74]/35 uppercase pointer-events-none">
          Indiranagar
        </div>
        <div className="absolute top-[52%] left-[48%] -translate-x-1/2 text-sm md:text-base font-display font-bold tracking-widest text-[#727A74]/35 uppercase pointer-events-none">
          Koramangala
        </div>
        <div className="absolute top-[65%] left-[60%] -translate-x-1/2 text-sm md:text-base font-display font-bold tracking-widest text-[#727A74]/35 uppercase pointer-events-none">
          HSR Layout
        </div>
        <div className="absolute top-[75%] left-[40%] -translate-x-1/2 text-sm md:text-base font-display font-bold tracking-widest text-[#727A74]/35 uppercase pointer-events-none">
          BTM Layout
        </div>
        <div className="absolute top-[40%] left-[84%] -translate-x-1/2 text-sm md:text-base font-display font-bold tracking-widest text-[#727A74]/35 uppercase pointer-events-none">
          Whitefield
        </div>
        <div className="absolute top-[88%] left-[66%] -translate-x-1/2 text-sm md:text-base font-display font-bold tracking-widest text-[#727A74]/35 uppercase pointer-events-none">
          Electronic City
        </div>

        {/* Interactive Price Markers */}
        {properties.map((property) => {
          const isActive = activePropertyId === property.id;
          const kPrice = `₹${(property.rent / 1000).toFixed(1)}k`;

          return (
            <motion.div
              key={property.id}
              style={{
                left: `${property.mapCoords.x}%`,
                top: `${property.mapCoords.y}%`,
              }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActivePropertyId(property.id)}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer"
            >
              <div
                className={cn(
                  "flex items-center gap-1 px-3 py-1.5 rounded-full font-display font-bold text-xs shadow-xl transition-all duration-300",
                  isActive
                    ? "bg-roomly-lime text-roomly-dark scale-110 ring-4 ring-roomly-lime/30 shadow-2xl z-30 font-extrabold"
                    : "bg-roomly-dark text-roomly-cream hover:bg-roomly-green hover:text-white border border-white/20"
                )}
              >
                <span>{kPrice}</span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Map Floating Controls (Top Right) */}
      <div className="absolute top-4 right-4 z-30 flex flex-col gap-2 bg-white/90 backdrop-blur-md p-1.5 rounded-2xl border border-roomly-border shadow-lg">
        <button
          type="button"
          onClick={handleZoomIn}
          className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-roomly-bg text-roomly-dark transition-colors"
          aria-label="Zoom in"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={handleZoomOut}
          className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-roomly-bg text-roomly-dark transition-colors"
          aria-label="Zoom out"
        >
          <Minus className="w-4 h-4" />
        </button>
        <div className="w-full h-px bg-roomly-border/70" />
        <button
          type="button"
          onClick={handleReset}
          className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-roomly-bg text-roomly-dark transition-colors"
          aria-label="Reset map"
          title="Reset map view"
        >
          <Navigation className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Active City Pill (Top Left) */}
      <div className="absolute top-4 left-4 z-30 bg-roomly-dark/85 backdrop-blur-md text-roomly-cream px-3.5 py-1.5 rounded-full text-xs font-medium border border-white/10 shadow-md flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-roomly-lime animate-pulse" />
        <span>{selectedCity} Map · {properties.length} Active Pins</span>
      </div>

      {/* Floating Property Preview Card (Bottom Left) */}
      <AnimatePresence>
        {activeProperty && (
          <motion.div
            key={activeProperty.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.3, ease: ROOMLY_EASE }}
            className="absolute bottom-5 left-5 right-5 sm:right-auto sm:max-w-sm z-30 bg-[#FDFCF8] border border-roomly-border/90 rounded-2xl shadow-2xl overflow-hidden p-3.5 flex gap-3.5 items-center"
          >
            {/* Thumbnail */}
            <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-roomly-cream/50">
              <Image
                src={activeProperty.images[0]}
                alt={activeProperty.name}
                fill
                sizes="96px"
                className="object-cover"
              />
            </div>

            {/* Info */}
            <div className="flex flex-col justify-between flex-grow min-w-0 pr-1">
              <div className="flex items-start justify-between gap-1">
                <div className="min-w-0">
                  <div className="text-[10px] uppercase tracking-wider font-semibold text-roomly-muted truncate">
                    {activeProperty.neighbourhood}
                  </div>
                  <h4 className="font-display font-bold text-sm text-roomly-dark truncate">
                    {activeProperty.name}
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActivePropertyId(null);
                  }}
                  className="p-1 text-roomly-muted hover:text-roomly-dark"
                  aria-label="Close preview"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center gap-1 text-[11px] text-roomly-dark font-medium my-1">
                <Star className="w-3 h-3 fill-roomly-dark text-roomly-dark" />
                <span>{activeProperty.rating.toFixed(1)}</span>
                <span className="text-roomly-muted">· {activeProperty.roomType}</span>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-roomly-border">
                <span className="font-display font-bold text-sm text-roomly-dark">
                  ₹{activeProperty.rent.toLocaleString("en-IN")}
                  <span className="text-[10px] text-roomly-muted font-normal">/mo</span>
                </span>

                <Link
                  href={`/rooms/${activeProperty.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-roomly-green hover:underline"
                >
                  <span>View</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
