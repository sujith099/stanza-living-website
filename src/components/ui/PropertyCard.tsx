"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Star, ArrowUpRight } from "lucide-react";
import { Property } from "@/data/properties";
import { cn } from "@/lib/utils";
import { ROOMLY_EASE } from "@/lib/animations";

export interface PropertyCardProps {
  property: Property;
  layout?: "default" | "featured";
  viewMode?: "grid" | "list";
  onSave?: (id: string, isSaved: boolean) => void;
  onSaveToggle?: (id: string, isSaved: boolean) => void;
  className?: string;
  priority?: boolean;
}

import { useRoomlyAppSafe } from "@/context/RoomlyAppContext";

export function PropertyCard({
  property,
  layout = "default",
  viewMode = "grid",
  onSave,
  onSaveToggle,
  className,
  priority = false,
}: PropertyCardProps) {
  const appState = useRoomlyAppSafe();

  const [localSaved, setLocalSaved] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      const savedList = JSON.parse(localStorage.getItem("roomly_saved_rooms") || "[]");
      return savedList.includes(property.id);
    } catch {
      return false;
    }
  });

  const isSavedState = appState
    ? appState.isSaved(property.id) || appState.isSaved(property.slug)
    : localSaved;

  const isFeatured = layout === "featured";
  const isListView = viewMode === "list";

  const handleSaveToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (appState) {
      const nowSaved = appState.toggleSave(property.id);
      setLocalSaved(nowSaved);
      (onSaveToggle || onSave)?.(property.id, nowSaved);
      return;
    }

    const newSaved = !localSaved;
    setLocalSaved(newSaved);
    (onSaveToggle || onSave)?.(property.id, newSaved);
  };

  const badgeColorMap = {
    lime: "bg-roomly-lime text-roomly-dark font-semibold",
    coral: "bg-roomly-coral text-white font-medium",
    green: "bg-roomly-green text-roomly-cream font-medium",
    dark: "bg-roomly-dark text-roomly-cream font-medium",
  };

  const cardContent = (
    <div
      className={cn(
        "group relative flex bg-[#FDFCF8] border border-roomly-border rounded-2xl overflow-hidden transition-all duration-400 select-none",
        "hover:-translate-y-1.5 hover:shadow-xl hover:border-roomly-dark/40",
        isListView ? "flex-col sm:flex-row" : "flex-col",
        className
      )}
    >
      {/* Property Photography */}
      <div
        className={cn(
          "relative overflow-hidden bg-roomly-cream/40 flex-shrink-0",
          isListView
            ? "w-full sm:w-64 md:w-80 aspect-[4/3] sm:aspect-auto"
            : isFeatured
            ? "w-full aspect-[16/11] sm:aspect-[16/10]"
            : "w-full aspect-[4/3]"
        )}
      >
        <Image
          src={property.images[0]}
          alt={property.name}
          fill
          sizes={
            isListView
              ? "(max-width: 640px) 100vw, 320px"
              : isFeatured
              ? "(max-width: 1024px) 100vw, 60vw"
              : "(max-width: 768px) 100vw, 33vw"
          }
          priority={priority}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />

        {/* Top Badges & Save Heart Button */}
        <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between z-10 pointer-events-none">
          {property.badge ? (
            <span
              className={cn(
                "px-3 py-1 text-[11px] uppercase tracking-wider rounded-full shadow-sm backdrop-blur-sm pointer-events-auto font-medium",
                badgeColorMap[property.badgeType || "dark"]
              )}
            >
              {property.badge}
            </span>
          ) : (
            <span />
          )}

          {/* Animated Save Button */}
          <motion.button
            type="button"
            whileTap={{ scale: 0.8 }}
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 0.2, ease: ROOMLY_EASE }}
            onClick={handleSaveToggle}
            aria-label={isSavedState ? "Remove from saved" : "Save property"}
            className={cn(
              "p-2 rounded-full backdrop-blur-md transition-colors duration-300 pointer-events-auto cursor-pointer shadow-sm",
              isSavedState
                ? "bg-white text-roomly-coral shadow-md"
                : "bg-roomly-dark/40 text-white hover:bg-roomly-dark/75"
            )}
          >
            <Heart
              className={cn(
                "w-4 h-4 transition-all duration-300",
                isSavedState ? "fill-roomly-coral stroke-roomly-coral" : "stroke-white"
              )}
            />
          </motion.button>
        </div>

        {/* Bottom Tag: Live Availability */}
        <div className="absolute bottom-3 left-3 z-10">
          <div className="flex items-center gap-1.5 bg-roomly-dark/80 backdrop-blur-md text-roomly-cream text-[11px] font-medium px-2.5 py-0.5 rounded-full border border-white/10">
            <span
              className={cn(
                "w-1.5 h-1.5 rounded-full",
                property.isAvailableNow ? "bg-roomly-lime animate-pulse" : "bg-roomly-cream/50"
              )}
            />
            <span>{property.availability}</span>
          </div>
        </div>
      </div>

      {/* Property Details */}
      <div
        className={cn(
          "p-5 sm:p-6 flex flex-col justify-between flex-grow gap-4",
          isListView && "sm:py-6 sm:px-7"
        )}
      >
        <div className="flex flex-col gap-2">
          {/* Location & Rating */}
          <div className="flex items-center justify-between text-xs text-roomly-muted">
            <span className="font-medium tracking-tight">
              {property.neighbourhood} · {property.city}
            </span>
            <div className="flex items-center gap-1 text-roomly-dark font-medium">
              <Star className="w-3.5 h-3.5 fill-roomly-dark text-roomly-dark" />
              <span>{property.rating.toFixed(1)}</span>
              <span className="text-roomly-muted text-[11px]">
                ({property.reviewCount})
              </span>
            </div>
          </div>

          {/* Property Name */}
          <div className="flex items-baseline justify-between gap-2">
            <h3
              className={cn(
                "font-display font-bold text-roomly-dark tracking-tight transition-colors duration-300 group-hover:text-roomly-green",
                isFeatured ? "text-xl sm:text-2xl" : "text-lg sm:text-xl"
              )}
            >
              {property.name}
            </h3>
            <span className="text-xs text-roomly-muted font-medium capitalize">
              {property.roomType}
            </span>
          </div>

          {/* Description for featured or list card */}
          {(isFeatured || isListView) && (
            <p className="text-xs sm:text-sm text-roomly-muted leading-relaxed line-clamp-2">
              {property.description}
            </p>
          )}

          {/* Amenities Pills */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {property.amenities.slice(0, isListView ? 5 : isFeatured ? 4 : 3).map((amenity) => (
              <span
                key={amenity}
                className="text-[11px] text-roomly-muted bg-roomly-bg border border-roomly-border px-2.5 py-0.5 rounded-md font-medium"
              >
                {amenity}
              </span>
            ))}
            {property.amenities.length > (isListView ? 5 : isFeatured ? 4 : 3) && (
              <span className="text-[11px] text-roomly-muted/70 px-1 py-0.5">
                +{property.amenities.length - (isListView ? 5 : isFeatured ? 4 : 3)} more
              </span>
            )}
          </div>
        </div>

        {/* Pricing & Arrow Micro-Action */}
        <div className="pt-4 border-t border-roomly-border flex items-center justify-between">
          <div className="flex items-baseline gap-1">
            <span
              className={cn(
                "font-display font-bold text-roomly-dark tracking-tight",
                isFeatured || isListView ? "text-2xl" : "text-xl"
              )}
            >
              ₹{property.rent.toLocaleString("en-IN")}
            </span>
            <span className="text-xs text-roomly-muted font-normal">
              / {property.rentPeriod}
            </span>
          </div>

          {/* Arrow button with hover response */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-roomly-muted group-hover:text-roomly-dark transition-colors hidden sm:inline">
              Details
            </span>
            <div className="w-8 h-8 rounded-full border border-roomly-border flex items-center justify-center bg-white text-roomly-dark transition-all duration-300 group-hover:bg-roomly-dark group-hover:text-roomly-cream group-hover:border-roomly-dark">
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Link href={`/rooms/${property.slug}`} className="block h-full">
      {cardContent}
    </Link>
  );
}
