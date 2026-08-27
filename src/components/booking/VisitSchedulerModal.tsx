"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Clock, Check } from "lucide-react";
import { VISIT_TIME_SLOTS } from "@/data/bookings";
import { RoomlyButton } from "@/components/ui/RoomlyButton";
import { ROOMLY_EASE } from "@/lib/animations";

export interface VisitSchedulerModalProps {
  propertyName: string;
  isOpen: boolean;
  onClose: () => void;
}

export function VisitSchedulerModal({
  propertyName,
  isOpen,
  onClose,
}: VisitSchedulerModalProps) {
  const [selectedSlot, setSelectedSlot] = useState(VISIT_TIME_SLOTS[1]);
  const [selectedDate, setSelectedDate] = useState("September 3, 2026");
  const [confirmed, setConfirmed] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmed(true);
    setTimeout(() => {
      setConfirmed(false);
      onClose();
    }, 2500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.25, ease: ROOMLY_EASE }}
          className="relative w-full max-w-lg rounded-3xl bg-[#FDFCF8] border border-roomly-border shadow-2xl p-6 sm:p-8 z-10 flex flex-col gap-6"
        >
          <div className="flex items-center justify-between border-b border-roomly-border pb-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-roomly-green" />
              <span className="font-display font-bold text-lg text-roomly-dark">
                Schedule a Visit · {propertyName}
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-full text-roomly-muted hover:text-roomly-dark"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {confirmed ? (
            <div className="py-8 flex flex-col items-center text-center gap-3">
              <div className="w-12 h-12 rounded-full bg-roomly-green text-white flex items-center justify-center">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="font-display font-bold text-xl text-roomly-dark">
                Visit Requested
              </h4>
              <p className="text-xs text-roomly-muted max-w-xs">
                {propertyName} · {selectedDate} at {selectedSlot}. We&apos;ll confirm your building host shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleConfirm} className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-roomly-dark">
                  Target Visit Date
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {["September 2", "September 3", "September 4"].map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setSelectedDate(`${d}, 2026`)}
                      className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                        selectedDate.startsWith(d)
                          ? "bg-roomly-dark text-roomly-lime border-roomly-dark shadow"
                          : "bg-white text-roomly-dark border-roomly-border hover:bg-roomly-bg"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-roomly-dark">
                  Available Time Slot
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {VISIT_TIME_SLOTS.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                        selectedSlot === slot
                          ? "bg-roomly-dark text-roomly-lime border-roomly-dark shadow"
                          : "bg-white text-roomly-dark border-roomly-border hover:bg-roomly-bg"
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5" />
                      <span>{slot}</span>
                    </button>
                  ))}
                </div>
              </div>

              <RoomlyButton
                type="submit"
                variant="primary"
                size="md"
                shape="pill"
                className="w-full justify-center text-xs font-semibold py-3"
              >
                Confirm visit slot →
              </RoomlyButton>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
