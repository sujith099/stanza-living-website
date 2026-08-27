"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Train } from "lucide-react";
import { Neighbourhood } from "@/data/locations";
import { cn } from "@/lib/utils";

export interface NeighbourhoodComparisonProps {
  neighbourhoods: Neighbourhood[];
  cityName: string;
  onSelectNeighbourhood: (n: Neighbourhood) => void;
  className?: string;
}

export function NeighbourhoodComparison({
  neighbourhoods,
  cityName,
  onSelectNeighbourhood,
  className,
}: NeighbourhoodComparisonProps) {
  return (
    <section className={cn("flex flex-col gap-6 w-full", className)}>
      <div className="flex flex-col gap-1">
        <h3 className="font-display font-bold text-2xl sm:text-3xl text-roomly-dark">
          Not sure where to start?
        </h3>
        <p className="text-xs sm:text-sm text-roomly-muted">
          Compare key neighbourhoods across rent, metro proximity, and lifestyle character in {cityName}
        </p>
      </div>

      {/* Editorial Table Container */}
      <div className="w-full overflow-x-auto rounded-2xl border border-roomly-border bg-[#FDFCF8] shadow-sm select-none">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-roomly-border bg-roomly-bg/80 text-[11px] font-bold text-roomly-muted uppercase tracking-wider">
              <th className="py-3.5 px-5">Neighbourhood</th>
              <th className="py-3.5 px-4">Typical Rent</th>
              <th className="py-3.5 px-4">Metro Proximity</th>
              <th className="py-3.5 px-4">Lifestyle Vibe</th>
              <th className="py-3.5 px-4 text-right">Available</th>
              <th className="py-3.5 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-roomly-border/60">
            {neighbourhoods.map((n) => (
              <tr
                key={n.slug}
                onClick={() => onSelectNeighbourhood(n)}
                className="group hover:bg-roomly-cream/40 transition-colors cursor-pointer"
              >
                {/* Name */}
                <td className="py-4 px-5 font-bold text-sm text-roomly-dark group-hover:text-roomly-green transition-colors">
                  {n.name}
                </td>

                {/* Typical Rent */}
                <td className="py-4 px-4 font-semibold text-roomly-dark">
                  {n.rentRange}
                </td>

                {/* Metro */}
                <td className="py-4 px-4 text-roomly-dark font-medium">
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-roomly-bg border border-roomly-border text-[11px]">
                    <Train className="w-3 h-3 text-roomly-green" />
                    <span>{n.metroTime}</span>
                  </div>
                </td>

                {/* Lifestyle */}
                <td className="py-4 px-4 text-roomly-muted">
                  {n.lifestyle.slice(0, 2).join(" · ")}
                </td>

                {/* Rooms */}
                <td className="py-4 px-4 text-right font-bold text-roomly-dark">
                  {n.rooms} rooms
                </td>

                {/* Action Link */}
                <td className="py-4 px-4 text-right">
                  <Link
                    href={`/rooms?city=${encodeURIComponent(
                      cityName
                    )}&neighbourhood=${encodeURIComponent(n.name)}`}
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-roomly-dark hover:text-roomly-green"
                  >
                    <span>View rooms</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
