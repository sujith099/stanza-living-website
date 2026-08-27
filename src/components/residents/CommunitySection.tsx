"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, ArrowUpRight } from "lucide-react";
import { COMMUNITY_EVENTS, CommunityEvent } from "@/data/residents";
import { EventModal } from "./EventModal";
import { FadeIn } from "@/components/ui/FadeIn";
import { ROOMLY_EASE } from "@/lib/animations";
import { cn } from "@/lib/utils";

export interface CommunitySectionProps {
  className?: string;
}

export function CommunitySection({ className }: CommunitySectionProps) {
  const [selectedEvent, setSelectedEvent] = useState<CommunityEvent | null>(null);

  return (
    <section className={cn("flex flex-col gap-12 sm:gap-16 w-full", className)}>
      <FadeIn>
        <div className="flex flex-col gap-2 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-roomly-green" />
            <span className="text-[11px] uppercase tracking-widest font-bold text-roomly-muted">
              LIFE AT OAK HOUSE
            </span>
          </div>

          <h3 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-roomly-dark tracking-tight leading-tight">
            Your home is more
            <br />
            than four walls.
          </h3>

          <p className="text-xs sm:text-sm text-roomly-muted max-w-md pt-1">
            Meet people, join events and make a new place feel familiar. Casual weekend activities curated for residents and their friends.
          </p>
        </div>
      </FadeIn>

      {/* Event Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
        {COMMUNITY_EVENTS.map((event, idx) => (
          <FadeIn key={event.id} delay={idx * 0.1}>
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3, ease: ROOMLY_EASE }}
              onClick={() => setSelectedEvent(event)}
              className="group flex flex-col bg-[#FDFCF8] border border-roomly-border hover:border-roomly-dark/40 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer select-none h-full"
            >
              {/* Event Image */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-roomly-cream/50">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-roomly-dark/85 backdrop-blur-md text-roomly-cream text-[11px] font-bold">
                  {event.category}
                </div>
              </div>

              {/* Event Body */}
              <div className="p-6 flex flex-col flex-grow justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-display font-bold text-xl text-roomly-dark group-hover:text-roomly-green transition-colors">
                      {event.title}
                    </h4>
                    <div className="w-8 h-8 rounded-full border border-roomly-border flex items-center justify-center group-hover:bg-roomly-dark group-hover:text-roomly-lime transition-colors flex-shrink-0">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  <p className="text-xs text-roomly-muted line-clamp-2 leading-relaxed">
                    {event.description}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs pt-3 border-t border-roomly-border/70 text-roomly-muted">
                  <div className="flex items-center gap-1.5 font-semibold text-roomly-dark">
                    <Clock className="w-3.5 h-3.5 text-roomly-green" />
                    <span>
                      {event.dayOfWeek} · {event.time}
                    </span>
                  </div>

                  <span className="text-[11px] text-roomly-green font-bold">
                    {event.attendeesCount} RSVP&apos;d
                  </span>
                </div>
              </div>
            </motion.div>
          </FadeIn>
        ))}
      </div>

      {/* Interactive Modal */}
      <EventModal
        event={selectedEvent}
        isOpen={Boolean(selectedEvent)}
        onClose={() => setSelectedEvent(null)}
      />
    </section>
  );
}
