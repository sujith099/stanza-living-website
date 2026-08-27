"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Bookmark, Trash2 } from "lucide-react";
import { PROPERTIES } from "@/data/properties";
import { PropertyCard } from "@/components/ui/PropertyCard";
import { RoomlyButton } from "@/components/ui/RoomlyButton";
import { BackButton } from "@/components/ui/BackButton";
import { FadeIn } from "@/components/ui/FadeIn";
import { ROOMLY_EASE } from "@/lib/animations";
import { useRoomlyApp } from "@/context/RoomlyAppContext";

export default function DashboardSavedPage() {
  const { savedPropertyIds, toggleSave } = useRoomlyApp();

  const savedRooms = PROPERTIES.filter(
    (p) => savedPropertyIds.includes(p.id) || savedPropertyIds.includes(p.slug)
  );

  return (
    <div className="flex flex-col gap-6 w-full select-none">
      {/* Back to Dashboard */}
      <div>
        <BackButton label="Back to dashboard" fallback="/dashboard" />
      </div>

      {/* Header */}
      <FadeIn>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="font-display font-black text-3xl text-roomly-dark">
              Saved Rooms
            </h1>
            <p className="text-xs text-roomly-muted">
              Rooms you&apos;ve shortlisted for future move-in or reference ({savedRooms.length} saved)
            </p>
          </div>

          <Link href="/rooms">
            <RoomlyButton
              variant="outline"
              size="sm"
              shape="pill"
              className="text-xs font-semibold bg-white border-roomly-border hover:bg-roomly-bg"
            >
              Explore more rooms →
            </RoomlyButton>
          </Link>
        </div>
      </FadeIn>

      {/* Grid or Empty State */}
      {savedRooms.length === 0 ? (
        <FadeIn>
          <div className="py-16 px-6 rounded-3xl bg-[#FDFCF8] border border-roomly-border text-center flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-roomly-bg border border-roomly-border flex items-center justify-center text-roomly-muted">
              <Bookmark className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-xl text-roomly-dark">
              You haven&apos;t saved any rooms yet.
            </h3>
            <p className="text-xs text-roomly-muted max-w-sm">
              Explore available homes across Bengaluru, Hyderabad, and Pune to build your shortlist.
            </p>
            <Link href="/rooms">
              <RoomlyButton variant="primary" size="md" shape="pill">
                Explore rooms →
              </RoomlyButton>
            </Link>
          </div>
        </FadeIn>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {savedRooms.map((property) => (
              <motion.div
                key={property.id}
                layout
                initial={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.25, ease: ROOMLY_EASE } }}
                className="flex flex-col gap-2 relative group"
              >
                {/* Remove trigger overlay button */}
                <button
                  type="button"
                  onClick={() => toggleSave(property.id)}
                  className="absolute top-3 right-3 z-30 p-2 rounded-full bg-black/70 hover:bg-roomly-coral text-white backdrop-blur-md transition-colors cursor-pointer"
                  title="Remove from saved"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>

                <PropertyCard property={property} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
