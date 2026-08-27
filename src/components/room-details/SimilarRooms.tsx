"use client";

import React from "react";
import { Property } from "@/data/properties";
import { PropertyCard } from "@/components/ui/PropertyCard";
import { cn } from "@/lib/utils";

export interface SimilarRoomsProps {
  currentPropertyId: string;
  allProperties: Property[];
  onToast: (msg: string) => void;
  className?: string;
}

export function SimilarRooms({
  currentPropertyId,
  allProperties,
  onToast,
  className,
}: SimilarRoomsProps) {
  const similar = allProperties
    .filter((p) => p.id !== currentPropertyId)
    .slice(0, 3);

  return (
    <section className={cn("flex flex-col gap-6", className)}>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="font-display font-bold text-2xl text-roomly-dark">
            You may also like
          </h2>
          <p className="text-xs sm:text-sm text-roomly-muted">
            Alternative residences with matching design standards and focus
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {similar.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            onSaveToggle={(_, isSaved) =>
              onToast(isSaved ? "Saved to your rooms" : "Removed from saved")
            }
          />
        ))}
      </div>
    </section>
  );
}
