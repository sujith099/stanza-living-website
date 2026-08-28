"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Star, Heart, Share2, MapPin } from "lucide-react";
import { Property } from "@/data/properties";
import { ROOMLY_EASE } from "@/lib/animations";
import { cn } from "@/lib/utils";

export interface PropertyHeaderProps {
  property: Property;
  onToast: (msg: string) => void;
  className?: string;
}

import { useRoomlyAppSafe } from "@/context/RoomlyAppContext";

export function PropertyHeader({
  property,
  onToast,
  className,
}: PropertyHeaderProps) {
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

  const handleSaveToggle = () => {
    if (appState) {
      const nowSaved = appState.toggleSave(property.id);
      onToast(nowSaved ? "Saved to your rooms" : "Removed from saved");
    } else {
      const nextSaved = !localSaved;
      setLocalSaved(nextSaved);
      onToast(nextSaved ? "Saved to your rooms" : "Removed from saved");
    }
  };

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${property.name} on Stanza Living`,
          text: `Check out ${property.name} in ${property.neighbourhood}, ${property.city}`,
          url,
        });
        return;
      } catch {
        // Fallback to clipboard if share was cancelled or unsupported
      }
    }

    if (navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      onToast("Property link copied to clipboard");
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col md:flex-row md:items-start justify-between gap-6 pb-8 border-b border-roomly-border",
        className
      )}
    >
      {/* Left Details */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center gap-3">
          {property.badge && (
            <span className="px-3 py-1 text-[11px] font-bold tracking-wider rounded-full bg-roomly-lime text-roomly-dark">
              {property.badge}
            </span>
          )}

          <div className="flex items-center gap-1.5 text-xs text-roomly-muted font-medium">
            <MapPin className="w-3.5 h-3.5" />
            <span>
              {property.neighbourhood} · {property.city}
            </span>
          </div>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-roomly-dark leading-[1.08]">
          {property.name}
        </h1>

        {/* Rating & Room type summary */}
        <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-roomly-dark/80 pt-1">
          <div className="flex items-center gap-1 font-bold text-roomly-dark">
            <Star className="w-4 h-4 fill-roomly-dark text-roomly-dark" />
            <span>{property.rating.toFixed(1)}</span>
          </div>

          <span className="text-roomly-muted">
            ({property.reviewCount} verified reviews)
          </span>

          <span className="text-roomly-border">•</span>

          <span className="font-medium text-roomly-dark">
            {property.roomType} room
          </span>

          <span className="text-roomly-border">•</span>

          <span className="text-roomly-muted">{property.furnishing}</span>

          <span className="text-roomly-border">•</span>

          <span className="text-roomly-green font-semibold">
            {property.availability}
          </span>
        </div>
      </div>

      {/* Right Actions: Save + Share */}
      <div className="flex items-center gap-3 self-start md:self-auto">
        {/* Save Button */}
        <motion.button
          type="button"
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2, ease: ROOMLY_EASE }}
          onClick={handleSaveToggle}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold shadow-sm transition-all cursor-pointer",
            isSavedState
              ? "bg-white border-roomly-coral/40 text-roomly-coral shadow"
              : "bg-white border-roomly-border text-roomly-dark hover:border-roomly-dark"
          )}
        >
          <Heart
            className={cn(
              "w-4 h-4 transition-all duration-300",
              isSavedState ? "fill-roomly-coral stroke-roomly-coral" : "stroke-roomly-dark"
            )}
          />
          <span>{isSavedState ? "Saved" : "Save"}</span>
        </motion.button>

        {/* Share Button */}
        <motion.button
          type="button"
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2, ease: ROOMLY_EASE }}
          onClick={handleShare}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-roomly-border hover:border-roomly-dark text-roomly-dark text-xs font-semibold shadow-sm transition-all cursor-pointer"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Share</span>
        </motion.button>
      </div>
    </div>
  );
}
