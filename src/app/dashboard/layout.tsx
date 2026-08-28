"use client";

import React, { useState } from "react";
import {
  DashboardSidebar,
  DashboardHeader,
  DashboardMobileNav,
  SignOutModal,
} from "@/components/dashboard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [signOutOpen, setSignOutOpen] = useState(false);

  React.useEffect(() => {
    document.title = "My Stanza Living";
  }, []);

  return (
    <div className="min-h-screen bg-roomly-bg text-roomly-dark selection:bg-roomly-green selection:text-roomly-cream flex">
      {/* 1. Persistent Desktop Sidebar */}
      <DashboardSidebar onSignOut={() => setSignOutOpen(true)} />

      {/* 2. Main Body Container */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Sticky Top Header & Mobile Navigation Container */}
        <div className="sticky top-0 z-30 bg-[#FDFCF8]">
          <DashboardHeader onSignOut={() => setSignOutOpen(true)} />
          <DashboardMobileNav />
        </div>

        {/* Main Content Outlet */}
        <main className="flex-1 p-5 sm:p-8 lg:p-10 max-w-6xl w-full mx-auto">
          {children}
        </main>
      </div>

      {/* Sign Out Confirmation Dialog */}
      <SignOutModal
        isOpen={signOutOpen}
        onClose={() => setSignOutOpen(false)}
      />
    </div>
  );
}
