"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface PropertySkeletonProps {
  viewMode?: "grid" | "list";
  className?: string;
}

export function PropertySkeleton({
  viewMode = "grid",
  className,
}: PropertySkeletonProps) {
  if (viewMode === "list") {
    return (
      <div
        className={cn(
          "flex flex-col sm:flex-row bg-[#FDFCF8] border border-roomly-border rounded-2xl overflow-hidden animate-pulse",
          className
        )}
      >
        <div className="w-full sm:w-64 md:w-72 aspect-[4/3] sm:aspect-auto bg-roomly-cream/60 flex-shrink-0" />
        <div className="p-5 sm:p-6 flex flex-col justify-between flex-grow gap-4">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="h-3 w-28 bg-roomly-cream/80 rounded" />
              <div className="h-3 w-12 bg-roomly-cream/80 rounded" />
            </div>
            <div className="h-5 w-44 bg-roomly-dark/10 rounded" />
            <div className="h-3 w-32 bg-roomly-cream/80 rounded" />
            <div className="flex gap-2 pt-2">
              <div className="h-5 w-16 bg-roomly-cream/60 rounded" />
              <div className="h-5 w-20 bg-roomly-cream/60 rounded" />
              <div className="h-5 w-16 bg-roomly-cream/60 rounded" />
            </div>
          </div>
          <div className="pt-4 border-t border-roomly-border flex items-center justify-between">
            <div className="h-6 w-24 bg-roomly-dark/15 rounded" />
            <div className="w-8 h-8 rounded-full bg-roomly-cream/80" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col bg-[#FDFCF8] border border-roomly-border rounded-2xl overflow-hidden animate-pulse",
        className
      )}
    >
      <div className="aspect-[4/3] w-full bg-roomly-cream/60" />
      <div className="p-5 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="h-3 w-28 bg-roomly-cream/80 rounded" />
          <div className="h-3 w-10 bg-roomly-cream/80 rounded" />
        </div>
        <div className="h-5 w-40 bg-roomly-dark/10 rounded" />
        <div className="h-3 w-24 bg-roomly-cream/70 rounded" />
        <div className="flex gap-1.5 pt-1">
          <div className="h-5 w-14 bg-roomly-cream/60 rounded" />
          <div className="h-5 w-16 bg-roomly-cream/60 rounded" />
          <div className="h-5 w-14 bg-roomly-cream/60 rounded" />
        </div>
        <div className="pt-3 border-t border-roomly-border flex items-center justify-between">
          <div className="h-6 w-24 bg-roomly-dark/15 rounded" />
          <div className="w-8 h-8 rounded-full bg-roomly-cream/80" />
        </div>
      </div>
    </div>
  );
}
