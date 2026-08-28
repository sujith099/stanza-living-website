"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { AuthInput } from "./AuthInput";
import { SocialLogin } from "./SocialLogin";
import { AccountTypeSelector } from "./AccountTypeSelector";
import { RoomlyButton } from "@/components/ui/RoomlyButton";
import { cn } from "@/lib/utils";

export interface SignupFormProps {
  className?: string;
}

export function SignupForm({ className }: SignupFormProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCreated, setIsCreated] = useState(false);

  // Password requirements
  const hasMinLength = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!firstName.trim() || !lastName.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }

    if (phone.replace(/\D/g, "").length < 10) {
      setError("Enter a valid 10-digit mobile number.");
      return;
    }

    if (!hasMinLength || !hasNumber || !hasSpecial) {
      setError("Please satisfy all password security criteria.");
      return;
    }

    setIsCreated(true);
  };

  if (isCreated) {
    return <AccountTypeSelector userName={firstName} />;
  }

  return (
    <form onSubmit={handleSubmit} className={cn("flex flex-col gap-5 w-full", className)}>
      <div className="flex flex-col gap-1.5">
        <h2 className="font-display font-black text-3xl sm:text-4xl text-roomly-dark">
          Let&apos;s get you started.
        </h2>
        <p className="text-xs sm:text-sm text-roomly-muted">
          Tell us a little about yourself so Stanza Living can find better matches.
        </p>
      </div>

      {/* First & Last Name */}
      <div className="grid grid-cols-2 gap-3">
        <AuthInput
          label="First Name"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Meera"
          required
        />
        <AuthInput
          label="Last Name"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Sharma"
          required
        />
      </div>

      {/* Email */}
      <AuthInput
        label="Email Address"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="meera@work.com"
        required
      />

      {/* Phone */}
      <AuthInput
        label="Phone Number"
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="+91 98765 43210"
        required
      />

      {/* Password */}
      <div className="flex flex-col gap-2">
        <AuthInput
          label="Password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Create a strong password"
          rightElement={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="p-1 text-roomly-muted hover:text-roomly-dark"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          }
        />

        {/* Live Password Requirements Checklist */}
        <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px]">
          <div
            className={cn(
              "flex items-center gap-1 transition-colors",
              hasMinLength ? "text-roomly-green font-semibold" : "text-roomly-muted"
            )}
          >
            <span
              className={cn(
                "w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px]",
                hasMinLength ? "bg-roomly-green text-white" : "border border-roomly-border"
              )}
            >
              {hasMinLength ? "✓" : "○"}
            </span>
            <span>8+ characters</span>
          </div>

          <div
            className={cn(
              "flex items-center gap-1 transition-colors",
              hasNumber ? "text-roomly-green font-semibold" : "text-roomly-muted"
            )}
          >
            <span
              className={cn(
                "w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px]",
                hasNumber ? "bg-roomly-green text-white" : "border border-roomly-border"
              )}
            >
              {hasNumber ? "✓" : "○"}
            </span>
            <span>1 number</span>
          </div>

          <div
            className={cn(
              "flex items-center gap-1 transition-colors",
              hasSpecial ? "text-roomly-green font-semibold" : "text-roomly-muted"
            )}
          >
            <span
              className={cn(
                "w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px]",
                hasSpecial ? "bg-roomly-green text-white" : "border border-roomly-border"
              )}
            >
              {hasSpecial ? "✓" : "○"}
            </span>
            <span>1 symbol</span>
          </div>
        </div>
      </div>

      {/* Global Error Banner */}
      {error && (
        <span className="text-xs font-semibold text-roomly-coral">
          {error}
        </span>
      )}

      {/* Submit Button */}
      <RoomlyButton
        type="submit"
        variant="primary"
        size="lg"
        shape="pill"
        withArrow
        arrowStyle="circle"
        className="w-full justify-center text-xs sm:text-sm font-semibold py-3.5 mt-1"
      >
        Create account
      </RoomlyButton>

      <SocialLogin />

      {/* Terms & Privacy */}
      <p className="text-[11px] text-roomly-muted/80 text-center leading-relaxed">
        By creating an account, you agree to Stanza Living&apos;s{" "}
        <span className="underline cursor-pointer hover:text-roomly-dark">Terms of Service</span> and{" "}
        <span className="underline cursor-pointer hover:text-roomly-dark">Privacy Policy</span>.
      </p>

      {/* Sign In Link */}
      <div className="pt-1 text-center text-xs text-roomly-muted">
        <span>Already have an account? </span>
        <Link
          href="/login"
          className="font-bold text-roomly-dark hover:text-roomly-green underline underline-offset-2 transition-colors"
        >
          Sign in →
        </Link>
      </div>
    </form>
  );
}
