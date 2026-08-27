"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { RoomlyButton } from "./RoomlyButton";
import { ROOMLY_EASE } from "@/lib/animations";

export interface RoomlyHeroProps {
  onCtaClick?: () => void;
}

export function RoomlyHero({ onCtaClick }: RoomlyHeroProps) {
  const word1 = ["S", "T", "A", "N", "Z", "A"];
  const word2 = ["L", "I", "V", "I", "N", "G"];

  const handleCta = () => {
    if (onCtaClick) {
      onCtaClick();
    } else {
      const homesEl = document.querySelector("#homes");
      homesEl?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full h-[100svh] min-h-[660px] max-h-[1100px] overflow-hidden bg-roomly-dark flex flex-col justify-end">
      {/* 1. Cinematic Background Image */}
      <motion.div
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: ROOMLY_EASE }}
        className="absolute inset-0 z-0 select-none"
      >
        <Image
          src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2200&auto=format&fit=crop"
          alt="Stanza Living Cinematic Residence"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-[0.88] contrast-[1.05]"
        />

        {/* 2. Subtle Dark Vignette / Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: ROOMLY_EASE }}
          className="absolute inset-0 bg-gradient-to-t from-[#111412] via-[#111412]/50 to-[#111412]/35"
        />

        {/* Film grain / noise overlay */}
        <div
          className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </motion.div>

      {/* Hero Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pb-8 sm:pb-12 lg:pb-14 flex flex-col justify-end gap-6 sm:gap-8">
        {/* Main Grid: Lower Left (STANZA LIVING*) and Lower Right (Description + CTA) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 items-end gap-6 sm:gap-8 lg:gap-12">
          {/* Lower-left: Huge Oversized Typography Wordmark */}
          <div className="lg:col-span-7 flex flex-col items-start justify-end">
            <h1 className="font-display font-extrabold text-[12vw] sm:text-[10vw] lg:text-[7vw] tracking-tighter leading-[0.88] text-roomly-cream select-none flex flex-col items-start overflow-hidden">
              <span className="inline-flex overflow-hidden">
                {word1.map((char, index) => (
                  <motion.span
                    key={`w1-${index}`}
                    initial={{ y: "110%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.35 + index * 0.04,
                      ease: ROOMLY_EASE,
                    }}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
              <span className="inline-flex items-baseline overflow-hidden">
                {word2.map((char, index) => (
                  <motion.span
                    key={`w2-${index}`}
                    initial={{ y: "110%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.55 + index * 0.04,
                      ease: ROOMLY_EASE,
                    }}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
                <motion.span
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.85,
                    ease: ROOMLY_EASE,
                  }}
                  className="text-roomly-lime font-light text-[8vw] sm:text-[7vw] lg:text-[4.5vw] ml-1 select-none"
                >
                  *
                </motion.span>
              </span>
            </h1>
          </div>

          {/* Lower-right: Description + CTA */}
          <div className="lg:col-span-5 flex flex-col items-start lg:items-end justify-end gap-5 pb-1">
            {/* Description Copy */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65, ease: ROOMLY_EASE }}
              className="text-xs sm:text-sm lg:text-[13.5px] text-roomly-cream/90 font-normal leading-[1.3] max-w-[360px] lg:max-w-[380px] lg:text-left tracking-normal"
            >
              Find furnished rooms, compare neighbourhoods and move with more confidence — clear pricing, verified photos and zero broker hassle.
            </motion.p>

            {/* CTA Buttons: Primary Find a room + Secondary Explore locations */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8, ease: ROOMLY_EASE }}
              className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto"
            >
              <Link href="/rooms" className="w-full sm:w-auto">
                <RoomlyButton
                  variant="cream"
                  size="md"
                  shape="pill"
                  withArrow
                  arrowStyle="circle"
                  onClick={onCtaClick ? handleCta : undefined}
                  className="w-full sm:w-auto px-6 py-3 font-semibold text-xs sm:text-sm shadow-md"
                >
                  Find a room
                </RoomlyButton>
              </Link>

              <Link href="/locations" className="w-full sm:w-auto">
                <button
                  type="button"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-white/20 text-roomly-cream/90 hover:bg-white/10 hover:text-white text-xs font-semibold transition-colors cursor-pointer text-center"
                >
                  Explore locations →
                </button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* 6. Hero Micro Information: Small secondary bottom line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.95, ease: ROOMLY_EASE }}
          className="pt-4 sm:pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-[11px] sm:text-xs text-roomly-cream/60 tracking-wide font-normal"
        >
          <div className="flex items-center gap-6 sm:gap-8">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-roomly-lime" />
              Verified homes
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-roomly-lime" />
              Clear pricing
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-roomly-lime" />
              Easy move-in
            </span>
          </div>

          <span className="text-[10px] uppercase tracking-widest text-roomly-cream/40 hidden sm:inline">
            Bengaluru · Hyderabad · Pune · Delhi NCR
          </span>
        </motion.div>
      </div>
    </section>
  );
}

export const StanzaHero = RoomlyHero;
export type StanzaHeroProps = RoomlyHeroProps;
