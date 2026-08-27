"use client";

import React, { useState, useMemo } from "react";
import { MapPin, Calendar, Home, IndianRupee } from "lucide-react";
import { RoomlyButton } from "./RoomlyButton";
import { StanzaSelect, StanzaSelectOption } from "@/components/ui/StanzaSelect";
import { cn } from "@/lib/utils";
import { CITIES_LIST, NEIGHBOURHOODS_BY_CITY } from "@/data/properties";

export interface SearchCriteria {
  city: string;
  neighbourhood: string;
  moveIn: string;
  roomType: string;
  budget: string;
}

export interface RoomSearchProps {
  initialValues?: Partial<SearchCriteria>;
  onSearch?: (criteria: SearchCriteria) => void;
  className?: string;
}

export function RoomSearch({
  initialValues,
  onSearch,
  className,
}: RoomSearchProps) {
  const [city, setCity] = useState(initialValues?.city || "Bengaluru");
  const [neighbourhood, setNeighbourhood] = useState(
    initialValues?.neighbourhood || "all"
  );
  const [moveIn, setMoveIn] = useState(initialValues?.moveIn || "all");
  const [roomType, setRoomType] = useState(initialValues?.roomType || "all");
  const [budget, setBudget] = useState(initialValues?.budget || "all");

  const availableNeighbourhoods = NEIGHBOURHOODS_BY_CITY[city] || [];

  const cityOptions = useMemo(() => CITIES_LIST.map((c) => ({
    value: c,
    label: c,
  })), []);

  const neighbourhoodOptions = useMemo(() => [
    { value: "all", label: `All in ${city}` },
    ...availableNeighbourhoods.map((n) => ({ value: n, label: n })),
  ], [city, availableNeighbourhoods]);

  const moveInOptions = useMemo(() => [
    { value: "all", label: "Anytime" },
    { value: "today", label: "Today" },
    { value: "this-week", label: "This week" },
    { value: "this-month", label: "This month" },
  ], []);

  const budgetOptions = useMemo(() => [
    { value: "all", label: "₹8k – ₹35k+" },
    { value: "under-15k", label: "Under ₹15,000" },
    { value: "15k-25k", label: "₹15,000 – ₹25,000" },
    { value: "above-25k", label: "₹25,000+" },
  ], []);

  const roomTypeOptions = useMemo(() => [
    { value: "all", label: "Private / Shared" },
    { value: "Private", label: "Private" },
    { value: "Twin sharing", label: "Twin sharing" },
    { value: "Triple sharing", label: "Triple sharing" },
  ], []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch({
        city,
        neighbourhood,
        moveIn,
        roomType,
        budget,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "w-full bg-white border border-roomly-border/90 shadow-xl rounded-2xl md:rounded-full p-2 flex flex-col md:flex-row items-stretch md:items-center gap-2 md:gap-0",
        className
      )}
    >
      {/* 1. City / Where */}
      <div className="flex-1 px-4 py-2 flex items-center gap-3 border-b md:border-b-0 md:border-r border-roomly-border/60 hover:bg-roomly-bg/30 rounded-xl md:rounded-l-full transition-colors group">
        <MapPin className="w-4 h-4 text-roomly-muted group-hover:text-roomly-dark transition-colors flex-shrink-0" />
        <div className="flex flex-col text-left flex-grow">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-roomly-muted">
            Where (City)
          </span>
          <StanzaSelect
            options={cityOptions}
            value={city}
            onChange={(c) => {
              setCity(c);
              setNeighbourhood("all");
            }}
            triggerClassName="border-0 shadow-none bg-transparent p-0 h-auto font-semibold text-xs sm:text-sm hover:bg-transparent hover:border-0 focus:ring-0"
            contentClassName="min-w-[11rem]"
            searchable
            searchPlaceholder="Search city..."
          />
        </div>
      </div>

      {/* 2. Neighbourhood */}
      <div className="flex-1 px-4 py-2 flex items-center gap-3 border-b md:border-b-0 md:border-r border-roomly-border/60 hover:bg-roomly-bg/30 transition-colors group">
        <div className="flex flex-col text-left flex-grow">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-roomly-muted">
            Neighbourhood
          </span>
          <StanzaSelect
            options={neighbourhoodOptions}
            value={neighbourhood}
            onChange={setNeighbourhood}
            triggerClassName="border-0 shadow-none bg-transparent p-0 h-auto font-medium text-xs sm:text-sm hover:bg-transparent hover:border-0 focus:ring-0"
            contentClassName="min-w-[13rem]"
            searchable
            searchPlaceholder="Search neighbourhood..."
          />
        </div>
      </div>

      {/* 3. Move-in Date */}
      <div className="flex-1 px-4 py-2 flex items-center gap-3 border-b md:border-b-0 md:border-r border-roomly-border/60 hover:bg-roomly-bg/30 transition-colors group">
        <Calendar className="w-4 h-4 text-roomly-muted group-hover:text-roomly-dark transition-colors flex-shrink-0" />
        <div className="flex flex-col text-left flex-grow">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-roomly-muted">
            Move-in
          </span>
          <StanzaSelect
            options={moveInOptions}
            value={moveIn}
            onChange={setMoveIn}
            triggerClassName="border-0 shadow-none bg-transparent p-0 h-auto font-medium text-xs sm:text-sm hover:bg-transparent hover:border-0 focus:ring-0"
            contentClassName="min-w-[11rem]"
          />
        </div>
      </div>

      {/* 4. Budget Range */}
      <div className="flex-1 px-4 py-2 flex items-center gap-3 border-b md:border-b-0 md:border-r border-roomly-border/60 hover:bg-roomly-bg/30 transition-colors group">
        <IndianRupee className="w-4 h-4 text-roomly-muted group-hover:text-roomly-dark transition-colors flex-shrink-0" />
        <div className="flex flex-col text-left flex-grow">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-roomly-muted">
            Budget
          </span>
          <StanzaSelect
            options={budgetOptions}
            value={budget}
            onChange={setBudget}
            triggerClassName="border-0 shadow-none bg-transparent p-0 h-auto font-medium text-xs sm:text-sm hover:bg-transparent hover:border-0 focus:ring-0"
            contentClassName="min-w-[12rem]"
          />
        </div>
      </div>

      {/* 5. Room Type */}
      <div className="flex-1 px-4 py-2 flex items-center gap-3 hover:bg-roomly-bg/30 transition-colors group">
        <Home className="w-4 h-4 text-roomly-muted group-hover:text-roomly-dark transition-colors flex-shrink-0" />
        <div className="flex flex-col text-left flex-grow">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-roomly-muted">
            Room Type
          </span>
          <StanzaSelect
            options={roomTypeOptions}
            value={roomType}
            onChange={setRoomType}
            triggerClassName="border-0 shadow-none bg-transparent p-0 h-auto font-medium text-xs sm:text-sm hover:bg-transparent hover:border-0 focus:ring-0"
            contentClassName="min-w-[12rem]"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="p-1">
        <RoomlyButton
          type="submit"
          variant="primary"
          size="md"
          shape="pill"
          withArrow
          className="w-full md:w-auto px-6 py-2.5 font-semibold text-xs sm:text-sm shadow-md"
        >
          Search
        </RoomlyButton>
      </div>
    </form>
  );
}
