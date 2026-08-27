"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SocialLoginProps {
  className?: string;
}

export function SocialLogin({ className }: SocialLoginProps) {
  const [toastVisible, setToastVisible] = useState(false);

  const handleGoogleClick = () => {
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3500);
  };

  return (
    <div className={cn("flex flex-col gap-4 w-full", className)}>
      <div className="relative flex items-center justify-center my-1">
        <div className="border-t border-roomly-border w-full" />
        <span className="bg-roomly-bg px-3 text-[10px] uppercase font-bold text-roomly-muted tracking-widest absolute">
          or
        </span>
      </div>

      <button
        type="button"
        onClick={handleGoogleClick}
        className="w-full py-3 px-4 rounded-2xl bg-white border border-roomly-border hover:border-roomly-dark text-xs sm:text-sm font-semibold text-roomly-dark flex items-center justify-center gap-3 transition-colors shadow-sm cursor-pointer"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
          />
          <path
            fill="#34A853"
            d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
          />
          <path
            fill="#FBBC05"
            d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
          />
          <path
            fill="#EA4335"
            d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
          />
        </svg>
        <span>Continue with Google</span>
      </button>

      {toastVisible && (
        <div className="p-3 rounded-xl bg-roomly-dark text-roomly-cream text-xs flex items-center gap-2 shadow-lg animate-in fade-in slide-in-from-top-1">
          <Check className="w-3.5 h-3.5 text-roomly-lime flex-shrink-0" />
          <span>Google sign-in will be connected when authentication is configured.</span>
        </div>
      )}
    </div>
  );
}
