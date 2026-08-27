"use client";

import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { Property } from "@/data/properties";
import { cn } from "@/lib/utils";

export interface ReviewSectionProps {
  property: Property;
  className?: string;
}

export function ReviewSection({ property, className }: ReviewSectionProps) {
  const stats = property.reviewStats;

  return (
    <section className={cn("flex flex-col gap-8", className)}>
      <div className="flex flex-col gap-1">
        <h2 className="font-display font-bold text-2xl text-roomly-dark">
          What residents say
        </h2>
        <p className="text-xs sm:text-sm text-roomly-muted">
          Feedback from verified verified long-stay and co-working residents
        </p>
      </div>

      {/* Ratings Summary Card */}
      <div className="p-6 sm:p-7 rounded-2xl bg-[#FDFCF8] border border-roomly-border grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-4 flex flex-col items-center md:items-start gap-1 pb-4 md:pb-0 md:border-r md:border-roomly-border">
          <div className="flex items-baseline gap-2">
            <span className="font-display font-black text-5xl text-roomly-dark">
              {stats.overall.toFixed(1)}
            </span>
            <Star className="w-6 h-6 fill-roomly-dark text-roomly-dark" />
          </div>
          <span className="text-xs font-semibold text-roomly-dark">
            Overall resident score
          </span>
          <span className="text-xs text-roomly-muted">
            Based on {stats.totalCount} reviews
          </span>
        </div>

        {/* Categories Progress Bars */}
        <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {[
            { label: "Cleanliness", score: stats.cleanliness },
            { label: "Location", score: stats.location },
            { label: "Facilities", score: stats.facilities },
            { label: "Staff & Support", score: stats.staff },
          ].map((cat) => (
            <div key={cat.label} className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-medium text-roomly-dark">{cat.label}</span>
                <span className="font-bold text-roomly-dark">{cat.score}</span>
              </div>
              <div className="w-full h-2 bg-roomly-border/70 rounded-full overflow-hidden">
                <div
                  className="h-full bg-roomly-dark rounded-full"
                  style={{ width: `${(cat.score / 5) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {property.reviewsList.map((rev) => (
          <div
            key={rev.id}
            className="p-5 rounded-2xl bg-[#FDFCF8] border border-roomly-border flex flex-col justify-between gap-4 shadow-sm"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {rev.residentPhoto ? (
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border border-roomly-border">
                      <Image
                        src={rev.residentPhoto}
                        alt={rev.author}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-roomly-cream flex items-center justify-center font-bold text-xs text-roomly-dark">
                      {rev.author.charAt(0)}
                    </div>
                  )}

                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-xs text-roomly-dark">
                        {rev.author}
                      </span>
                      {rev.age && (
                        <span className="text-[11px] text-roomly-muted">
                          · {rev.age}
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-roomly-muted">
                      {rev.role}
                      {rev.company ? ` at ${rev.company}` : ""}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-0.5 text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-roomly-dark text-roomly-dark" />
                  <span>{rev.rating}</span>
                </div>
              </div>

              <p className="text-xs text-roomly-dark leading-relaxed">
                &ldquo;{rev.comment}&rdquo;
              </p>

              {/* Photo-based review */}
              {rev.roomPhoto && (
                <div className="relative w-full h-32 rounded-xl overflow-hidden border border-roomly-border mt-1">
                  <Image
                    src={rev.roomPhoto}
                    alt={`${rev.author}'s room review photograph`}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover"
                  />
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/60 backdrop-blur-md rounded text-[10px] text-white font-medium">
                    Photo by resident
                  </span>
                </div>
              )}
            </div>

            <span className="text-[10px] text-roomly-muted self-end">
              {rev.date}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
