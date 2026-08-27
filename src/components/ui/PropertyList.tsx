"use client";

import React from "react";
import { motion } from "framer-motion";
import { Property } from "@/data/properties";
import { PropertyCard } from "./PropertyCard";
import { cn } from "@/lib/utils";
import { ROOMLY_EASE } from "@/lib/animations";

export interface PropertyListProps {
  properties: Property[];
  onSaveToggle?: (id: string, isSaved: boolean) => void;
  className?: string;
}

export function PropertyList({
  properties,
  onSaveToggle,
  className,
}: PropertyListProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: ROOMLY_EASE,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn("flex flex-col gap-6", className)}
    >
      {properties.map((property, idx) => (
        <motion.div key={property.id} variants={itemVariants}>
          <PropertyCard
            property={property}
            viewMode="list"
            onSaveToggle={onSaveToggle}
            priority={idx < 3}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
