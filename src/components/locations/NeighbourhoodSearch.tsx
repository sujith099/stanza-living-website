"use client";

import React from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface NeighbourhoodSearchProps {
  cityName: string;
  query: string;
  onQueryChange: (query: string) => void;
  className?: string;
}

export function NeighbourhoodSearch({
  cityName,
  query,
  onQueryChange,
  className,
}: NeighbourhoodSearchProps) {
  return (
    <div
      className={cn(
        "relative w-full max-w-md bg-white border border-roomly-border rounded-full shadow-sm flex items-center px-4 py-2 focus-within:border-roomly-dark transition-colors",
        className
      )}
    >
      <Search className="w-4 h-4 text-roomly-muted flex-shrink-0 mr-2" />

      <input
        type="text"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder={`Search ${cityName} neighbourhoods (e.g. Indiranagar, HSR)...`}
        className="w-full bg-transparent text-xs sm:text-sm text-roomly-dark placeholder:text-roomly-muted/70 focus:outline-none"
      />

      {query && (
        <button
          type="button"
          onClick={() => onQueryChange("")}
          className="w-5 h-5 rounded-full bg-roomly-bg flex items-center justify-center text-roomly-muted hover:text-roomly-dark"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </div>
  );
}
