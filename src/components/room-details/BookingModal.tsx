"use client";

import React, { useState, useEffect } from "react";
import { ShieldCheck, X } from "lucide-react";
import { Property } from "@/data/properties";
import { RoomlyButton } from "@/components/ui/RoomlyButton";
import { cn } from "@/lib/utils";

export interface BookingModalProps {
  property: Property;
  selectedDate: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (msg: string) => void;
}

export function BookingModal({
  property,
  selectedDate,
  isOpen,
  onClose,
  onSuccess,
}: BookingModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setName("");
      setEmail("");
      setErrors({});
      setIsSubmitting(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const formattedDate = new Date(selectedDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { name?: string; email?: string } = {};

    if (!name.trim()) {
      newErrors.name = "Please enter your full name.";
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    setTimeout(() => {
      onClose();
      onSuccess(
        `Room reserved! Welcome to ${property.name}. Confirmation sent to ${email || "your email"}.`
      );
      setIsSubmitting(false);
    }, 800);
  };

  const meals = property.meals;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm select-none">
      <div
        className={cn(
          "bg-[#FDFCF8] border border-roomly-border rounded-3xl w-full flex flex-col",
          "max-h-[calc(100dvh-24px)] sm:max-h-[calc(100dvh-48px)] sm:max-w-lg",
          "shadow-2xl"
        )}
      >
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-roomly-border flex-shrink-0">
          <div className="flex flex-col">
            <h3 className="font-display font-bold text-base sm:text-lg text-roomly-dark">
              Reserve {property.name}
            </h3>
            <span className="text-[11px] sm:text-xs text-roomly-muted">
              {property.roomType} · {property.neighbourhood}, {property.city}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 sm:w-8 sm:h-8 rounded-full bg-roomly-bg flex items-center justify-center text-roomly-dark hover:bg-roomly-border transition-colors cursor-pointer flex-shrink-0"
          >
            <X className="w-5 h-5 sm:w-4 sm:h-4" />
          </button>
        </div>

        <div className="p-4 sm:p-6 overflow-y-auto">
          {/* Summary Details */}
          <div className="p-4 rounded-2xl bg-roomly-bg border border-roomly-border flex flex-col gap-2 text-xs mb-5">
            <div className="flex justify-between items-center py-1 border-b border-roomly-border/60">
              <span className="text-roomly-muted">Move-in date</span>
              <span className="font-semibold text-roomly-green">{formattedDate}</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-roomly-border/60">
              <span className="text-roomly-muted">Monthly rent (all-inclusive)</span>
              <span className="font-bold text-roomly-dark">
                ₹{property.rent.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-roomly-border/60">
              <span className="text-roomly-muted">Security deposit</span>
              <span className="font-bold text-roomly-dark">
                ₹{property.deposit.toLocaleString("en-IN")}
              </span>
            </div>
            {meals && meals.included && (
              <div className="flex justify-between items-center py-1">
                <span className="text-roomly-muted">Chef-prepared meals</span>
                <span className="font-semibold text-roomly-green">Included</span>
              </div>
            )}
          </div>

          <form onSubmit={handleConfirm} className="flex flex-col gap-4 text-xs">
            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-roomly-dark">Full name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ananya Sharma"
                className={cn(
                  "bg-roomly-bg border rounded-xl p-3 text-sm text-roomly-dark focus:outline-none",
                  errors.name
                    ? "border-roomly-coral focus:ring-2 focus:ring-roomly-coral/20"
                    : "border-roomly-border focus:ring-2 focus:ring-roomly-green/20 focus:border-roomly-green"
                )}
              />
              {errors.name && (
                <span className="text-[11px] text-roomly-coral font-medium">{errors.name}</span>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-roomly-dark">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. ananya@company.com"
                className={cn(
                  "bg-roomly-bg border rounded-xl p-3 text-sm text-roomly-dark focus:outline-none",
                  errors.email
                    ? "border-roomly-coral focus:ring-2 focus:ring-roomly-coral/20"
                    : "border-roomly-border focus:ring-2 focus:ring-roomly-green/20 focus:border-roomly-green"
                )}
              />
              {errors.email && (
                <span className="text-[11px] text-roomly-coral font-medium">{errors.email}</span>
              )}
            </div>

            <div className="flex items-center gap-2 text-[11px] text-roomly-muted">
              <ShieldCheck className="w-4 h-4 text-roomly-green flex-shrink-0" />
              <span>48-hour free cancellation policy before move-in.</span>
            </div>

            <div className="pt-1">
              <RoomlyButton
                type="submit"
                variant="primary"
                size="md"
                shape="pill"
                disabled={isSubmitting}
                className="w-full justify-center text-sm font-semibold py-3.5 sm:py-3"
              >
                {isSubmitting ? "Reserving..." : "Complete room reservation"}
              </RoomlyButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
