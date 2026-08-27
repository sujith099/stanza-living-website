"use client";

import React from "react";
import { motion } from "framer-motion";
import { Property } from "@/data/properties";
import { PropertyCard } from "./PropertyCard";
import { cn } from "@/lib/utils";
import { ROOMLY_EASE } from "@/lib/animations";

export interface PropertyGridProps {
  properties: Property[];
  columns?: 2 | 3 | 4;
  className?: string;
  onSave?: (id: string, isSaved: boolean) => void;
  emptyMessage?: string;
}

export function PropertyGrid({
  properties,
  columns = 3,
  className,
  onSave,
  emptyMessage = "No residences match your selected filters.",
}: PropertyGridProps) {
  if (properties.length === 0) {
    return (
      <div className="text-center py-16 px-4 border border-dashed border-roomly-border rounded-2xl bg-white/40">
        <p className="text-sm text-roomly-muted">{emptyMessage}</p>
      </div>
    );
  }

  const columnStyles = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: ROOMLY_EASE,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      className={cn("grid gap-6 md:gap-8", columnStyles[columns], className)}
    >
      {properties.map((property, idx) => (
        <motion.div key={property.id} variants={itemVariants}>
          <PropertyCard
            property={property}
            onSave={onSave}
            priority={idx < 3}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
