"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bell, ChevronDown, User, Sliders, HelpCircle, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRoomlyApp } from "@/context/RoomlyAppContext";

export interface DashboardHeaderProps {
  onSignOut: () => void;
  className?: string;
}

export function DashboardHeader({ onSignOut, className }: DashboardHeaderProps) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const {
    notifications,
    unreadNotificationCount,
    markAllNotificationsRead,
    user,
  } = useRoomlyApp();

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setNotificationsOpen(false);
        setProfileOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header
      className={cn(
        "w-full bg-[#FDFCF8] border-b border-roomly-border px-5 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-30 select-none backdrop-blur-md",
        className
      )}
    >
      {/* Mobile Brand / Desktop Context */}
      <div className="flex items-center gap-3">
        <Link href="/" className="lg:hidden inline-flex items-center gap-1 group">
          <span className="font-display font-black text-xl tracking-wider text-roomly-dark">
            ROOMLY
          </span>
          <span className="text-roomly-lime font-bold text-lg group-hover:rotate-45 transition-transform">
            *
          </span>
        </Link>

        <span className="hidden sm:inline text-xs font-semibold text-roomly-muted">
          Resident Portal · {user.city}
        </span>
      </div>

      {/* Right Controls: Notifications & Profile */}
      <div className="flex items-center gap-3 sm:gap-4 relative">
        {/* Notifications Button */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setNotificationsOpen(!notificationsOpen);
              setProfileOpen(false);
            }}
            className="w-9 h-9 rounded-full bg-roomly-bg border border-roomly-border flex items-center justify-center text-roomly-dark hover:border-roomly-dark transition-colors relative cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadNotificationCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-roomly-coral" />
            )}
          </button>

          {/* Notifications Dropdown Panel */}
          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-[#FDFCF8] border border-roomly-border shadow-xl p-4 flex flex-col gap-3 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between border-b border-roomly-border pb-2.5">
                <span className="font-display font-bold text-sm text-roomly-dark">
                  Notifications
                </span>
                {unreadNotificationCount > 0 && (
                  <button
                    type="button"
                    onClick={markAllNotificationsRead}
                    className="text-[11px] font-semibold text-roomly-green hover:underline cursor-pointer"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="flex flex-col gap-2 max-h-80 overflow-y-auto">
                {notifications.map((n) => (
                  <Link
                    key={n.id}
                    href={n.link}
                    onClick={() => setNotificationsOpen(false)}
                    className={cn(
                      "p-3 rounded-xl border text-xs transition-colors flex flex-col gap-1",
                      !n.read
                        ? "bg-roomly-bg border-roomly-dark/30 shadow-xs"
                        : "bg-white border-roomly-border/60 hover:bg-roomly-bg"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-roomly-dark">
                        {n.title}
                      </span>
                      {!n.read && (
                        <span className="w-1.5 h-1.5 rounded-full bg-roomly-coral" />
                      )}
                    </div>
                    <p className="text-roomly-muted text-[11px] leading-relaxed">
                      {n.description}
                    </p>
                    <span className="text-[10px] text-roomly-muted/70 pt-0.5">
                      {n.timestamp}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile Avatar & Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setProfileOpen(!profileOpen);
              setNotificationsOpen(false);
            }}
            className="flex items-center gap-2 p-1 sm:px-2 sm:py-1 rounded-full bg-roomly-bg border border-roomly-border hover:border-roomly-dark transition-colors cursor-pointer"
          >
            <div className="relative w-7 h-7 rounded-full overflow-hidden flex-shrink-0 bg-roomly-border">
              <Image
                src={user.avatar}
                alt={user.name}
                fill
                sizes="28px"
                className="object-cover"
              />
            </div>
            <span className="text-xs font-bold text-roomly-dark hidden sm:inline">
              {user.name.split(" ")[0]}
            </span>
            <ChevronDown className="w-3 h-3 text-roomly-muted hidden sm:inline" />
          </button>

          {/* Profile Dropdown Menu */}
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#FDFCF8] border border-roomly-border shadow-xl p-2 flex flex-col gap-1 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="px-3 py-2 border-b border-roomly-border">
                <span className="font-bold text-xs text-roomly-dark block">
                  {user.name}
                </span>
                <span className="text-[10px] text-roomly-muted block truncate">
                  {user.email}
                </span>
              </div>

              <Link
                href="/dashboard/profile"
                onClick={() => setProfileOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-roomly-dark hover:bg-roomly-bg transition-colors"
              >
                <User className="w-3.5 h-3.5 text-roomly-muted" />
                <span>View profile</span>
              </Link>

              <Link
                href="/dashboard/preferences"
                onClick={() => setProfileOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-roomly-dark hover:bg-roomly-bg transition-colors"
              >
                <Sliders className="w-3.5 h-3.5 text-roomly-muted" />
                <span>Preferences</span>
              </Link>

              <Link
                href="/dashboard/help"
                onClick={() => setProfileOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-roomly-dark hover:bg-roomly-bg transition-colors"
              >
                <HelpCircle className="w-3.5 h-3.5 text-roomly-muted" />
                <span>Help center</span>
              </Link>

              <div className="h-px w-full bg-roomly-border my-1" />

              <button
                type="button"
                onClick={() => {
                  setProfileOpen(false);
                  onSignOut();
                }}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-roomly-coral hover:bg-roomly-coral/10 w-full transition-colors cursor-pointer text-left"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
