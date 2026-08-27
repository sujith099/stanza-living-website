"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Check } from "lucide-react";
import { ROOMLY_EASE } from "@/lib/animations";

export interface ToastProps {
  message: string | null;
  onClose?: () => void;
}

export function Toast({ message }: ToastProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-none">
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.3, ease: ROOMLY_EASE }}
            className="flex items-center gap-2.5 bg-roomly-dark text-roomly-cream border border-white/15 px-4 py-2.5 rounded-full shadow-xl pointer-events-auto"
          >
            <div className="w-5 h-5 rounded-full bg-roomly-lime flex items-center justify-center text-roomly-dark flex-shrink-0">
              <Check className="w-3 h-3 stroke-[3]" />
            </div>
            <span className="text-xs font-medium tracking-tight pr-1">
              {message}
            </span>
            <Heart className="w-3.5 h-3.5 fill-roomly-coral text-roomly-coral flex-shrink-0" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
