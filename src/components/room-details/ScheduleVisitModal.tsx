"use client";

import React, { useState } from "react";
import { Calendar, Clock, X } from "lucide-react";
import { Property } from "@/data/properties";
import { RoomlyButton } from "@/components/ui/RoomlyButton";

export interface ScheduleVisitModalProps {
  property: Property;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (msg: string) => void;
}

export function ScheduleVisitModal({
  property,
  isOpen,
  onClose,
  onSuccess,
}: ScheduleVisitModalProps) {
  const [selectedSlot, setSelectedSlot] = useState("11:00 AM");
  const [selectedDay, setSelectedDay] = useState("Tomorrow (Saturday)");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
    onSuccess(
      `Private visit scheduled at ${property.name} for ${selectedDay} at ${selectedSlot}.`
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm select-none">
      <div className="bg-[#FDFCF8] border border-roomly-border rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl flex flex-col gap-6">
        <div className="flex items-center justify-between pb-3 border-b border-roomly-border">
          <div className="flex flex-col">
            <h3 className="font-display font-bold text-lg text-roomly-dark">
              Schedule a private visit
            </h3>
            <span className="text-xs text-roomly-muted">
              Tour {property.name} in {property.neighbourhood}
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

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-xs">
          {/* Day selection */}
          <div className="flex flex-col gap-1.5">
            <label className="font-semibold text-roomly-dark flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-roomly-green" />
              <span>Select day</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {["Today", "Tomorrow (Saturday)", "Sunday", "Monday"].map((day) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => setSelectedDay(day)}
                  className={`p-2.5 rounded-xl border text-left font-medium transition-colors ${
                    selectedDay === day
                      ? "bg-roomly-dark text-roomly-lime border-roomly-dark"
                      : "bg-white text-roomly-dark border-roomly-border hover:bg-roomly-bg"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          {/* Time slot */}
          <div className="flex flex-col gap-1.5">
            <label className="font-semibold text-roomly-dark flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-roomly-green" />
              <span>Preferred time slot</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {["11:00 AM", "02:30 PM", "05:00 PM"].map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setSelectedSlot(slot)}
                  className={`py-2 px-1 rounded-xl border text-center font-medium transition-colors ${
                    selectedSlot === slot
                      ? "bg-roomly-dark text-roomly-lime border-roomly-dark"
                      : "bg-white text-roomly-dark border-roomly-border hover:bg-roomly-bg"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Contact inputs */}
          <div className="flex flex-col gap-1.5 pt-2">
            <label className="font-semibold text-roomly-dark">Your name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Siddharth Verma"
              className="bg-roomly-bg border border-roomly-border rounded-xl p-2.5 text-xs text-roomly-dark focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-semibold text-roomly-dark">Mobile number</label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98765 43210"
              className="bg-roomly-bg border border-roomly-border rounded-xl p-2.5 text-xs text-roomly-dark focus:outline-none"
            />
          </div>

          <div className="pt-3">
            <RoomlyButton
              type="submit"
              variant="lime"
              size="md"
              shape="pill"
              className="w-full justify-center text-xs font-semibold"
            >
              Confirm visit appointment
            </RoomlyButton>
          </div>
        </form>
      </div>
    </div>
  );
}
