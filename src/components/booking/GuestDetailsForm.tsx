"use client";

import React from "react";
import { GuestDetails } from "@/data/bookings";
import { AuthInput } from "@/components/auth/AuthInput";
import { cn } from "@/lib/utils";

export interface GuestDetailsFormProps {
  details: GuestDetails;
  onChange: (details: GuestDetails) => void;
  errors?: Record<string, string>;
  className?: string;
}

export function GuestDetailsForm({
  details,
  onChange,
  errors = {},
  className,
}: GuestDetailsFormProps) {
  const occupations = [
    "Working professional",
    "Student",
    "Other",
  ] as const;

  return (
    <div className={cn("flex flex-col gap-6 w-full select-none", className)}>
      <div className="flex flex-col gap-1">
        <h3 className="font-display font-bold text-xl sm:text-2xl text-roomly-dark">
          Tell us a little about you.
        </h3>
        <p className="text-xs text-roomly-muted">
          Your lease agreement and building access PIN will be issued under these details.
        </p>
      </div>

      <div className="p-6 sm:p-7 rounded-3xl bg-[#FDFCF8] border border-roomly-border shadow-sm flex flex-col gap-5">
        {/* Full Name */}
        <AuthInput
          label="Full Legal Name"
          type="text"
          value={details.fullName}
          onChange={(e) => onChange({ ...details, fullName: e.target.value })}
          placeholder="Meera Sharma"
          error={errors.fullName}
          required
        />

        {/* Contact info grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <AuthInput
            label="Email Address"
            type="email"
            value={details.email}
            onChange={(e) => onChange({ ...details, email: e.target.value })}
            placeholder="meera@work.com"
            error={errors.email}
            required
          />

          <AuthInput
            label="Phone Number"
            type="tel"
            value={details.phone}
            onChange={(e) => onChange({ ...details, phone: e.target.value })}
            placeholder="+91 98765 43210"
            error={errors.phone}
            required
          />
        </div>

        {/* Occupation selector */}
        <div className="flex flex-col gap-2 pt-1">
          <label className="text-xs font-bold uppercase tracking-wider text-roomly-dark">
            Current Occupation
          </label>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {occupations.map((occ) => {
              const isSelected = details.occupation === occ;
              return (
                <button
                  key={occ}
                  type="button"
                  onClick={() => onChange({ ...details, occupation: occ })}
                  className={cn(
                    "py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer truncate",
                    isSelected
                      ? "bg-roomly-dark text-roomly-lime border-roomly-dark shadow-sm font-bold"
                      : "bg-roomly-bg text-roomly-dark border-roomly-border hover:bg-roomly-cream/40"
                  )}
                >
                  {occ}
                </button>
              );
            })}
          </div>
        </div>

        {/* Workplace / College */}
        <AuthInput
          label="Workplace or University (Optional)"
          type="text"
          value={details.workplaceOrCollege || ""}
          onChange={(e) =>
            onChange({ ...details, workplaceOrCollege: e.target.value })
          }
          placeholder="e.g. Swiggy, Google, Christ University..."
        />
      </div>
    </div>
  );
}
