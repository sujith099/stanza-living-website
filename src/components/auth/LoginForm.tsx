"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { AuthInput } from "./AuthInput";
import { SocialLogin } from "./SocialLogin";
import { OtpForm } from "./OtpForm";
import { RoomlyButton } from "@/components/ui/RoomlyButton";
import { cn } from "@/lib/utils";

export interface LoginFormProps {
  className?: string;
}

export function LoginForm({ className }: LoginFormProps) {
  const router = useRouter();

  // Mode: "identifier" | "password" | "otp"
  const [step, setStep] = useState<"identifier" | "password" | "otp">("identifier");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleIdentifierSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmed = identifier.trim();
    if (!trimmed) {
      setError("Please enter your email or phone number.");
      return;
    }

    // Basic format check
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
    const isPhone = /^\+?[\d\s-]{10,}$/.test(trimmed);

    if (!isEmail && !isPhone) {
      setError("Enter a valid email address or 10-digit phone number.");
      return;
    }

    setStep("password");
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    if (password.length < 6) {
      setError("That password doesn't look right.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/rooms");
    }, 600);
  };

  const handleOtpSuccess = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/rooms");
    }, 500);
  };

  if (step === "otp") {
    return (
      <OtpForm
        identifier={identifier}
        onSuccess={handleOtpSuccess}
        onBack={() => setStep("identifier")}
      />
    );
  }

  if (step === "password") {
    return (
      <form onSubmit={handlePasswordSubmit} className={cn("flex flex-col gap-6 w-full", className)}>
        <button
          type="button"
          onClick={() => {
            setStep("identifier");
            setError(null);
          }}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-roomly-muted hover:text-roomly-dark self-start transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Change phone or email</span>
        </button>

        <div className="flex flex-col gap-1.5">
          <h2 className="font-display font-black text-3xl sm:text-4xl text-roomly-dark">
            Enter your password.
          </h2>
          <p className="text-xs sm:text-sm text-roomly-muted">
            Logging in as <span className="font-semibold text-roomly-dark">{identifier}</span>
          </p>
        </div>

        <AuthInput
          label="Password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError(null);
          }}
          placeholder="Enter your password"
          error={error || undefined}
          autoFocus
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

        <div className="flex items-center justify-between text-xs">
          <button
            type="button"
            onClick={() => setStep("otp")}
            className="font-semibold text-roomly-green hover:underline cursor-pointer"
          >
            Use one-time code instead
          </button>

          <button
            type="button"
            onClick={() => alert("Password reset link sent to " + identifier)}
            className="text-roomly-muted hover:text-roomly-dark transition-colors cursor-pointer"
          >
            Forgot password?
          </button>
        </div>

        <RoomlyButton
          type="submit"
          variant="primary"
          size="lg"
          shape="pill"
          withArrow
          arrowStyle="circle"
          disabled={loading}
          className="w-full justify-center text-xs sm:text-sm font-semibold py-3.5"
        >
          {loading ? "Signing in..." : "Continue"}
        </RoomlyButton>
      </form>
    );
  }

  // Step 1: Identifier Entry
  return (
    <form onSubmit={handleIdentifierSubmit} className={cn("flex flex-col gap-6 w-full", className)}>
      <div className="flex flex-col gap-1.5">
        <h2 className="font-display font-black text-3xl sm:text-4xl text-roomly-dark">
          Welcome back.
        </h2>
        <p className="text-xs sm:text-sm text-roomly-muted">
          Your next room is still waiting.
        </p>
      </div>

      <AuthInput
        label="Email or Phone Number"
        type="text"
        value={identifier}
        onChange={(e) => {
          setIdentifier(e.target.value);
          setError(null);
        }}
        placeholder="name@work.com or 98765 43210"
        error={error || undefined}
        autoFocus
      />

      <RoomlyButton
        type="submit"
        variant="primary"
        size="lg"
        shape="pill"
        withArrow
        arrowStyle="circle"
        className="w-full justify-center text-xs sm:text-sm font-semibold py-3.5"
      >
        Continue
      </RoomlyButton>

      <SocialLogin />

      <div className="pt-2 text-center text-xs text-roomly-muted">
        <span>New to Stanza Living? </span>
        <Link
          href="/signup"
          className="font-bold text-roomly-dark hover:text-roomly-green underline underline-offset-2 transition-colors"
        >
          Create an account →
        </Link>
      </div>
    </form>
  );
}
