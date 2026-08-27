"use client";

import React from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { OnboardingPreferences } from "@/data/auth";
import { PROPERTIES } from "@/data/properties";
import { PropertyCard } from "@/components/ui/PropertyCard";
import { RoomlyButton } from "@/components/ui/RoomlyButton";
import { FadeIn } from "@/components/ui/FadeIn";
import { cn } from "@/lib/utils";

export interface RecommendationPreviewProps {
  preferences: OnboardingPreferences;
  className?: string;
}

export function RecommendationPreview({
  preferences,
  className,
}: RecommendationPreviewProps) {
  // Top 3 properties for recommendation
  const recommendedRooms = PROPERTIES.slice(0, 3);
  const matchPercentages = ["94% match", "91% match", "89% match"];

  return (
    <div className={cn("flex flex-col gap-10 w-full select-none", className)}>
      <FadeIn>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-roomly-green" />
            <span className="text-[11px] uppercase tracking-widest font-bold text-roomly-muted">
              ONBOARDING COMPLETE
            </span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl text-roomly-dark tracking-tight leading-tight">
            Good to know.
            <br />
            We found rooms that fit your preferences.
          </h2>

          <p className="text-xs sm:text-sm text-roomly-muted max-w-xl">
            Based on your living routine in {preferences.city}, target rent, and acoustic priorities.
          </p>

          {/* Preferences summary badges */}
          <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
            <span className="px-3 py-1 rounded-full bg-roomly-dark text-roomly-lime font-bold">
              {preferences.city}
            </span>
            <span className="px-3 py-1 rounded-full bg-white border border-roomly-border text-roomly-dark font-medium">
              ₹{preferences.budgetMin.toLocaleString("en-IN")} – ₹{preferences.budgetMax.toLocaleString("en-IN")} / mo
            </span>
            <span className="px-3 py-1 rounded-full bg-white border border-roomly-border text-roomly-dark font-medium">
              {preferences.roomType} Room
            </span>
            {preferences.lifestyle.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-roomly-green/10 text-roomly-green font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Recommended Rooms Grid */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-[11px] uppercase font-bold text-roomly-muted tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-roomly-green" />
            <span>Prototype recommendations</span>
          </span>

          <span className="text-xs font-semibold text-roomly-green hidden sm:inline">
            3 verified homes ready for September move-in
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendedRooms.map((property, idx) => (
            <div key={property.id} className="relative flex flex-col gap-2">
              <div className="absolute top-3 right-3 z-30 px-3 py-1 rounded-full bg-roomly-lime text-roomly-dark text-[11px] font-bold shadow-md">
                {matchPercentages[idx]}
              </div>
              <PropertyCard property={property} priority={idx === 0} />
            </div>
          ))}
        </div>
      </div>

      {/* Explore All CTA */}
      <FadeIn delay={0.2} className="flex justify-center pt-4">
        <Link href={`/rooms?city=${encodeURIComponent(preferences.city)}`}>
          <RoomlyButton
            variant="lime"
            size="lg"
            shape="pill"
            withArrow
            arrowStyle="circle"
            className="text-xs sm:text-sm font-semibold shadow-xl px-8 py-4"
          >
            Explore all {preferences.city} rooms
          </RoomlyButton>
        </Link>
      </FadeIn>
    </div>
  );
}
