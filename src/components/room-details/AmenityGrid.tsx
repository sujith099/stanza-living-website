"use client";

import React from "react";
import {
  Wifi,
  Wind,
  Sparkles,
  Shirt,
  Zap,
  Shield,
  Car,
  Utensils,
  Laptop,
  Droplet,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface AmenityGridProps {
  amenities: string[];
  className?: string;
}

const AMENITY_ICON_MAP: Record<string, React.ReactNode> = {
  "Wi-Fi": <Wifi className="w-4 h-4" />,
  "Air conditioning": <Wind className="w-4 h-4" />,
  Housekeeping: <Sparkles className="w-4 h-4" />,
  Laundry: <Shirt className="w-4 h-4" />,
  "Power backup": <Zap className="w-4 h-4" />,
  CCTV: <Shield className="w-4 h-4" />,
  Parking: <Car className="w-4 h-4" />,
  "Common kitchen": <Utensils className="w-4 h-4" />,
  Workspace: <Laptop className="w-4 h-4" />,
  "Drinking water": <Droplet className="w-4 h-4" />,
};

export function AmenityGrid({ amenities, className }: AmenityGridProps) {
  return (
    <section className={cn("flex flex-col gap-5", className)}>
      <div className="flex flex-col gap-1">
        <h2 className="font-display font-bold text-2xl text-roomly-dark">
          Everything included
        </h2>
        <p className="text-xs sm:text-sm text-roomly-muted">
          Services and infrastructure maintained to hospitality standards
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {amenities.map((amenity) => {
          const icon = AMENITY_ICON_MAP[amenity] || <Sparkles className="w-4 h-4" />;

          return (
            <div
              key={amenity}
              className="group p-4 rounded-2xl bg-[#FDFCF8] border border-roomly-border hover:border-roomly-dark/40 hover:bg-white transition-all duration-300 flex flex-col gap-2.5 cursor-default select-none shadow-sm"
            >
              <div className="w-8 h-8 rounded-xl bg-roomly-cream/50 group-hover:bg-roomly-dark group-hover:text-roomly-cream flex items-center justify-center text-roomly-dark transition-colors duration-300">
                <span className="transition-transform duration-300 group-hover:scale-110">
                  {icon}
                </span>
              </div>

              <span className="text-xs font-semibold text-roomly-dark group-hover:text-roomly-green transition-colors leading-tight">
                {amenity}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
