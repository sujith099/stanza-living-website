"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCard,
  Wrench,
  Users,
  CheckCircle2,
  Clock,
  AlertCircle,
} from "lucide-react";
import {
  SAMPLE_RESIDENT,
  CURRENT_PAYMENT,
  PAYMENT_HISTORY,
  SAMPLE_TICKETS,
  COMMUNITY_EVENTS,
  ANNOUNCEMENTS,
} from "@/data/residents";
import { ROOMLY_EASE } from "@/lib/animations";
import { cn } from "@/lib/utils";

export interface ResidentDashboardPreviewProps {
  className?: string;
}

type TabType = "Overview" | "Payments" | "Requests" | "Community";

export function ResidentDashboardPreview({
  className,
}: ResidentDashboardPreviewProps) {
  const [activeTab, setActiveTab] = useState<TabType>("Overview");
  const [hasPaid, setHasPaid] = useState(false);

  return (
    <section
      className={cn(
        "p-8 sm:p-14 lg:p-20 rounded-3xl bg-roomly-dark text-roomly-cream relative overflow-hidden shadow-2xl border border-white/10 flex flex-col gap-10 sm:gap-14",
        className
      )}
    >
      <div className="absolute top-0 right-0 w-96 h-96 bg-roomly-green/20 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6 max-w-4xl">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-roomly-lime" />
            <span className="text-[11px] uppercase tracking-widest font-bold text-roomly-lime">
              RESIDENT PORTAL
            </span>
          </div>

          <h3 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
            Everything you need.
            <br />
            In one place.
          </h3>

          <p className="text-xs sm:text-sm text-roomly-cream/70 leading-relaxed pt-1 max-w-xl">
            A calm, single dashboard to settle rent, check maintenance status, see building notices, and RSVP for weekend dinners.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-full bg-white/10 border border-white/10 select-none overflow-x-auto">
          {(["Overview", "Payments", "Requests", "Community"] as TabType[]).map(
            (tab) => {
              const isSelected = activeTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer flex-shrink-0",
                    isSelected
                      ? "bg-roomly-lime text-roomly-dark shadow"
                      : "text-roomly-cream/70 hover:text-white"
                  )}
                >
                  {tab}
                </button>
              );
            }
          )}
        </div>
      </div>

      {/* Interactive Mockup Container */}
      <div className="relative z-10 w-full rounded-2xl bg-white/[0.04] border border-white/10 p-5 sm:p-8 backdrop-blur-md shadow-2xl">
        <AnimatePresence mode="wait">
          {/* TAB 1: OVERVIEW */}
          {activeTab === "Overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: ROOMLY_EASE }}
              className="flex flex-col gap-6"
            >
              {/* Resident Welcome Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-roomly-lime text-roomly-dark font-display font-black text-base flex items-center justify-center">
                    MS
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-lg text-white">
                      Good morning, {SAMPLE_RESIDENT.name.split(" ")[0]}
                    </h4>
                    <span className="text-xs text-roomly-cream/60">
                      {SAMPLE_RESIDENT.property} · {SAMPLE_RESIDENT.room} · {SAMPLE_RESIDENT.neighbourhood}, {SAMPLE_RESIDENT.city}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-roomly-green/30 border border-roomly-green/50 text-roomly-lime text-[11px] font-semibold">
                    Active Resident
                  </span>
                </div>
              </div>

              {/* 4 Interactive Dashboard Panels Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                {/* 1. Rent Due */}
                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-roomly-cream/60 tracking-wider">
                      Current Rent
                    </span>
                    <CreditCard className="w-4 h-4 text-roomly-lime" />
                  </div>
                  <div>
                    <div className="font-display font-black text-2xl text-white">
                      {CURRENT_PAYMENT.amount}
                    </div>
                    <span className="text-[11px] text-roomly-cream/60">
                      Due {CURRENT_PAYMENT.dueDate}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setHasPaid(true)}
                    className={cn(
                      "w-full py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer",
                      hasPaid
                        ? "bg-roomly-green text-white cursor-default"
                        : "bg-roomly-lime text-roomly-dark hover:bg-white"
                    )}
                  >
                    {hasPaid ? "✓ Paid for September" : "Pay rent →"}
                  </button>
                </div>

                {/* 2. Maintenance Requests */}
                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-roomly-cream/60 tracking-wider">
                      Active Requests
                    </span>
                    <Wrench className="w-4 h-4 text-roomly-coral" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white font-medium truncate">
                        {SAMPLE_TICKETS[0].category} issue ({SAMPLE_TICKETS[0].id})
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-roomly-coral/20 text-roomly-coral font-bold">
                        {SAMPLE_TICKETS[0].status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white font-medium truncate">
                        {SAMPLE_TICKETS[1].category} ({SAMPLE_TICKETS[1].id})
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-roomly-green/20 text-roomly-lime font-bold">
                        {SAMPLE_TICKETS[1].status}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab("Requests")}
                    className="w-full py-2 rounded-xl text-xs font-semibold bg-white/10 text-white hover:bg-white/15 transition-colors cursor-pointer text-center"
                  >
                    View tickets →
                  </button>
                </div>

                {/* 3. Upcoming Event */}
                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-roomly-cream/60 tracking-wider">
                      Community
                    </span>
                    <Users className="w-4 h-4 text-roomly-lime" />
                  </div>
                  <div>
                    <div className="font-display font-bold text-sm text-white line-clamp-1">
                      {COMMUNITY_EVENTS[0].title}
                    </div>
                    <span className="text-[11px] text-roomly-cream/60">
                      {COMMUNITY_EVENTS[0].dayOfWeek} · {COMMUNITY_EVENTS[0].time}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab("Community")}
                    className="w-full py-2 rounded-xl text-xs font-semibold bg-white/10 text-white hover:bg-white/15 transition-colors cursor-pointer text-center"
                  >
                    Event details →
                  </button>
                </div>

                {/* 4. House Announcement */}
                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-roomly-cream/60 tracking-wider">
                      Notice
                    </span>
                    <AlertCircle className="w-4 h-4 text-roomly-lime" />
                  </div>
                  <div>
                    <div className="font-display font-bold text-sm text-white line-clamp-1">
                      {ANNOUNCEMENTS[0].title}
                    </div>
                    <span className="text-[11px] text-roomly-cream/60">
                      {ANNOUNCEMENTS[0].date} · {ANNOUNCEMENTS[0].time}
                    </span>
                  </div>
                  <div className="text-[11px] text-roomly-lime font-semibold">
                    Tap announcements below
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: PAYMENTS */}
          {activeTab === "Payments" && (
            <motion.div
              key="payments"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: ROOMLY_EASE }}
              className="flex flex-col gap-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className="flex flex-col">
                  <span className="text-xs text-roomly-cream/60 uppercase tracking-wider font-bold">
                    September 2026 Rent
                  </span>
                  <div className="font-display font-black text-3xl text-white">
                    {CURRENT_PAYMENT.amount}
                  </div>
                  <span className="text-xs text-roomly-cream/60">
                    Includes Room, 1Gbps Fiber, Electricity & Weekly Housekeeping
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setHasPaid(true)}
                  className={cn(
                    "px-6 py-3 rounded-full text-xs font-bold transition-all cursor-pointer",
                    hasPaid
                      ? "bg-roomly-green text-white"
                      : "bg-roomly-lime text-roomly-dark hover:scale-[1.02]"
                  )}
                >
                  {hasPaid ? "✓ Paid Successfully" : "Pay rent now →"}
                </button>
              </div>

              {/* History Rows */}
              <div className="flex flex-col gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-roomly-cream/60">
                  Payment History
                </span>
                {PAYMENT_HISTORY.map((p) => (
                  <div
                    key={p.month}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.02] border border-white/5 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-roomly-lime" />
                      <span className="text-white font-semibold">{p.month}</span>
                      <span className="text-roomly-cream/50 hidden sm:inline">
                        Receipt: {p.receiptId}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-white">{p.amount}</span>
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-roomly-green/20 text-roomly-lime">
                        {p.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 3: REQUESTS */}
          {activeTab === "Requests" && (
            <motion.div
              key="requests"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: ROOMLY_EASE }}
              className="flex flex-col gap-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-display font-bold text-lg text-white">
                    Maintenance Tickets
                  </h4>
                  <p className="text-xs text-roomly-cream/60">
                    Track repair status and assigned technicians
                  </p>
                </div>
                <span className="text-xs font-semibold text-roomly-lime">
                  Average resolution: under 4 hours
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SAMPLE_TICKETS.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between gap-4"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-display font-black text-roomly-lime">
                        {ticket.id} · {ticket.category}
                      </span>
                      <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-roomly-coral/20 text-roomly-coral font-bold">
                        {ticket.status}
                      </span>
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="font-display font-bold text-sm text-white">
                        {ticket.title}
                      </div>
                      <p className="text-xs text-roomly-cream/60 line-clamp-2">
                        {ticket.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-roomly-cream/60 border-t border-white/10 pt-2">
                      <span>Assigned: {ticket.assignedTo}</span>
                      <span>Updated {ticket.updatedTime}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 4: COMMUNITY */}
          {activeTab === "Community" && (
            <motion.div
              key="community"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: ROOMLY_EASE }}
              className="flex flex-col gap-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-display font-bold text-lg text-white">
                    3 Upcoming Community Gatherings
                  </h4>
                  <p className="text-xs text-roomly-cream/60">
                    Casual evenings and weekend runs hosted at Oak House
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {COMMUNITY_EVENTS.map((event) => (
                  <div
                    key={event.id}
                    className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between gap-3"
                  >
                    <span className="text-[10px] uppercase font-bold text-roomly-lime tracking-wider">
                      {event.category}
                    </span>
                    <div className="font-display font-bold text-sm text-white">
                      {event.title}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-roomly-cream/60">
                      <Clock className="w-3 h-3 text-roomly-lime" />
                      <span>
                        {event.dayOfWeek} · {event.time}
                      </span>
                    </div>
                    <span className="text-[11px] text-roomly-green font-semibold">
                      {event.attendeesCount} neighbors attending
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
