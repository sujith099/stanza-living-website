"use client";

import React, { useState } from "react";
import { Search, ChevronDown, ChevronUp, Phone } from "lucide-react";
import { FAQ_ITEMS } from "@/data/dashboard";
import { FadeIn } from "@/components/ui/FadeIn";
import { BackButton } from "@/components/ui/BackButton";
import { cn } from "@/lib/utils";

export default function DashboardHelpPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id);

  const CATEGORIES = ["All", "Payments", "Maintenance", "Move-in", "Booking", "Account"];

  const filtered = FAQ_ITEMS.filter((item) => {
    const matchesCat =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch =
      item.question.toLowerCase().includes(search.toLowerCase()) ||
      item.answer.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-6 w-full select-none max-w-4xl">
      {/* Back to Dashboard */}
      <div>
        <BackButton label="Back to dashboard" fallback="/dashboard" />
      </div>

      {/* Header */}
      <FadeIn>
        <div>
          <h1 className="font-display font-black text-3xl text-roomly-dark">
            How can we help?
          </h1>
          <p className="text-xs text-roomly-muted">
            Frequently asked questions about rent, move-in procedures, house rules, and escrow
          </p>
        </div>
      </FadeIn>

      {/* Search Input */}
      <div className="relative flex items-center">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for answers (e.g. rent, maintenance, deposit, keys)..."
          className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white border border-roomly-border text-xs sm:text-sm text-roomly-dark placeholder:text-roomly-muted/60 focus:outline-none focus:border-roomly-dark shadow-xs"
        />
        <Search className="w-4 h-4 text-roomly-muted absolute left-4 pointer-events-none" />
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={cn(
              "px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer border",
              selectedCategory === cat
                ? "bg-roomly-dark text-roomly-lime border-roomly-dark font-bold"
                : "bg-white text-roomly-dark border-roomly-border hover:bg-roomly-bg"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* FAQ Accordion List */}
      <div className="flex flex-col gap-3">
        {filtered.map((item) => {
          const isOpen = openId === item.id;

          return (
            <div
              key={item.id}
              className="rounded-2xl bg-[#FDFCF8] border border-roomly-border overflow-hidden transition-all shadow-xs"
            >
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-roomly-bg text-roomly-green border border-roomly-border/60">
                    {item.category}
                  </span>
                  <span className="font-display font-bold text-xs sm:text-sm text-roomly-dark">
                    {item.question}
                  </span>
                </div>

                {isOpen ? (
                  <ChevronUp className="w-4 h-4 text-roomly-dark flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-roomly-muted flex-shrink-0" />
                )}
              </button>

              {isOpen && (
                <div className="px-4 sm:px-5 pb-5 pt-1 text-xs text-roomly-muted leading-relaxed border-t border-roomly-border/50 animate-in fade-in slide-in-from-top-1">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Direct Contact Help Card */}
      <div className="p-6 rounded-3xl bg-roomly-dark text-roomly-cream flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-white/10 mt-4">
        <div className="flex flex-col gap-1">
          <h4 className="font-display font-bold text-base text-white">
            Still need assistance?
          </h4>
          <p className="text-xs text-roomly-cream/70">
            Our building concierge and tenant care desks are available 7 days a week.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="tel:+918040120000"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-roomly-lime" />
            <span>Call Support</span>
          </a>
        </div>
      </div>
    </div>
  );
}
