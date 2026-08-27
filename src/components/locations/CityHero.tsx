"use client";

import React from "react";

import { WordsPullUp } from "@/components/ui/WordsPullUp";
import { RoomlyButton } from "@/components/ui/RoomlyButton";
import { FadeIn } from "@/components/ui/FadeIn";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { cn } from "@/lib/utils";

export interface CityHeroProps {
  cityName: string;
  heroImage: string;
  onExploreClick: () => void;
  className?: string;
}

export function CityHero({
  cityName,
  heroImage,
  onExploreClick,
  className,
}: CityHeroProps) {
  return (
    <section
      className={cn(
        "relative w-full flex flex-col gap-10 pt-6 sm:pt-10",
        className
      )}
    >
      {/* Editorial Headline & Supporting Copy */}
      <div className="flex flex-col gap-4 max-w-3xl">
        <FadeIn delay={0.05}>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-roomly-green" />
            <span className="text-[11px] uppercase tracking-widest font-semibold text-roomly-muted">
              LOCATIONS / 04
            </span>
          </div>
        </FadeIn>

        <WordsPullUp
          text="Find the neighbourhood that feels right."
          className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-roomly-dark leading-[1.08]"
        />

        <FadeIn delay={0.2}>
          <p className="text-sm sm:text-base text-roomly-muted leading-relaxed max-w-2xl pt-1">
            Where you live changes how your everyday feels. Explore cities and
            neighbourhoods before you choose your room.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="pt-2">
            <RoomlyButton
              variant="primary"
              size="md"
              shape="pill"
              withArrow
              arrowStyle="circle"
              onClick={onExploreClick}
              className="text-xs sm:text-sm font-semibold shadow-md"
            >
              Explore {cityName}
            </RoomlyButton>
          </div>
        </FadeIn>
      </div>

      {/* Cinematic Hero Photograph */}
      <FadeIn delay={0.25} className="w-full">
        <ImageReveal
          src={heroImage}
          alt={`${cityName} cityscape and neighbourhood canopy`}
          aspectRatio="wide"
          priority
          overlay
          className="rounded-3xl overflow-hidden shadow-2xl border border-roomly-border/80"
        >
          <div className="absolute bottom-4 sm:bottom-6 left-6 sm:left-8 text-white z-10">
            <span className="text-[11px] uppercase tracking-widest text-roomly-lime font-bold">
              Featured City
            </span>
            <div className="font-display font-bold text-2xl sm:text-3xl text-white">
              {cityName}
            </div>
          </div>
        </ImageReveal>
      </FadeIn>
    </section>
  );
}
