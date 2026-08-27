"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Home,
  Bookmark,
  HelpCircle,
  CreditCard,
  Wrench,
  MessageSquare,
  User,
  Sliders,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface DashboardSidebarProps {
  onSignOut: () => void;
  className?: string;
}

export function DashboardSidebar({ onSignOut, className }: DashboardSidebarProps) {
  const pathname = usePathname();

  const MAIN_NAV = [
    { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { label: "My booking", href: "/dashboard/booking", icon: Home },
    { label: "Saved rooms", href: "/dashboard/saved", icon: Bookmark },
    { label: "Enquiries", href: "/dashboard/enquiries", icon: HelpCircle },
    { label: "Payments", href: "/dashboard/payments", icon: CreditCard },
    { label: "Maintenance", href: "/dashboard/maintenance", icon: Wrench },
    { label: "Messages", href: "/dashboard/messages", icon: MessageSquare },
  ];

  const SECONDARY_NAV = [
    { label: "Profile", href: "/dashboard/profile", icon: User },
    { label: "Preferences", href: "/dashboard/preferences", icon: Sliders },
    { label: "Help center", href: "/dashboard/help", icon: HelpCircle },
  ];

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(href);
  };

  return (
    <aside
      className={cn(
        "hidden lg:flex flex-col justify-between w-64 bg-[#FDFCF8] border-r border-roomly-border min-h-screen p-5 select-none sticky top-0 flex-shrink-0 z-30",
        className
      )}
    >
      {/* Top Logo */}
      <div className="flex flex-col gap-6">
        <Link href="/" className="inline-flex items-center gap-1 group px-2 pt-2">
          <span className="font-display font-black text-lg tracking-wider text-roomly-dark whitespace-nowrap">
            STANZA LIVING
          </span>
          <span className="text-roomly-lime font-bold text-lg group-hover:rotate-45 transition-transform">
            *
          </span>
        </Link>

        {/* Main Navigation */}
        <nav className="flex flex-col gap-1">
          {MAIN_NAV.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors",
                  active
                    ? "bg-roomly-dark text-roomly-lime shadow-sm font-bold"
                    : "text-roomly-muted hover:text-roomly-dark hover:bg-roomly-bg"
                )}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="h-px w-full bg-roomly-border my-1" />

        {/* Secondary Navigation */}
        <nav className="flex flex-col gap-1">
          {SECONDARY_NAV.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors",
                  active
                    ? "bg-roomly-dark text-roomly-lime shadow-sm font-bold"
                    : "text-roomly-muted hover:text-roomly-dark hover:bg-roomly-bg"
                )}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Sign Out Action */}
      <div className="pt-4 border-t border-roomly-border">
        <button
          type="button"
          onClick={onSignOut}
          className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-roomly-coral hover:bg-roomly-coral/10 w-full transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          <span>Sign out</span>
        </button>
      </div>
    </aside>
  );
}
