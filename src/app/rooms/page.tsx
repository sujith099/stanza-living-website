"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  LayoutGrid,
  List,
  Map as MapIcon,
  SlidersHorizontal,
  ArrowUpDown,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import {
  RoomlyNav,
  RoomlyFooter,
  RoomlyButton,
  RoomSearch,
  PropertyCard,
  PropertyList,
  PropertyMap,
  FilterSidebar,
  FilterSheet,
  FilterState,
  QuickFilterChips,
  PropertySkeleton,
  Toast,
  PageTransition,
  StanzaSelect,
  StanzaSelectOption,
} from "@/components/ui";
import { useSearchParams } from "next/navigation";
import { PROPERTIES } from "@/data/properties";
import { SearchCriteria } from "@/components/ui/RoomSearch";
import { ROOMLY_EASE } from "@/lib/animations";

const SORT_OPTIONS: StanzaSelectOption[] = [
  { value: "recommended", label: "Recommended" },
  { value: "lowest-price", label: "Lowest price" },
  { value: "highest-price", label: "Highest price" },
  { value: "highest-rated", label: "Highest rated" },
  { value: "newest", label: "Newest additions" },
];

function FindARoomContent() {
  const urlParams = useSearchParams();
  const urlCity = urlParams?.get("city");
  const urlNeighbourhood = urlParams?.get("neighbourhood") || urlParams?.get("location");
  const urlLifestyle = urlParams?.get("lifestyle");
  const urlBudget = urlParams?.get("budget");
  const urlRoomType = urlParams?.get("roomType");
  const urlMaxPrice = urlParams?.get("maxPrice");
  const urlSort = urlParams?.get("sort") || "recommended";

  // 1. Search Criteria State
  const [searchParams, setSearchParams] = useState<SearchCriteria>({
    city: urlCity || "Bengaluru",
    neighbourhood: urlNeighbourhood || "all",
    moveIn: "all",
    roomType: urlRoomType || "all",
    budget: "all",
  });

  // 2. Filter State (initialized with URL params)
  const initialFilters: FilterState = {
    minPrice: 8000,
    maxPrice:
      urlBudget === "under-15k"
        ? 15000
        : urlMaxPrice
        ? parseInt(urlMaxPrice, 10) || 35000
        : 35000,
    roomTypes: urlRoomType ? [urlRoomType] : [],
    furnishings: [],
    amenities: [],
    locations: urlNeighbourhood ? [urlNeighbourhood] : [],
    lifestyles: urlLifestyle ? [urlLifestyle] : [],
    availability: [],
  };
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  // 3. Quick Chips State
  const [activeChips, setActiveChips] = useState<string[]>([]);

  // 4. View Mode & Sorting State
  const [viewMode, setViewMode] = useState<"grid" | "list" | "map">("grid");
  const [sortBy, setSortBy] = useState<string>(urlSort);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // 5. Pagination / Load More State
  const [displayCount, setDisplayCount] = useState(6);
  const [isLoading, setIsLoading] = useState(false);

  // Handle Quick Chips Toggle
  const handleToggleChip = (chipId: string) => {
    setActiveChips((prev) => {
      const isAlreadyActive = prev.includes(chipId);
      const updated = isAlreadyActive
        ? prev.filter((x) => x !== chipId)
        : [...prev, chipId];

      // Sync chip with sidebar filters
      if (chipId === "private") {
        setFilters((f) => ({
          ...f,
          roomTypes: isAlreadyActive
            ? f.roomTypes.filter((t) => t !== "Private")
            : [...f.roomTypes, "Private"],
        }));
      } else if (chipId === "under-20k") {
        setFilters((f) => ({
          ...f,
          maxPrice: isAlreadyActive ? 35000 : 20000,
        }));
      } else if (chipId === "near-metro") {
        setFilters((f) => ({
          ...f,
          locations: isAlreadyActive
            ? f.locations.filter((l) => l !== "nearMetro")
            : [...f.locations, "nearMetro"],
        }));
      } else if (chipId === "available-now") {
        setFilters((f) => ({
          ...f,
          availability: isAlreadyActive
            ? f.availability.filter((a) => a !== "now")
            : [...f.availability, "now"],
        }));
      } else if (chipId === "furnished") {
        setFilters((f) => ({
          ...f,
          furnishings: isAlreadyActive
            ? f.furnishings.filter((x) => x !== "Fully furnished")
            : [...f.furnishings, "Fully furnished"],
        }));
      }

      return updated;
    });
  };

  // Count active filters
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.maxPrice < 35000) count++;
    count += filters.roomTypes.length;
    count += filters.furnishings.length;
    count += filters.amenities.length;
    count += filters.locations.length;
    count += filters.lifestyles.length;
    count += filters.availability.length;
    return count;
  }, [filters]);

  const handleResetFilters = () => {
    setFilters(initialFilters);
    setActiveChips([]);
    setSearchParams((prev) => ({
      ...prev,
      neighbourhood: "all",
      roomType: "all",
      budget: "all",
    }));
  };

  // Handle Search submit
  const handleSearchSubmit = (criteria: SearchCriteria) => {
    setIsLoading(true);
    setSearchParams(criteria);
    setTimeout(() => {
      setIsLoading(false);
    }, 250);
  };

  // Filter & Sort properties
  const filteredAndSortedProperties = useMemo(() => {
    let list = [...PROPERTIES];

    // Filter by City
    if (searchParams.city && searchParams.city !== "all") {
      list = list.filter(
        (p) => p.city.toLowerCase() === searchParams.city.toLowerCase()
      );
    }

    // Filter by Neighbourhood
    if (searchParams.neighbourhood && searchParams.neighbourhood !== "all") {
      list = list.filter((p) =>
        p.neighbourhood
          .toLowerCase()
          .includes(searchParams.neighbourhood.toLowerCase())
      );
    }

    // Filter by Room Type
    if (searchParams.roomType && searchParams.roomType !== "all") {
      list = list.filter((p) => p.roomType === searchParams.roomType);
    }
    if (filters.roomTypes.length > 0) {
      list = list.filter((p) => filters.roomTypes.includes(p.roomType));
    }

    // Filter by Price / Budget
    if (searchParams.budget !== "all") {
      if (searchParams.budget === "under-15k") list = list.filter((p) => p.rent <= 15000);
      else if (searchParams.budget === "15k-25k")
        list = list.filter((p) => p.rent > 15000 && p.rent <= 25000);
      else if (searchParams.budget === "above-25k")
        list = list.filter((p) => p.rent > 25000);
    }
    list = list.filter((p) => p.rent <= filters.maxPrice);

    // Filter by Furnishing
    if (filters.furnishings.length > 0) {
      list = list.filter((p) => filters.furnishings.includes(p.furnishing));
    }

    // Filter by Amenities
    if (filters.amenities.length > 0) {
      list = list.filter((p) =>
        filters.amenities.every((a) => p.amenities.includes(a))
      );
    }

    // Filter by Location Proximity
    if (filters.locations.includes("nearMetro")) {
      list = list.filter((p) => p.nearMetro);
    }
    if (filters.locations.includes("nearOffice")) {
      list = list.filter((p) => p.nearOffice);
    }
    if (filters.locations.includes("nearCollege")) {
      list = list.filter((p) => p.nearCollege);
    }

    // Filter by Lifestyle
    if (filters.lifestyles.length > 0) {
      list = list.filter((p) => filters.lifestyles.includes(p.lifestyle));
    }

    // Filter by Availability
    if (filters.availability.includes("now")) {
      list = list.filter((p) => p.isAvailableNow);
    }
    if (filters.availability.includes("this-month")) {
      list = list.filter((p) => p.availableMonth === "this-month");
    }

    // Sorting
    if (sortBy === "lowest-price") {
      list.sort((a, b) => a.rent - b.rent);
    } else if (sortBy === "highest-price") {
      list.sort((a, b) => b.rent - a.rent);
    } else if (sortBy === "highest-rated") {
      list.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "newest") {
      list.sort((a, b) => (b.badge === "NEW" ? 1 : 0) - (a.badge === "NEW" ? 1 : 0));
    }

    return list;
  }, [searchParams, filters, sortBy]);

  // Toast confirmation trigger
  const handleSaveToggle = (id: string, isSaved: boolean) => {
    setToastMessage(isSaved ? "Saved to your rooms" : "Removed from saved");
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const visibleProperties = filteredAndSortedProperties.slice(0, displayCount);
  const hasMore = displayCount < filteredAndSortedProperties.length;

  const handleLoadMore = () => {
    setDisplayCount((c) => Math.min(c + 6, filteredAndSortedProperties.length));
  };

  return (
    <PageTransition className="min-h-screen bg-roomly-bg text-roomly-dark selection:bg-roomly-green selection:text-roomly-cream flex flex-col justify-between">
      {/* 1. Global Navigation */}
      <RoomlyNav />

      {/* Floating Toast Notification */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

      <main className="pt-28 sm:pt-36 pb-20 px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto w-full flex-grow">
        {/* 2. Compact Editorial Page Intro */}
        <div className="flex flex-col gap-3 max-w-2xl mb-8 sm:mb-10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-roomly-green" />
            <span className="text-[11px] uppercase tracking-widest font-semibold text-roomly-muted">
              FIND A ROOM / 02
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-roomly-dark leading-[1.08]">
            Find somewhere
            <br />
            that fits.
          </h1>

          <p className="text-sm sm:text-base text-roomly-muted leading-relaxed pt-1">
            Search rooms by neighbourhood, budget and the details that matter to
            your everyday.
          </p>
        </div>

        {/* 3. Main Search Bar */}
        <div className="mb-6">
          <RoomSearch
            initialValues={searchParams}
            onSearch={handleSearchSubmit}
          />
        </div>

        {/* 4. Quick Filter Chips */}
        <div className="mb-8">
          <QuickFilterChips
            activeChips={activeChips}
            onToggleChip={handleToggleChip}
          />
        </div>

        {/* 5. Results Header & Controls Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-roomly-border mb-8">
          {/* Left: Dynamic Results Count & Filter Button on mobile */}
          <div className="flex items-center gap-3">
            <div className="flex items-baseline gap-2">
              <motion.span
                key={filteredAndSortedProperties.length}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, ease: ROOMLY_EASE }}
                className="font-display font-bold text-xl sm:text-2xl text-roomly-dark"
              >
                {filteredAndSortedProperties.length}{" "}
                {filteredAndSortedProperties.length === 1 ? "room" : "rooms"}
              </motion.span>
              <span className="text-xs sm:text-sm text-roomly-muted font-medium">
                in {searchParams.city}
                {searchParams.neighbourhood !== "all"
                  ? ` · ${searchParams.neighbourhood}`
                  : ""}
              </span>
            </div>

            {/* Mobile Filter Button */}
            <button
              type="button"
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-roomly-border bg-white text-xs font-semibold text-roomly-dark hover:border-roomly-dark shadow-xs cursor-pointer ml-1"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-roomly-green" />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-roomly-green text-white text-[10px] flex items-center justify-center font-bold">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>

          {/* Right: View Controls & Sort Dropdown */}
          <div className="flex items-center gap-3 justify-between sm:justify-end">
            {/* View Mode Toggle: Grid / List / Map */}
            <div className="flex items-center bg-white border border-roomly-border p-1 rounded-full shadow-xs">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-roomly-dark text-roomly-cream shadow"
                    : "text-roomly-muted hover:text-roomly-dark"
                }`}
                aria-label="Grid view"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Grid</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode("list")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  viewMode === "list"
                    ? "bg-roomly-dark text-roomly-cream shadow"
                    : "text-roomly-muted hover:text-roomly-dark"
                }`}
                aria-label="List view"
              >
                <List className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">List</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode("map")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  viewMode === "map"
                    ? "bg-roomly-dark text-roomly-cream shadow"
                    : "text-roomly-muted hover:text-roomly-dark"
                }`}
                aria-label="Map view"
              >
                <MapIcon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Map</span>
              </button>
            </div>

            {/* Custom StanzaSelect Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-roomly-muted hidden md:inline font-medium">Sort by</span>
              <StanzaSelect
                options={SORT_OPTIONS}
                value={sortBy}
                onChange={(val) => {
                  setSortBy(val);
                  const url = new URL(window.location.href);
                  if (val === "recommended") {
                    url.searchParams.delete("sort");
                  } else {
                    url.searchParams.set("sort", val);
                  }
                  window.history.replaceState({}, "", url.toString());
                }}
                shape="pill"
                size="sm"
                align="end"
                triggerClassName="w-40 sm:w-44 font-semibold shadow-xs"
              />
            </div>
          </div>
        </div>

        {/* 6. Main Grid: Filter Sidebar + Properties Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Filter Sidebar (~260px) */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-28">
              <FilterSidebar
                filters={filters}
                onChange={setFilters}
                onReset={handleResetFilters}
                activeFilterCount={activeFilterCount}
              />
            </div>
          </div>

          {/* Results Area (Cols 9 on Desktop, 12 on Mobile) */}
          <div className="lg:col-span-9 flex flex-col gap-8">
            {/* Loading Skeleton */}
            {isLoading ? (
              <div
                className={
                  viewMode === "list"
                    ? "flex flex-col gap-6"
                    : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                }
              >
                {Array.from({ length: 6 }).map((_, i) => (
                  <PropertySkeleton key={i} viewMode={viewMode === "list" ? "list" : "grid"} />
                ))}
              </div>
            ) : filteredAndSortedProperties.length === 0 ? (
              /* 7. Beautiful Empty State with Actionable Recovery */
              <div className="text-center py-16 px-6 border border-dashed border-roomly-border rounded-3xl bg-[#FDFCF9] flex flex-col items-center gap-4 select-none">
                <div className="w-12 h-12 rounded-full bg-roomly-cream/80 flex items-center justify-center text-roomly-dark mb-1">
                  <Sparkles className="w-6 h-6 text-roomly-green" />
                </div>
                <h3 className="font-display font-bold text-2xl text-roomly-dark">
                  No rooms match those filters.
                </h3>
                <p className="text-sm text-roomly-muted max-w-md leading-relaxed">
                  Try widening your budget, selecting another neighbourhood, or picking one of these quick suggestions:
                </p>

                {/* Quick Recovery Suggestion Chips */}
                <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSearchParams((prev) => ({ ...prev, neighbourhood: "HSR Layout" }));
                      setFilters((prev) => ({ ...prev, locations: ["HSR Layout"] }));
                    }}
                    className="px-3.5 py-1.5 rounded-full border border-roomly-border bg-white text-xs font-semibold text-roomly-dark hover:border-roomly-dark transition-colors cursor-pointer"
                  >
                    Try HSR Layout →
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setFilters((prev) => ({ ...prev, maxPrice: 35000 }));
                    }}
                    className="px-3.5 py-1.5 rounded-full border border-roomly-border bg-white text-xs font-semibold text-roomly-dark hover:border-roomly-dark transition-colors cursor-pointer"
                  >
                    Increase budget ceiling →
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSearchParams((prev) => ({ ...prev, city: "Bengaluru", neighbourhood: "all" }));
                      setFilters((prev) => ({ ...prev, locations: [] }));
                    }}
                    className="px-3.5 py-1.5 rounded-full border border-roomly-border bg-white text-xs font-semibold text-roomly-dark hover:border-roomly-dark transition-colors cursor-pointer"
                  >
                    View all Bengaluru rooms →
                  </button>
                </div>

                <div className="pt-2">
                  <RoomlyButton
                    variant="primary"
                    size="sm"
                    shape="pill"
                    onClick={handleResetFilters}
                    className="px-6 py-2.5 text-xs font-semibold"
                  >
                    Reset all filters
                  </RoomlyButton>
                </div>
              </div>
            ) : viewMode === "map" ? (
              /* 8. Map View Mode */
              <PropertyMap
                properties={filteredAndSortedProperties}
                selectedCity={searchParams.city}
              />
            ) : viewMode === "list" ? (
              /* 9. List View Mode */
              <PropertyList
                properties={visibleProperties}
                onSaveToggle={handleSaveToggle}
              />
            ) : (
              /* 10. Default Grid View Mode */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
                {visibleProperties.map((property, idx) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    onSaveToggle={handleSaveToggle}
                    priority={idx < 3}
                  />
                ))}
              </div>
            )}

            {/* 11. Load More Button */}
            {hasMore && viewMode !== "map" && !isLoading && (
              <div className="pt-8 flex justify-center border-t border-roomly-border/70">
                <RoomlyButton
                  variant="outline"
                  size="md"
                  shape="pill"
                  withArrow
                  onClick={handleLoadMore}
                  className="px-8 py-3 bg-white hover:bg-roomly-dark hover:text-roomly-cream shadow-sm"
                >
                  Load more rooms ({filteredAndSortedProperties.length - displayCount} remaining)
                </RoomlyButton>
              </div>
            )}
          </div>
        </div>

        {/* 12. Editorial CTA: Connects to Locations */}
        <section className="mt-20 sm:mt-28 p-8 sm:p-12 lg:p-16 rounded-3xl bg-roomly-dark text-roomly-cream relative overflow-hidden shadow-xl border border-white/10">
          <div className="absolute top-0 right-0 w-80 h-80 bg-roomly-green/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-xl flex flex-col gap-4">
            <span className="text-[11px] uppercase tracking-widest font-semibold text-roomly-lime">
              Neighbourhood Curation
            </span>
            <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
              Still not sure where to live?
            </h2>
            <p className="text-xs sm:text-sm text-roomly-cream/70 leading-relaxed">
              Explore neighbourhoods based on your everyday rhythm, commute, and
              proximity to coffee and quiet.
            </p>
            <div className="pt-2">
              <Link href="/#locations">
                <RoomlyButton
                  variant="lime"
                  size="md"
                  shape="pill"
                  withArrow
                  arrowStyle="circle"
                >
                  Explore locations
                </RoomlyButton>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* 13. Mobile Sticky Filter Bar: [ Filter ] [ Sort ] [ Map ] */}
      <div className="lg:hidden fixed bottom-5 inset-x-4 z-40 flex justify-center pointer-events-none">
        <div className="bg-roomly-dark text-roomly-cream p-1.5 rounded-full shadow-2xl border border-white/15 flex items-center gap-1 pointer-events-auto backdrop-blur-md">
          <button
            type="button"
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold hover:bg-white/10 transition-colors"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-roomly-lime" />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-roomly-lime text-roomly-dark text-[10px] font-bold flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          <div className="w-px h-4 bg-white/20" />

          <button
            type="button"
            onClick={() => {
              const sortSequence = [
                "recommended",
                "lowest-price",
                "highest-price",
                "highest-rated",
              ];
              const nextIdx =
                (sortSequence.indexOf(sortBy) + 1) % sortSequence.length;
              setSortBy(sortSequence[nextIdx]);
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold hover:bg-white/10 transition-colors"
          >
            <ArrowUpDown className="w-3.5 h-3.5 text-roomly-cream/70" />
            <span className="capitalize">{sortBy.replace("-", " ")}</span>
          </button>

          <div className="w-px h-4 bg-white/20" />

          <button
            type="button"
            onClick={() =>
              setViewMode((mode) => (mode === "map" ? "grid" : "map"))
            }
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-colors ${
              viewMode === "map"
                ? "bg-roomly-lime text-roomly-dark"
                : "hover:bg-white/10"
            }`}
          >
            <MapIcon className="w-3.5 h-3.5" />
            <span>{viewMode === "map" ? "Cards" : "Map"}</span>
          </button>
        </div>
      </div>

      {/* Mobile Filter Bottom Sheet */}
      <FilterSheet
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        filters={filters}
        onChange={setFilters}
        onReset={handleResetFilters}
        activeFilterCount={activeFilterCount}
        totalResultCount={filteredAndSortedProperties.length}
      />

      {/* Reusable Roomly Footer */}
      <RoomlyFooter />
    </PageTransition>
  );
}

export default function FindARoomPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-roomly-bg" />}>
      <FindARoomContent />
    </React.Suspense>
  );
}
