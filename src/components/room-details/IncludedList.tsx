"use client";

import React from "react";
import { Check, Plus } from "lucide-react";
import { Property } from "@/data/properties";
import { cn } from "@/lib/utils";

export interface IncludedListProps {
  property: Property;
  className?: string;
}

export function IncludedList({ property, className }: IncludedListProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 gap-6 p-6 sm:p-7 rounded-2xl bg-[#FDFCF8] border border-roomly-border",
        className
      )}
    >
      {/* 1. Included Column */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-roomly-green" />
          <h3 className="font-display font-bold text-xs uppercase tracking-wider text-roomly-dark">
            Included with your stay
          </h3>
        </div>

        <div className="flex flex-col gap-2.5">
          {property.meals && property.meals.included && (
            <div className="flex items-center gap-2.5 text-xs text-roomly-dark">
              <div className="w-4 h-4 rounded-full bg-roomly-green/15 text-roomly-green flex items-center justify-center flex-shrink-0">
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </div>
              <div className="flex flex-col">
                <span className="font-medium">{property.meals.type}</span>
                <span className="text-[11px] text-roomly-muted font-normal">
                  {property.meals.days.join(" · ")}
                </span>
              </div>
            </div>
          )}
          {property.includedServices.map((srv) => (
            <div key={srv} className="flex items-center gap-2.5 text-xs text-roomly-dark">
              <div className="w-4 h-4 rounded-full bg-roomly-green/15 text-roomly-green flex items-center justify-center flex-shrink-0">
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </div>
              <span className="font-medium">{srv}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Optional Column */}
      <div className="flex flex-col gap-4 md:border-l md:border-roomly-border md:pl-6">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-roomly-muted" />
          <h3 className="font-display font-bold text-xs uppercase tracking-wider text-roomly-muted">
            Optional add-ons
          </h3>
        </div>

        <div className="flex flex-col gap-2.5">
          {property.optionalServices.length > 0 ? (
            property.optionalServices.map((opt) => (
              <div
                key={opt.name}
                className="flex items-center justify-between text-xs text-roomly-dark"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-roomly-cream/80 text-roomly-dark flex items-center justify-center flex-shrink-0">
                    <Plus className="w-2.5 h-2.5" />
                  </div>
                  <span className="text-roomly-muted">{opt.name}</span>
                </div>
                <span className="font-semibold text-roomly-dark">{opt.price}</span>
              </div>
            ))
          ) : (
            <span className="text-xs text-roomly-muted">
              All services are all-inclusive at this property.
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
