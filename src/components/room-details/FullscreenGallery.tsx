"use client";

import React, { useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { ROOMLY_EASE } from "@/lib/animations";

export interface FullscreenGalleryProps {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function FullscreenGallery({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}: FullscreenGalleryProps) {
  const handlePrev = useCallback(() => {
    onNavigate((currentIndex - 1 + images.length) % images.length);
  }, [currentIndex, images.length, onNavigate]);

  const handleNext = useCallback(() => {
    onNavigate((currentIndex + 1) % images.length);
  }, [currentIndex, images.length, onNavigate]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md select-none">
          {/* Top Bar: Counter and Close button */}
          <div className="absolute top-5 inset-x-6 z-50 flex items-center justify-between text-white/80">
            <span className="font-display font-medium text-sm tracking-wider">
              {currentIndex + 1} / {images.length}
            </span>

            <button
              type="button"
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
              aria-label="Close fullscreen gallery"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Controls */}
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-4 sm:left-8 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-all cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="absolute right-4 sm:right-8 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-all cursor-pointer"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Center High-Res Image Display */}
          <div className="relative w-full max-w-5xl h-[75vh] mx-4 flex items-center justify-center">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: ROOMLY_EASE }}
              className="relative w-full h-full"
            >
              <Image
                src={images[currentIndex]}
                alt={`Room gallery photograph ${currentIndex + 1}`}
                fill
                priority
                sizes="90vw"
                className="object-contain"
              />
            </motion.div>
          </div>

          {/* Thumbnail Bar at Bottom */}
          <div className="absolute bottom-5 inset-x-6 z-50 flex items-center justify-center gap-2 overflow-x-auto py-2">
            {images.map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={() => onNavigate(i)}
                className={`relative w-14 h-10 sm:w-16 sm:h-12 rounded-lg overflow-hidden flex-shrink-0 transition-all ${
                  i === currentIndex
                    ? "ring-2 ring-roomly-lime scale-105 opacity-100"
                    : "opacity-40 hover:opacity-80"
                }`}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${i + 1}`}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
