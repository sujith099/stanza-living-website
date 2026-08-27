"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function DashboardMobileNav({ className }: { className?: string }) {
  const pathname = usePathname();

  const NAV_ITEMS = [
    { label: "Overview", href: "/dashboard" },
    { label: "Booking", href: "/dashboard/booking" },
    { label: "Saved", href: "/dashboard/saved" },
    { label: "Payments", href: "/dashboard/payments" },
    { label: "Maintenance", href: "/dashboard/maintenance" },
    { label: "Messages", href: "/dashboard/messages" },
    { label: "Enquiries", href: "/dashboard/enquiries" },
    { label: "Profile", href: "/dashboard/profile" },
    { label: "Help", href: "/dashboard/help" },
  ];

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(href);
  };

  return (
    <div
      className={cn(
        "lg:hidden w-full bg-[#FDFCF8] border-b border-roomly-border px-4 py-2.5 overflow-x-auto no-scrollbar select-none sticky top-14 z-20",
        className
      )}
    >
      <div className="flex items-center gap-1.5 w-max">
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors",
                active
                  ? "bg-roomly-dark text-roomly-lime font-bold shadow-xs"
                  : "bg-roomly-bg text-roomly-muted hover:text-roomly-dark"
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
