"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface AuthInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  rightElement?: React.ReactNode;
}

export const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  ({ label, error, rightElement, className, id, ...props }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5 w-full">
        <label
          htmlFor={inputId}
          className="text-xs font-bold uppercase tracking-wider text-roomly-dark"
        >
          {label}
        </label>

        <div className="relative flex items-center">
          <input
            id={inputId}
            ref={ref}
            className={cn(
              "w-full px-4 py-3 rounded-2xl bg-white border text-sm text-roomly-dark placeholder:text-roomly-muted/60 transition-all outline-none",
              error
                ? "border-roomly-coral focus:ring-2 focus:ring-roomly-coral/30"
                : "border-roomly-border focus:border-roomly-dark focus:ring-2 focus:ring-roomly-dark/10",
              rightElement && "pr-11",
              className
            )}
            {...props}
          />

          {rightElement && (
            <div className="absolute right-3.5 flex items-center text-roomly-muted hover:text-roomly-dark transition-colors">
              {rightElement}
            </div>
          )}
        </div>

        {error && (
          <span className="text-[11px] font-medium text-roomly-coral">
            {error}
          </span>
        )}
      </div>
    );
  }
);

AuthInput.displayName = "AuthInput";
