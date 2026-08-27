"use client";

import React from "react";
import Link from "next/link";
import { Star, ArrowUpRight } from "lucide-react";
import {
  RoomlyNav,
  RoomlyFooter,
  RoomlyHero,
  RoomlyButton,
  FadeIn,
  PropertyCard,
  EditorialSteps,
  CityCard,
  LifestyleWayCard,
  LIFESTYLE_WAYS,
  PageTransition,
} from "@/components/ui";
import { PROPERTIES } from "@/data/properties";
import { CITIES } from "@/data/locations";

export default function HomePage() {
  const oakHouse = PROPERTIES.find((p) => p.name === "Oak House") || PROPERTIES[0];
  const juneHouse = PROPERTIES.find((p) => p.name === "June House") || PROPERTIES[1];
  const fernHouse = PROPERTIES.find((p) => p.name === "Fern House") || PROPERTIES[2];

  const scrollToHomes = () => {
    const el = document.querySelector("#homes");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <PageTransition className="min-h-screen bg-roomly-bg text-roomly-dark selection:bg-roomly-green selection:text-roomly-cream">
      {/* 1. Black Floating Navigation */}
      <RoomlyNav />

      <main className="flex flex-col w-full">
        {/* 1. HERO — Full-Screen Cinematic Editorial Hero */}
        <RoomlyHero onCtaClick={scrollToHomes} />

        {/* 2. SECTION 2 — FEATURED HOMES */}
        <section
          id="homes"
          className="py-20 sm:py-28 lg:py-32 px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto w-full"
        >
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
            <FadeIn className="flex flex-col gap-3 max-w-xl">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-roomly-green" />
                <span className="text-[11px] uppercase tracking-widest font-semibold text-roomly-muted">
                  FEATURED HOMES / 01
                </span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-roomly-dark leading-[1.08]">
                Rooms worth seeing.
              </h2>

              <p className="text-sm sm:text-base text-roomly-muted leading-relaxed pt-1">
                Real photos, clear pricing and useful details before you book.
              </p>
            </FadeIn>

            <FadeIn delay={0.1}>
              <Link
                href="/rooms"
                className="group inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-roomly-dark hover:text-roomly-green transition-colors"
              >
                <span>View all</span>
                <span className="w-7 h-7 rounded-full border border-roomly-border flex items-center justify-center bg-white group-hover:bg-roomly-dark group-hover:text-roomly-cream group-hover:border-roomly-dark transition-all duration-300">
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </FadeIn>
          </div>

          {/* Asymmetric Desktop Property Grid: 1 Large + 2 Smaller */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
            {/* 1 Large Featured Property (Oak House) */}
            <FadeIn className="lg:col-span-7 flex">
              <PropertyCard
                property={oakHouse}
                layout="featured"
                priority
                className="w-full flex-grow"
              />
            </FadeIn>

            {/* 2 Smaller Properties (June House & Fern House) */}
            <div className="lg:col-span-5 flex flex-col gap-6 sm:gap-8">
              <FadeIn delay={0.1}>
                <PropertyCard property={juneHouse} />
              </FadeIn>
              <FadeIn delay={0.15}>
                <PropertyCard property={fernHouse} />
              </FadeIn>
            </div>
          </div>
        </section>

        {/* 3. SECTION 3 — FIND YOUR WAY OF LIVING (Dark Section) */}
        <section
          id="lifestyle"
          className="py-20 sm:py-28 lg:py-32 px-5 sm:px-8 lg:px-12 bg-[#111412] text-roomly-cream w-full"
        >
          <div className="max-w-7xl mx-auto flex flex-col gap-12 sm:gap-16">
            {/* Header */}
            <FadeIn className="flex flex-col gap-3 max-w-2xl">
              <span className="text-[11px] uppercase tracking-widest font-semibold text-roomly-lime">
                LIFESTYLE / 02
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.1]">
                Don&apos;t start with a room.
                <br />
                Start with your life.
              </h2>
              <p className="text-sm sm:text-base text-roomly-cream/70 leading-relaxed pt-1">
                Choose what matters to you and discover homes around it.
              </p>
            </FadeIn>

            {/* 4 Lifestyle Option Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {LIFESTYLE_WAYS.map((item, index) => (
                <FadeIn key={item.id} delay={0.08 * index}>
                  <LifestyleWayCard item={item} />
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* 4. SECTION 4 — HOW ROOMLY WORKS */}
        <section
          id="how-it-works"
          className="py-20 sm:py-28 lg:py-32 px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto w-full border-t border-roomly-border/70"
        >
          <FadeIn className="flex flex-col gap-3 max-w-2xl mb-12 sm:mb-16">
            <span className="text-[11px] uppercase tracking-widest font-semibold text-roomly-muted">
              HOW IT WORKS / 03
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-roomly-dark leading-[1.1]">
              Three steps between you and your room.
            </h2>
          </FadeIn>

          <EditorialSteps />
        </section>

        {/* 5. SECTION 5 — LOCATIONS */}
        <section
          id="locations"
          className="py-20 sm:py-28 lg:py-32 px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto w-full border-t border-roomly-border/70"
        >
          <FadeIn className="flex flex-col gap-3 max-w-2xl mb-12 sm:mb-16">
            <span className="text-[11px] uppercase tracking-widest font-semibold text-roomly-muted">
              LOCATIONS / 04
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-roomly-dark leading-[1.1]">
              Start with your city.
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CITIES.map((city, index) => (
              <FadeIn key={city.id} delay={0.08 * index}>
                <Link href={`/rooms?city=${encodeURIComponent(city.name)}`} className="block h-full">
                  <CityCard city={city} />
                </Link>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* 6. SECTION 6 — RESIDENT STORY */}
        <section
          id="residents"
          className="py-20 sm:py-28 lg:py-32 px-5 sm:px-8 lg:px-12 bg-[#F8F6F0] w-full border-y border-roomly-border/70"
        >
          <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-8">
            {/* 5 Stars */}
            <FadeIn className="flex items-center gap-1.5 text-roomly-dark">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-roomly-dark text-roomly-dark"
                />
              ))}
            </FadeIn>

            {/* Minimal Large Quote */}
            <FadeIn delay={0.1}>
              <blockquote className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-roomly-dark leading-snug tracking-tight max-w-3xl">
                &ldquo;I stopped searching through random listings. I could
                actually compare the rooms and choose one that fit my
                routine.&rdquo;
              </blockquote>
            </FadeIn>

            {/* Resident Attributions */}
            <FadeIn delay={0.18} className="flex flex-col gap-1 text-center">
              <span className="font-display font-bold text-base text-roomly-dark tracking-tight">
                Meera, 23
              </span>
              <span className="text-xs sm:text-sm text-roomly-muted">
                Software engineer · Oak House, Bengaluru · Sample resident review
              </span>
            </FadeIn>
          </div>
        </section>

        {/* 7. SECTION 7 — FINAL CTA */}
        <section
          id="about"
          className="py-20 sm:py-28 lg:py-36 px-5 sm:px-8 lg:px-12 bg-[#111412] text-roomly-cream w-full relative"
        >
          <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-8 relative z-10">
            <FadeIn>
              <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12] max-w-3xl">
                Your next room should feel like a decision, not a gamble.
              </h2>
            </FadeIn>

            <FadeIn delay={0.15}>
              <Link href="/rooms">
                <RoomlyButton
                  variant="lime"
                  size="lg"
                  shape="pill"
                  withArrow
                  arrowStyle="circle"
                  className="px-8 py-4 text-sm sm:text-base font-semibold shadow-md"
                >
                  Explore available rooms
                </RoomlyButton>
              </Link>
            </FadeIn>
          </div>
        </section>
      </main>

      {/* 8. Reusable FOOTER */}
      <RoomlyFooter />
    </PageTransition>
  );
}
