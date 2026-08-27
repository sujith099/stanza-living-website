"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { RoomlyButton } from "./RoomlyButton";
import { ROOMLY_EASE, navDrawerVariants, navItemVariants } from "@/lib/animations";

export interface NavLink {
  label: string;
  href: string;
}

const DEFAULT_LINKS: NavLink[] = [
  { label: "Homes", href: "/rooms" },
  { label: "Locations", href: "/locations" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "For residents", href: "/residents" },
  { label: "About", href: "/about" },
];

export interface RoomlyNavProps {
  links?: NavLink[];
  className?: string;
}

export function RoomlyNav({
  links = DEFAULT_LINKS,
  className,
}: RoomlyNavProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const isFindRoomActive = pathname === "/rooms" || pathname.startsWith("/rooms/");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2, ease: ROOMLY_EASE }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 pointer-events-none flex justify-center px-4 sm:px-6",
        scrolled ? "pt-2" : "pt-0",
        className
      )}
    >
      {/* Desktop Centered Black Navigation with Rounded Bottom Corners */}
      <nav
        aria-label="Main Navigation"
        className="hidden md:flex items-center justify-between gap-8 lg:gap-12 bg-roomly-dark text-roomly-cream rounded-b-2xl px-6 lg:px-8 py-3 shadow-2xl border-x border-b border-white/10 pointer-events-auto transition-all duration-300"
      >
        {/* Brand Wordmark */}
        <Link
          href="/"
          className="flex items-center gap-1.5 group select-none tracking-tight"
        >
          <span className="font-display font-black text-sm lg:text-base tracking-wider text-white whitespace-nowrap">
            STANZA LIVING
          </span>
          <span className="text-roomly-lime font-bold text-sm select-none">*</span>
        </Link>

        {/* Minimal Editorial Links */}
        <div className="flex items-center gap-6 lg:gap-8">
          {links.map((link) => {
            const isActive =
              link.href === "/rooms"
                ? isFindRoomActive
                : pathname === link.href;

            return (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "text-xs font-medium tracking-wide transition-colors duration-200",
                  isActive
                    ? "text-roomly-lime font-semibold"
                    : "text-roomly-cream/70 hover:text-white"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right Actions: Sign in + Find a room CTA */}
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-xs font-medium text-roomly-cream/70 hover:text-white transition-colors cursor-pointer"
          >
            Sign in
          </Link>
          <Link href="/rooms">
            <RoomlyButton
              variant={isFindRoomActive ? "lime" : "cream"}
              size="sm"
              shape="pill"
              withArrow
              arrowStyle="circle"
              className={cn(
                "text-xs py-1.5 px-4 font-medium transition-all",
                isFindRoomActive && "ring-2 ring-roomly-lime/50 shadow-md font-semibold"
              )}
            >
              Find a room
            </RoomlyButton>
          </Link>
        </div>
      </nav>

      {/* Mobile Navigation Header */}
      <div className="md:hidden w-full flex items-center justify-between bg-roomly-dark text-roomly-cream rounded-b-2xl px-4 py-3 shadow-2xl border-x border-b border-white/10 pointer-events-auto">
        <Link href="/" className="flex items-center gap-1">
          <span className="font-display font-black text-xs sm:text-sm tracking-wider text-white whitespace-nowrap">
            STANZA LIVING
          </span>
          <span className="text-roomly-lime font-bold text-xs">*</span>
        </Link>

        <div className="flex items-center gap-2.5">
          <Link href="/rooms">
            <span
              className={cn(
                "text-[10px] sm:text-[11px] px-2.5 sm:px-3 py-1 rounded-full font-medium transition-all whitespace-nowrap",
                isFindRoomActive
                  ? "bg-roomly-lime text-roomly-dark font-semibold"
                  : "bg-white/10 text-roomly-cream hover:bg-white/20"
              )}
            >
              Find a room
            </span>
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-roomly-cream hover:text-white focus:outline-none cursor-pointer"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Animated Full-Screen Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: ROOMLY_EASE }}
            className="fixed inset-0 z-40 bg-roomly-dark/98 backdrop-blur-xl md:hidden flex flex-col justify-between p-6 pt-20 pointer-events-auto overflow-y-auto"
          >
            <motion.div
              variants={navDrawerVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="flex flex-col gap-6"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-1">
                  <span className="font-display font-black text-base tracking-wider text-white">
                    STANZA LIVING
                  </span>
                  <span className="text-roomly-lime font-bold text-sm">*</span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-roomly-cream/70 hover:text-white"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex flex-col gap-4 pt-2">
                {links.map((link) => {
                  const isActive =
                    link.href === "/rooms"
                      ? isFindRoomActive
                      : pathname === link.href;

                  return (
                    <motion.div key={link.label} variants={navItemVariants}>
                      <Link
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "text-lg font-display font-medium tracking-wide transition-colors",
                          isActive
                            ? "text-roomly-lime font-semibold"
                            : "text-roomly-cream/80 hover:text-white"
                        )}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Mobile Drawer Bottom Actions */}
            <div className="pt-8 border-t border-white/10 flex flex-col gap-4">
              <Link href="/rooms" onClick={() => setMobileMenuOpen(false)}>
                <RoomlyButton
                  variant="lime"
                  size="lg"
                  shape="pill"
                  withArrow
                  arrowStyle="circle"
                  className="w-full text-sm font-semibold"
                >
                  Find a room
                </RoomlyButton>
              </Link>
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center text-xs text-roomly-cream/60 hover:text-white py-2 transition-colors"
              >
                Sign in to your account
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export const StanzaNav = RoomlyNav;
export type StanzaNavProps = RoomlyNavProps;
