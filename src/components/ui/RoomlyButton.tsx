"use client";

import React, { forwardRef } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface RoomlyButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "cream" | "green" | "lime" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  shape?: "pill" | "rounded";
  withArrow?: boolean;
  arrowStyle?: "classic" | "dot" | "circle";
  children: React.ReactNode;
}

export const RoomlyButton = forwardRef<HTMLButtonElement, RoomlyButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      shape = "pill",
      withArrow = false,
      arrowStyle = "classic",
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "group inline-flex items-center justify-center font-medium tracking-tight transition-all duration-300 select-none cursor-pointer disabled:opacity-50 disabled:pointer-events-none";

    const variantStyles = {
      primary:
        "bg-roomly-dark text-roomly-cream border border-roomly-dark hover:bg-roomly-green hover:border-roomly-green active:bg-roomly-dark",
      cream:
        "bg-roomly-cream text-roomly-dark border border-roomly-cream hover:bg-white hover:border-white shadow-sm",
      green:
        "bg-roomly-green text-roomly-cream border border-roomly-green hover:bg-roomly-dark hover:border-roomly-dark",
      lime:
        "bg-roomly-lime text-roomly-dark border border-roomly-lime hover:bg-roomly-green hover:text-roomly-cream hover:border-roomly-green font-semibold",
      outline:
        "bg-transparent text-roomly-dark border border-roomly-border hover:border-roomly-dark hover:bg-roomly-dark/5",
      ghost:
        "bg-transparent text-roomly-dark border border-transparent hover:bg-roomly-dark/5",
    };

    const sizeStyles = {
      sm: "text-xs px-3.5 py-1.5 gap-2",
      md: "text-sm px-5 py-2.5 gap-2.5",
      lg: "text-base px-7 py-3.5 gap-3",
    };

    const shapeStyles = {
      pill: "rounded-full",
      rounded: "rounded-md",
    };

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
        disabled={disabled}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          shapeStyles[shape],
          className
        )}
        {...props}
      >
        <span>{children}</span>

        {withArrow && arrowStyle === "classic" && (
          <ArrowRight
            className={cn(
              "transition-transform duration-300 ease-out group-hover:translate-x-1",
              size === "sm" ? "w-3.5 h-3.5" : size === "lg" ? "w-4.5 h-4.5" : "w-4 h-4"
            )}
          />
        )}

        {withArrow && arrowStyle === "circle" && (
          <span
            className={cn(
              "relative flex items-center justify-center rounded-full border transition-all duration-300 group-hover:translate-x-0.5",
              variant === "primary" || variant === "green"
                ? "border-roomly-cream/30 text-roomly-cream group-hover:border-roomly-cream"
                : "border-roomly-dark/30 text-roomly-dark group-hover:border-roomly-dark",
              size === "sm"
                ? "w-4 h-4 text-[9px]"
                : size === "lg"
                ? "w-6 h-6 text-xs"
                : "w-5 h-5 text-[10px]"
            )}
          >
            <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
        )}

        {withArrow && arrowStyle === "dot" && (
          <span
            className={cn(
              "w-1.5 h-1.5 rounded-full transition-all duration-300 group-hover:scale-150",
              variant === "primary" || variant === "green"
                ? "bg-roomly-lime"
                : variant === "lime"
                ? "bg-roomly-dark"
                : "bg-roomly-green"
            )}
          />
        )}
      </motion.button>
    );
  }
);

RoomlyButton.displayName = "RoomlyButton";

export const StanzaButton = RoomlyButton;
export type StanzaButtonProps = RoomlyButtonProps;
