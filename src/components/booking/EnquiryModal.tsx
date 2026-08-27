"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageSquare, Check } from "lucide-react";
import { ENQUIRY_CATEGORIES } from "@/data/bookings";
import { RoomlyButton } from "@/components/ui/RoomlyButton";
import { ROOMLY_EASE } from "@/lib/animations";

export interface EnquiryModalProps {
  propertyName: string;
  isOpen: boolean;
  onClose: () => void;
}

export function EnquiryModal({
  propertyName,
  isOpen,
  onClose,
}: EnquiryModalProps) {
  const [selectedCat, setSelectedCat] = useState(ENQUIRY_CATEGORIES[0]);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
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
              <MessageSquare className="w-4 h-4 text-roomly-green" />
              <span className="font-display font-bold text-lg text-roomly-dark">
                Send an Enquiry · {propertyName}
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

          {submitted ? (
            <div className="py-8 flex flex-col items-center text-center gap-3">
              <div className="w-12 h-12 rounded-full bg-roomly-green text-white flex items-center justify-center">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="font-display font-bold text-xl text-roomly-dark">
                Your enquiry has been sent.
              </h4>
              <p className="text-xs text-roomly-muted max-w-xs">
                The on-site property team for {propertyName} will reply via email or phone within 2 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-roomly-dark">
                  What would you like to know?
                </label>
                <div className="flex flex-col gap-2">
                  {ENQUIRY_CATEGORIES.map((cat) => (
                    <label
                      key={cat}
                      className="flex items-center gap-2.5 p-3 rounded-xl border border-roomly-border bg-white text-xs cursor-pointer hover:bg-roomly-bg transition-colors"
                    >
                      <input
                        type="radio"
                        name="enquiryCat"
                        checked={selectedCat === cat}
                        onChange={() => setSelectedCat(cat)}
                        className="accent-roomly-dark"
                      />
                      <span className="text-roomly-dark font-medium">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-roomly-dark">
                  Your question or note
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask about move-in flexibility, parking spots, or deposit terms..."
                  className="w-full p-3 rounded-2xl bg-white border border-roomly-border text-xs text-roomly-dark placeholder:text-roomly-muted/60 focus:outline-none focus:border-roomly-dark resize-none"
                  required
                />
              </div>

              <RoomlyButton
                type="submit"
                variant="primary"
                size="md"
                shape="pill"
                className="w-full justify-center text-xs font-semibold py-3"
              >
                Send enquiry →
              </RoomlyButton>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
