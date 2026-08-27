"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";
import { RoomlyButton } from "@/components/ui/RoomlyButton";
import { BackButton } from "@/components/ui/BackButton";
import { FadeIn } from "@/components/ui/FadeIn";
import { cn } from "@/lib/utils";

export default function DashboardPreferencesPage() {
  const [roomType, setRoomType] = useState("Private");
  const [budget, setBudget] = useState("₹18k – ₹25k");
  const [selectedLifestyle, setSelectedLifestyle] = useState([
    "Quiet hours",
    "Near metro",
    "Short office commute",
  ]);
  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
    push: false,
  });
  const [saved, setSaved] = useState(false);

  const toggleLifestyle = (tag: string) => {
    setSelectedLifestyle((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="flex flex-col gap-6 w-full select-none max-w-3xl">
      {/* Back to Dashboard */}
      <div>
        <BackButton label="Back to dashboard" fallback="/dashboard" />
      </div>

      {/* Header */}
      <FadeIn>
        <div>
          <h1 className="font-display font-black text-3xl text-roomly-dark">
            Living Preferences
          </h1>
          <p className="text-xs text-roomly-muted">
            Configure your lifestyle criteria, acoustic priorities, and notification channels
          </p>
        </div>
      </FadeIn>

      <div className="p-6 sm:p-8 rounded-3xl bg-[#FDFCF8] border border-roomly-border shadow-md flex flex-col gap-6">
        {/* Room Type */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-wider text-roomly-dark">
            Preferred Room Type
          </label>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {["Private", "Twin sharing", "Triple sharing"].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setRoomType(t)}
                className={cn(
                  "py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer",
                  roomType === t
                    ? "bg-roomly-dark text-roomly-lime border-roomly-dark font-bold shadow-xs"
                    : "bg-white text-roomly-dark border-roomly-border hover:bg-roomly-bg"
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Target Budget */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-wider text-roomly-dark">
            Target Monthly Budget
          </label>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {["₹8k – ₹12k", "₹12k – ₹18k", "₹18k – ₹25k"].map((b) => (
              <button
                key={b}
                type="button"
                onClick={() => setBudget(b)}
                className={cn(
                  "py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer",
                  budget === b
                    ? "bg-roomly-dark text-roomly-lime border-roomly-dark font-bold shadow-xs"
                    : "bg-white text-roomly-dark border-roomly-border hover:bg-roomly-bg"
                )}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        {/* Lifestyle Tags */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-wider text-roomly-dark">
            Living Routine & Amenities
          </label>
          <div className="flex flex-wrap gap-2">
            {[
              "Quiet hours",
              "Near metro",
              "Short office commute",
              "Social & community",
              "Power backup",
              "Terrace & natural light",
            ].map((tag) => {
              const isSelected = selectedLifestyle.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleLifestyle(tag)}
                  className={cn(
                    "px-3.5 py-2 rounded-full text-xs font-semibold transition-colors cursor-pointer border",
                    isSelected
                      ? "bg-roomly-dark text-roomly-lime border-roomly-dark"
                      : "bg-white text-roomly-dark border-roomly-border hover:bg-roomly-bg"
                  )}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        <div className="h-px w-full bg-roomly-border my-1" />

        {/* Notification Channels */}
        <div className="flex flex-col gap-3">
          <label className="text-xs font-bold uppercase tracking-wider text-roomly-dark">
            Notification Alerts
          </label>

          {(
            [
              { key: "email", label: "Email Notifications", desc: "Monthly invoices and agreement updates" },
              { key: "sms", label: "SMS & WhatsApp Alerts", desc: "Maintenance dispatch and visitor OTPs" },
              { key: "push", label: "Browser Push Notifications", desc: "Instant community chat replies" },
            ] as const
          ).map((item) => (
            <label
              key={item.key}
              className="flex items-center justify-between p-3.5 rounded-2xl bg-white border border-roomly-border cursor-pointer hover:bg-roomly-bg transition-colors"
            >
              <div className="flex flex-col">
                <span className="text-xs font-bold text-roomly-dark">
                  {item.label}
                </span>
                <span className="text-[11px] text-roomly-muted">
                  {item.desc}
                </span>
              </div>

              <input
                type="checkbox"
                checked={notifications[item.key]}
                onChange={(e) =>
                  setNotifications({
                    ...notifications,
                    [item.key]: e.target.checked,
                  })
                }
                className="w-4 h-4 accent-roomly-dark cursor-pointer"
              />
            </label>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-roomly-border">
          <RoomlyButton
            variant="primary"
            size="md"
            shape="pill"
            onClick={handleSave}
            className="text-xs font-semibold py-2.5 px-6"
          >
            Save preferences
          </RoomlyButton>

          {saved && (
            <span className="text-xs font-bold text-roomly-green flex items-center gap-1">
              <Check className="w-3.5 h-3.5" />
              <span>Saved</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
