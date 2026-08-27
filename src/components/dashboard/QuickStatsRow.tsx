"use client";

import React from "react";
import Link from "next/link";
import { CreditCard, Wrench, Bookmark, MessageSquare } from "lucide-react";
import { useRoomlyApp } from "@/context/RoomlyAppContext";
import { cn } from "@/lib/utils";

export function QuickStatsRow({ className }: { className?: string }) {
  const { savedPropertyIds, activeBooking, maintenanceTickets } = useRoomlyApp();

  const activeTicketsCount = maintenanceTickets.filter(
    (t) => t.status !== "Resolved"
  ).length;

  const STATS = [
    {
      title: "Monthly Rent",
      value: `₹${activeBooking.monthlyRent.toLocaleString("en-IN")}`,
      subtitle: "Due Sep 5",
      href: "/dashboard/payments",
      icon: CreditCard,
      badge: "Upcoming",
    },
    {
      title: "Active Requests",
      value: activeTicketsCount.toString(),
      subtitle: activeTicketsCount > 0 ? "AC cooling issue" : "All resolved",
      href: "/dashboard/maintenance",
      icon: Wrench,
      badge: activeTicketsCount > 0 ? "In progress" : "Clean",
    },
    {
      title: "Saved Rooms",
      value: savedPropertyIds.length.toString(),
      subtitle: `${savedPropertyIds.length} shortlisted`,
      href: "/dashboard/saved",
      icon: Bookmark,
      badge: "Shortlisted",
    },
    {
      title: "Messages",
      value: "2",
      subtitle: "Support & Property",
      href: "/dashboard/messages",
      icon: MessageSquare,
      badge: "Unread",
    },
  ];

  return (
    <div className={cn("grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 select-none", className)}>
      {STATS.map((s) => {
        const Icon = s.icon;

        return (
          <Link
            key={s.title}
            href={s.href}
            className="p-4 sm:p-5 rounded-3xl bg-[#FDFCF8] border border-roomly-border hover:border-roomly-dark/40 shadow-xs hover:shadow-md transition-all flex flex-col justify-between gap-3 group"
          >
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-xl bg-roomly-bg border border-roomly-border flex items-center justify-center text-roomly-dark group-hover:bg-roomly-dark group-hover:text-roomly-lime transition-colors">
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-[10px] uppercase font-bold text-roomly-muted tracking-wider">
                {s.badge}
              </span>
            </div>

            <div>
              <span className="text-xs text-roomly-muted block">
                {s.title}
              </span>
              <div className="font-display font-black text-xl sm:text-2xl text-roomly-dark">
                {s.value}
              </div>
              <span className="text-[11px] text-roomly-green font-semibold block mt-0.5">
                {s.subtitle}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
