"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Images } from "lucide-react";
import { FullscreenGallery } from "./FullscreenGallery";
import { cn } from "@/lib/utils";

export interface RoomGalleryProps {
  images: string[];
  propertyName: string;
  className?: string;
}

export function RoomGallery({
  images,
  propertyName,
  className,
}: RoomGalleryProps) {
  const [fullscreenOpen, setFullscreenOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const openFullscreen = (index: number) => {
    setActiveImageIndex(index);
    setFullscreenOpen(true);
  };

  return (
    <>
      <div className={cn("relative flex flex-col gap-4", className)}>
        {/* Desktop 1-Large + 2-Smaller Gallery */}
        <div className="hidden sm:flex flex-col gap-4 rounded-3xl overflow-hidden border border-roomly-border shadow-xl bg-roomly-cream/30">
          {/* Main Large Image */}
          <div
            onClick={() => openFullscreen(0)}
            className="group relative aspect-[16/9] w-full overflow-hidden cursor-pointer"
          >
            <Image
              src={images[0]}
              alt={`${propertyName} primary room view`}
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
          </div>

          {/* 2 Supporting Images Row */}
          <div className="grid grid-cols-2 gap-4">
            {images.slice(1, 3).map((img, idx) => (
              <div
                key={idx + 1}
                onClick={() => openFullscreen(idx + 1)}
                className="group relative aspect-[16/10] w-full overflow-hidden cursor-pointer bg-roomly-cream/50"
              >
                <Image
                  src={img}
                  alt={`${propertyName} interior view ${idx + 2}`}
                  fill
                  sizes="50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Swipeable Gallery */}
        <div className="sm:hidden relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-roomly-border shadow-md">
          <div
            onClick={() => openFullscreen(0)}
            className="relative w-full h-full cursor-pointer"
          >
            <Image
              src={images[0]}
              alt={`${propertyName} primary room view`}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* View All Photos Button Overlay */}
        <button
          type="button"
          onClick={() => openFullscreen(0)}
          className="absolute bottom-4 right-4 z-20 flex items-center gap-2 bg-roomly-dark/90 hover:bg-roomly-dark text-roomly-cream text-xs font-semibold px-4 py-2 rounded-full backdrop-blur-md border border-white/15 shadow-xl transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          <Images className="w-3.5 h-3.5 text-roomly-lime" />
          <span>View all {images.length} photos</span>
        </button>
      </div>

      {/* Fullscreen Lightbox */}
      <FullscreenGallery
        images={images}
        currentIndex={activeImageIndex}
        isOpen={fullscreenOpen}
        onClose={() => setFullscreenOpen(false)}
        onNavigate={setActiveImageIndex}
      />
    </>
  );
}
