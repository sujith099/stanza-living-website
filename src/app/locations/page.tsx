"use client";

import React, { useState, useMemo } from "react";
import { PageTransition } from "@/components/ui/PageTransition";
import { RoomlyNav } from "@/components/ui/RoomlyNav";
import { RoomlyFooter } from "@/components/ui/RoomlyFooter";
import { CITIES_DATA, CityData, Neighbourhood } from "@/data/locations";
import { PROPERTIES } from "@/data/properties";
import {
  CityHero,
  CitySelector,
  CityOverview,
  FeaturedCityVisual,
  NeighbourhoodSearch,
  NeighbourhoodFilters,
  NeighbourhoodFilterState,
  NeighbourhoodGrid,
  NeighbourhoodDetailPreview,
  LifestyleDiscovery,
  NeighbourhoodMap,
  NeighbourhoodComparison,
  LocationFeaturedRooms,
  ResidentInsight,
  LocationsCTA,
} from "@/components/locations";

export default function LocationsPage() {
  // 1. Selected City State (default Bengaluru)
  const [selectedCitySlug, setSelectedCitySlug] = useState<string>("bengaluru");

  const currentCity: CityData = useMemo(() => {
    return (
      CITIES_DATA.find((c) => c.slug === selectedCitySlug) || CITIES_DATA[0]
    );
  }, [selectedCitySlug]);

  // 2. Neighbourhood Search & Filter State
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filters, setFilters] = useState<NeighbourhoodFilterState>({
    budget: "all",
    lifestyle: "all",
    nearMetroOnly: false,
  });

  // 3. Selected Neighbourhood for Deep Dive Preview
  const [selectedNeighbourhood, setSelectedNeighbourhood] =
    useState<Neighbourhood | null>(null);

  // Filtered Neighbourhoods
  const filteredNeighbourhoods = useMemo(() => {
    let list = [...currentCity.neighbourhoods];

    // Filter by text search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (n) =>
          n.name.toLowerCase().includes(q) ||
          n.description.toLowerCase().includes(q) ||
          n.lifestyle.some((l) => l.toLowerCase().includes(q))
      );
    }

    // Filter by budget
    if (filters.budget === "under-15k") {
      list = list.filter((n) => n.rentMin <= 15000);
    } else if (filters.budget === "15k-20k") {
      list = list.filter((n) => n.rentMin >= 12000 && n.rentMax <= 22000);
    } else if (filters.budget === "above-20k") {
      list = list.filter((n) => n.rentMax >= 22000);
    }

    // Filter by lifestyle
    if (filters.lifestyle !== "all") {
      list = list.filter((n) =>
        n.lifestyle.some(
          (l) => l.toLowerCase() === filters.lifestyle.toLowerCase()
        )
      );
    }

    // Filter by metro proximity
    if (filters.nearMetroOnly) {
      list = list.filter((n) =>
        n.metroTime.toLowerCase().includes("metro")
      );
    }

    return list;
  }, [currentCity, searchQuery, filters]);

  const handleCityChange = (newSlug: string) => {
    setSelectedCitySlug(newSlug);
    setSearchQuery("");
    setSelectedNeighbourhood(null);
    setFilters({
      budget: "all",
      lifestyle: "all",
      nearMetroOnly: false,
    });
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setFilters({
      budget: "all",
      lifestyle: "all",
      nearMetroOnly: false,
    });
  };

  const scrollToNeighbourhoods = () => {
    const el = document.getElementById("neighbourhoods-section");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <PageTransition className="min-h-screen bg-roomly-bg text-roomly-dark selection:bg-roomly-green selection:text-roomly-cream flex flex-col justify-between">
      {/* 1. Navigation */}
      <RoomlyNav />

      {/* Main Container */}
      <main className="pt-24 sm:pt-32 pb-24 px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto w-full flex-grow flex flex-col gap-16 sm:gap-20">
        {/* 2. Hero Section */}
        <CityHero
          cityName={currentCity.name}
          heroImage={currentCity.image}
          onExploreClick={scrollToNeighbourhoods}
        />

        {/* 3. City Selector & Overview */}
        <section className="flex flex-col gap-8 w-full">
          <CitySelector
            cities={CITIES_DATA}
            selectedCitySlug={selectedCitySlug}
            onSelectCity={handleCityChange}
          />

          <CityOverview city={currentCity} />
        </section>

        {/* 4. Featured Visual Statement Banner */}
        <FeaturedCityVisual city={currentCity} />

        {/* 5. Core Neighbourhood Exploration */}
        <section
          id="neighbourhoods-section"
          className="flex flex-col gap-8 w-full scroll-mt-28"
        >
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-roomly-green" />
              <span className="text-[11px] uppercase tracking-widest font-semibold text-roomly-muted">
                NEIGHBOURHOOD DISCOVERY
              </span>
            </div>
            <h3 className="font-display font-bold text-3xl sm:text-4xl text-roomly-dark">
              Explore {currentCity.name} by neighbourhood.
            </h3>
            <p className="text-xs sm:text-sm text-roomly-muted max-w-xl">
              Tap any neighbourhood card to view rent brackets, key highlights, and transit connectivity.
            </p>
          </div>

          {/* Search & Quick Filters Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-[#FDFCF8] border border-roomly-border shadow-sm">
            <NeighbourhoodSearch
              cityName={currentCity.name}
              query={searchQuery}
              onQueryChange={setSearchQuery}
            />

            <NeighbourhoodFilters
              filters={filters}
              onChange={setFilters}
            />
          </div>

          {/* Expandable Selected Neighbourhood Deep-Dive Preview */}
          <NeighbourhoodDetailPreview
            neighbourhood={selectedNeighbourhood}
            cityName={currentCity.name}
            onClose={() => setSelectedNeighbourhood(null)}
          />

          {/* Responsive Neighbourhood Cards Grid */}
          <NeighbourhoodGrid
            neighbourhoods={filteredNeighbourhoods}
            cityName={currentCity.name}
            selectedNeighbourhoodSlug={selectedNeighbourhood?.slug}
            onSelectNeighbourhood={setSelectedNeighbourhood}
            onResetFilters={handleResetFilters}
          />
        </section>

        {/* 6. Lifestyle Discovery ("Choose your kind of everyday") */}
        <LifestyleDiscovery cityName={currentCity.name} />

        {/* 7. Interactive Neighbourhood Map */}
        <NeighbourhoodMap
          neighbourhoods={currentCity.neighbourhoods}
          cityName={currentCity.name}
        />

        {/* 8. Neighbourhood Comparison Table */}
        <NeighbourhoodComparison
          neighbourhoods={currentCity.neighbourhoods}
          cityName={currentCity.name}
          onSelectNeighbourhood={setSelectedNeighbourhood}
        />

        {/* 9. Featured Rooms in Current City */}
        <LocationFeaturedRooms
          cityName={currentCity.name}
          allProperties={PROPERTIES}
        />

        {/* 10. Resident Reflection Insight */}
        <ResidentInsight cityName={currentCity.name} />

        {/* 11. Final Decision CTA */}
        <LocationsCTA cityName={currentCity.name} />
      </main>

      {/* 12. Reusable Minimal Footer */}
      <RoomlyFooter />
    </PageTransition>
  );
}
