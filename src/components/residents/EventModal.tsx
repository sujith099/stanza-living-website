"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Clock, MapPin, Users, Check } from "lucide-react";
import { CommunityEvent } from "@/data/residents";
import { RoomlyButton } from "@/components/ui/RoomlyButton";
import { ROOMLY_EASE } from "@/lib/animations";

export interface EventModalProps {
  event: CommunityEvent | null;
  isOpen: boolean;
  onClose: () => void;
}

export function EventModal({ event, isOpen, onClose }: EventModalProps) {
  const [isInterested, setIsInterested] = useState(false);

  if (!isOpen || !event) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Dialog Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.25, ease: ROOMLY_EASE }}
          className="relative w-full max-w-lg rounded-3xl bg-[#FDFCF8] border border-roomly-border shadow-2xl overflow-hidden z-10 flex flex-col"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Banner Image */}
          <div className="relative aspect-[16/9] w-full bg-roomly-cream/60">
            <Image
              src={event.image}
              alt={event.title}
              fill
              sizes="(max-width: 768px) 100vw, 512px"
              className="object-cover"
            />
            <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-roomly-dark/85 backdrop-blur-md text-roomly-cream text-[11px] font-bold">
              {event.category}
            </div>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-7 flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <h3 className="font-display font-bold text-2xl text-roomly-dark">
                {event.title}
              </h3>
              <p className="text-xs text-roomly-muted leading-relaxed">
                {event.description}
              </p>
            </div>

            {/* Event Meta Grid */}
            <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-roomly-bg border border-roomly-border text-xs">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-roomly-green flex-shrink-0" />
                <span>
                  {event.dayOfWeek}, {event.date}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-roomly-green flex-shrink-0" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-roomly-green flex-shrink-0" />
                <span className="truncate">{event.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-roomly-green flex-shrink-0" />
                <span>
                  {event.attendeesCount + (isInterested ? 1 : 0)} neighbors going
                </span>
              </div>
            </div>

            {/* Action Trigger */}
            <RoomlyButton
              variant={isInterested ? "primary" : "lime"}
              size="md"
              shape="pill"
              onClick={() => setIsInterested(!isInterested)}
              className="w-full justify-center text-xs font-semibold py-3"
            >
              {isInterested ? (
                <span className="inline-flex items-center gap-1.5">
                  <Check className="w-4 h-4" />
                  <span>You&apos;re interested · See you there</span>
                </span>
              ) : (
                "I'm interested →"
              )}
            </RoomlyButton>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
