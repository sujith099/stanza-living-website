"use client";

import React, { useState } from "react";
import { ShieldCheck, X } from "lucide-react";
import { Property } from "@/data/properties";
import { RoomlyButton } from "@/components/ui/RoomlyButton";

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

  if (!isOpen) return null;

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
    onSuccess(
      `Room reserved! Welcome to ${property.name}. Confirmation sent to ${email || "your email"}.`
    );
  };

  const formattedDate = new Date(selectedDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm select-none">
      <div className="bg-[#FDFCF8] border border-roomly-border rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl flex flex-col gap-6">
        <div className="flex items-center justify-between pb-3 border-b border-roomly-border">
          <div className="flex flex-col">
            <h3 className="font-display font-bold text-lg text-roomly-dark">
              Reserve {property.name}
            </h3>
            <span className="text-xs text-roomly-muted">
              {property.roomType} · {property.neighbourhood}, {property.city}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-roomly-bg flex items-center justify-center text-roomly-dark hover:bg-roomly-border transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Summary Details */}
        <div className="p-4 rounded-2xl bg-roomly-bg border border-roomly-border flex flex-col gap-2 text-xs">
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
          <div className="flex justify-between items-center py-1">
            <span className="text-roomly-muted">Refundable security deposit</span>
            <span className="font-bold text-roomly-dark">
              ₹{property.deposit.toLocaleString("en-IN")}
            </span>
          </div>
        </div>

        <form onSubmit={handleConfirm} className="flex flex-col gap-4 text-xs">
          <div className="flex flex-col gap-1.5">
            <label className="font-semibold text-roomly-dark">Full name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Ananya Sharma"
              className="bg-roomly-bg border border-roomly-border rounded-xl p-2.5 text-xs text-roomly-dark focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-semibold text-roomly-dark">Email address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. ananya@company.com"
              className="bg-roomly-bg border border-roomly-border rounded-xl p-2.5 text-xs text-roomly-dark focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 text-[11px] text-roomly-muted">
            <ShieldCheck className="w-4 h-4 text-roomly-green flex-shrink-0" />
            <span>48-hour free cancellation policy before move-in.</span>
          </div>

          <div className="pt-2">
            <RoomlyButton
              type="submit"
              variant="primary"
              size="md"
              shape="pill"
              className="w-full justify-center text-xs font-semibold py-3"
            >
              Complete room reservation
            </RoomlyButton>
          </div>
        </form>
      </div>
    </div>
  );
}
