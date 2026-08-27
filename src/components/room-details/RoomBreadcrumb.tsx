"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface RoomBreadcrumbProps {
  city: string;
  neighbourhood: string;
  propertyName: string;
  className?: string;
}

export function RoomBreadcrumb({
  city,
  neighbourhood,
  propertyName,
  className,
}: RoomBreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex items-center gap-1.5 text-xs text-roomly-muted", className)}
    >
      <Link
        href="/rooms"
        className="hover:text-roomly-dark transition-colors font-medium"
      >
        Homes
      </Link>
      <ChevronRight className="w-3 h-3 text-roomly-muted/60" />

      <Link
        href={`/rooms?city=${encodeURIComponent(city)}`}
        className="hover:text-roomly-dark transition-colors font-medium"
      >
        {city}
      </Link>
      <ChevronRight className="w-3 h-3 text-roomly-muted/60" />

      <Link
        href={`/rooms?city=${encodeURIComponent(city)}&neighbourhood=${encodeURIComponent(
          neighbourhood
        )}`}
        className="hover:text-roomly-dark transition-colors font-medium"
      >
        {neighbourhood}
      </Link>
      <ChevronRight className="w-3 h-3 text-roomly-muted/60" />

      <span className="text-roomly-dark font-semibold truncate max-w-[200px] sm:max-w-none">
        {propertyName}
      </span>
    </nav>
  );
}
