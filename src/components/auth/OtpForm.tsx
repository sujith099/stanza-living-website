"use client";

import React, { useState, useEffect, useRef } from "react";
import { RoomlyButton } from "@/components/ui/RoomlyButton";
import { ArrowLeft, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export interface OtpFormProps {
  identifier: string;
  onSuccess: () => void;
  onBack: () => void;
  className?: string;
}

export function OtpForm({
  identifier,
  onSuccess,
  onBack,
  className,
}: OtpFormProps) {
  const [digits, setDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const [secondsLeft, setSecondsLeft] = useState(120);
  const [error, setError] = useState<string | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const interval = setInterval(() => {
      setSecondsLeft((s) => s - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [secondsLeft]);

  const formatTimer = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (totalSeconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleDigitChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }

    const nextDigits = [...digits];
    nextDigits[index] = value;
    setDigits(nextDigits);
    setError(null);

    // Auto advance focus
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const code = digits.join("");

    if (code.length < 6) {
      setError("Please enter all 6 digits.");
      return;
    }

    // Demo code: any 6 digits work, but if all zeros simulate error for testing
    if (code === "000000") {
      setError("That code isn't correct. Try again.");
      return;
    }

    onSuccess();
  };

  const handleResend = () => {
    setDigits(["", "", "", "", "", ""]);
    setSecondsLeft(120);
    setError(null);
    inputRefs.current[0]?.focus();
  };

  return (
    <form
      onSubmit={handleVerify}
      className={cn("flex flex-col gap-6 w-full select-none", className)}
    >
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-roomly-muted hover:text-roomly-dark self-start transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Change phone or email</span>
      </button>

      <div className="flex flex-col gap-1.5">
        <h2 className="font-display font-black text-3xl sm:text-4xl text-roomly-dark">
          Check your phone.
        </h2>
        <p className="text-xs sm:text-sm text-roomly-muted">
          We sent a 6-digit code to{" "}
          <span className="font-semibold text-roomly-dark">{identifier}</span>.
        </p>
      </div>

      {/* 6 Individual Inputs */}
      <div className="flex items-center justify-between gap-2 sm:gap-2.5">
        {digits.map((digit, idx) => (
          <input
            key={idx}
            ref={(el) => {
              inputRefs.current[idx] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleDigitChange(idx, e.target.value)}
            onKeyDown={(e) => handleKeyDown(idx, e)}
            className="w-11 h-13 sm:w-13 sm:h-15 text-center font-display font-black text-xl sm:text-2xl rounded-2xl bg-white border border-roomly-border focus:border-roomly-dark focus:ring-2 focus:ring-roomly-dark/10 outline-none transition-all"
            autoFocus={idx === 0}
          />
        ))}
      </div>

      {/* Error Message */}
      {error && (
        <span className="text-xs font-semibold text-roomly-coral">
          {error}
        </span>
      )}

      {/* Timer & Resend */}
      <div className="flex items-center justify-between text-xs text-roomly-muted">
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" />
          <span>Code expires in {formatTimer(secondsLeft)}</span>
        </div>

        <button
          type="button"
          onClick={handleResend}
          disabled={secondsLeft > 0}
          className={cn(
            "font-semibold transition-colors cursor-pointer",
            secondsLeft > 0
              ? "opacity-50 cursor-not-allowed"
              : "text-roomly-green hover:underline"
          )}
        >
          Resend code
        </button>
      </div>

      {/* Submit Button */}
      <RoomlyButton
        type="submit"
        variant="primary"
        size="lg"
        shape="pill"
        withArrow
        arrowStyle="circle"
        className="w-full justify-center text-xs sm:text-sm font-semibold py-3.5"
      >
        Verify & Continue
      </RoomlyButton>
    </form>
  );
}
