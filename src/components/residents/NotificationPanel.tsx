"use client";

import React, { useState } from "react";
import { Bell } from "lucide-react";
import { RESIDENT_NOTIFICATIONS } from "@/data/residents";
import { FadeIn } from "@/components/ui/FadeIn";
import { cn } from "@/lib/utils";

export interface NotificationPanelProps {
  className?: string;
}

export function NotificationPanel({ className }: NotificationPanelProps) {
  const [notifications, setNotifications] = useState(RESIDENT_NOTIFICATIONS);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <section className={cn("flex flex-col gap-6 w-full", className)}>
      <FadeIn>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-roomly-cream/70 flex items-center justify-center text-roomly-green">
              <Bell className="w-4 h-4" />
            </div>
            <h4 className="font-display font-bold text-xl text-roomly-dark">
              Recent Alerts
            </h4>
          </div>

          <button
            type="button"
            onClick={markAllAsRead}
            className="text-xs font-semibold text-roomly-green hover:text-roomly-dark transition-colors cursor-pointer"
          >
            Mark all read
          </button>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 select-none">
        {notifications.map((item, idx) => (
          <FadeIn key={item.id} delay={idx * 0.05}>
            <div
              className={cn(
                "p-4 rounded-2xl border transition-all flex items-start justify-between gap-3",
                item.read
                  ? "bg-[#FDFCF8]/60 border-roomly-border opacity-70"
                  : "bg-[#FDFCF8] border-roomly-dark shadow-sm"
              )}
            >
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  {!item.read && (
                    <span className="w-2 h-2 rounded-full bg-roomly-lime flex-shrink-0" />
                  )}
                  <span className="font-display font-bold text-xs sm:text-sm text-roomly-dark">
                    {item.title}
                  </span>
                </div>
                <span className="text-[11px] text-roomly-muted pl-4">
                  {item.time}
                </span>
              </div>

              <span className="text-[10px] uppercase tracking-wider font-bold text-roomly-muted">
                {item.category}
              </span>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
