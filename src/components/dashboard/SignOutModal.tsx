"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut } from "lucide-react";
import { RoomlyButton } from "@/components/ui/RoomlyButton";
import { ROOMLY_EASE } from "@/lib/animations";

export interface SignOutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SignOutModal({ isOpen, onClose }: SignOutModalProps) {
  const router = useRouter();

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const handleSignOut = () => {
    onClose();
    router.push("/login");
  };

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="signout-title"
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
          className="relative w-full max-w-sm rounded-3xl bg-[#FDFCF8] border border-roomly-border shadow-xl p-6 z-10 flex flex-col items-center text-center gap-4"
        >
          <div className="w-12 h-12 rounded-full bg-roomly-coral/15 text-roomly-coral flex items-center justify-center">
            <LogOut className="w-6 h-6" />
          </div>

          <div className="flex flex-col gap-1">
            <h4 id="signout-title" className="font-display font-bold text-xl text-roomly-dark">
              Sign out of Stanza Living?
            </h4>
            <p className="text-xs text-roomly-muted">
              You will need your mobile number or email to log back in.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 w-full pt-2">
            <button
              type="button"
              onClick={onClose}
              className="py-2.5 rounded-full border border-roomly-border text-xs font-semibold text-roomly-dark hover:bg-roomly-bg transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <RoomlyButton
              type="button"
              variant="primary"
              size="sm"
              shape="pill"
              onClick={handleSignOut}
              className="justify-center text-xs font-semibold py-2.5 bg-roomly-coral hover:bg-roomly-coral/90 text-white"
            >
              Sign out
            </RoomlyButton>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
