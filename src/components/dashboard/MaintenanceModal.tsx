"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Wrench, Check } from "lucide-react";
import { RoomlyButton } from "@/components/ui/RoomlyButton";
import { ROOMLY_EASE } from "@/lib/animations";

export interface MaintenanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: (ticket: {
    category: string;
    title: string;
    description: string;
    priority: "Normal" | "Urgent";
  }) => void;
}

const CATEGORIES = [
  "AC",
  "Electrical",
  "Plumbing",
  "Wi-Fi",
  "Furniture",
  "Cleaning",
  "Other",
];

export function MaintenanceModal({
  isOpen,
  onClose,
  onSubmitSuccess,
}: MaintenanceModalProps) {
  const [category, setCategory] = useState("AC");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"Normal" | "Urgent">("Normal");
  const [submitted, setSubmitted] = useState(false);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onSubmitSuccess({ category, title, description, priority });
      setSubmitted(false);
      onClose();
    }, 1500);
  };

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="maintenance-title"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none"
      >
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
          className="relative w-full max-w-lg rounded-3xl bg-[#FDFCF8] border border-roomly-border shadow-xl p-6 sm:p-8 z-10 flex flex-col gap-6"
        >
          <div className="flex items-center justify-between border-b border-roomly-border pb-3">
            <div className="flex items-center gap-2">
              <Wrench className="w-4 h-4 text-roomly-green" />
              <span id="maintenance-title" className="font-display font-bold text-lg text-roomly-dark">
                New Home Request
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-full text-roomly-muted hover:text-roomly-dark cursor-pointer"
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
                Request submitted.
              </h4>
              <p className="text-xs text-roomly-muted max-w-xs">
                Ticket #REQ-2049 has been dispatched to the Oak House maintenance team.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Category selector */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-roomly-dark">
                  Category
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
                        category === cat
                          ? "bg-roomly-dark text-roomly-lime border-roomly-dark"
                          : "bg-white text-roomly-dark border-roomly-border hover:bg-roomly-bg"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Title */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold uppercase tracking-wider text-roomly-dark">
                  Brief Issue Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Bathroom faucet dripping"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-roomly-border text-xs text-roomly-dark focus:outline-none focus:border-roomly-dark"
                  required
                />
              </div>

              {/* Description */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold uppercase tracking-wider text-roomly-dark">
                  Detailed Description
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Explain where and when the issue occurs..."
                  className="w-full p-3 rounded-xl bg-white border border-roomly-border text-xs text-roomly-dark focus:outline-none focus:border-roomly-dark resize-none"
                  required
                />
              </div>

              {/* Priority */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold uppercase tracking-wider text-roomly-dark">
                  Urgency
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(["Normal", "Urgent"] as const).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPriority(p)}
                      className={`py-2 rounded-xl border text-xs font-semibold cursor-pointer transition-colors ${
                        priority === p
                          ? "bg-roomly-dark text-roomly-lime border-roomly-dark"
                          : "bg-white text-roomly-dark border-roomly-border"
                      }`}
                    >
                      {p} Priority
                    </button>
                  ))}
                </div>
              </div>

              <RoomlyButton
                type="submit"
                variant="primary"
                size="md"
                shape="pill"
                className="w-full justify-center text-xs font-semibold py-3 mt-2"
              >
                Submit request →
              </RoomlyButton>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
