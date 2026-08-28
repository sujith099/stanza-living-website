"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StanzaSelectOption {
  value: string;
  label: string;
  subLabel?: string;
  disabled?: boolean;
}

export interface StanzaSelectProps {
  options: StanzaSelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  fieldLabel?: string;
  id?: string;
  name?: string;
  disabled?: boolean;
  error?: string;
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
  shape?: "rounded" | "pill";
  size?: "sm" | "md" | "lg";
  align?: "start" | "center" | "end";
  prefix?: React.ReactNode;
  searchable?: boolean;
  searchPlaceholder?: string;
  emptyText?: string;
}

export function StanzaSelect({
  options,
  value,
  defaultValue,
  onChange,
  placeholder = "Select an option",
  label,
  fieldLabel,
  id,
  name,
  disabled = false,
  error,
  className,
  triggerClassName,
  contentClassName,
  shape = "rounded",
  size = "md",
  align = "start",
  prefix,
  searchable = false,
  searchPlaceholder = "Search...",
  emptyText = "No results found.",
}: StanzaSelectProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSearchQuery("");
  }, [options]);

  useEffect(() => {
    if (isOpen && searchable) {
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [isOpen, searchable]);

  const filteredOptions = useMemo(() => {
    if (!searchable || !searchQuery.trim()) return options;
    const q = searchQuery.toLowerCase().trim();
    return options.filter((o) => o.label.toLowerCase().includes(q));
  }, [options, searchQuery, searchable]);

  const sizeClasses = {
    sm: "h-9 px-3 text-xs gap-1.5",
    md: "h-11 px-3.5 text-xs sm:text-sm gap-2",
    lg: "h-12 px-4 text-sm gap-2.5",
  };

  const shapeClasses = {
    rounded: "rounded-xl",
    pill: "rounded-full",
  };

  return (
    <div className={cn("flex flex-col gap-1.5 text-left select-none", className)}>
      {label && (
        <label
          htmlFor={id}
          className="text-[11px] uppercase tracking-wider font-bold text-roomly-muted"
        >
          {label}
        </label>
      )}

      <SelectPrimitive.Root
        value={value}
        defaultValue={defaultValue}
        onValueChange={(val) => {
          onChange?.(val);
          if (searchable) {
            setIsOpen(false);
          }
        }}
        disabled={disabled}
        name={name}
        open={searchable ? isOpen : undefined}
        onOpenChange={searchable ? setIsOpen : undefined}
      >
        <SelectPrimitive.Trigger
          id={id}
          className={cn(
            "group inline-flex items-center justify-between bg-[#FDFCF8] border border-roomly-border text-roomly-dark shadow-xs",
            "transition-all duration-150 cursor-pointer",
            "hover:border-roomly-dark/60 hover:bg-white",
            "focus:outline-none focus:ring-2 focus:ring-roomly-green/20 focus:border-roomly-green",
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-roomly-border",
            error && "border-roomly-coral focus:border-roomly-coral focus:ring-roomly-coral/20",
            sizeClasses[size],
            shapeClasses[shape],
            triggerClassName
          )}
          aria-label={fieldLabel || label || placeholder}
        >
          {fieldLabel ? (
            <div className="flex flex-col text-left flex-1 min-w-0 pointer-events-none">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-roomly-muted select-none">
                {fieldLabel}
              </span>
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2 truncate flex-1 mr-1 text-left font-semibold">
                  {prefix && <span className="text-roomly-muted flex-shrink-0">{prefix}</span>}
                  <SelectPrimitive.Value placeholder={placeholder} />
                </div>
                <SelectPrimitive.Icon asChild>
                  <ChevronDown className="w-3.5 h-3.5 text-roomly-muted group-data-[state=open]:rotate-180 transition-transform duration-200 flex-shrink-0" />
                </SelectPrimitive.Icon>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 truncate flex-1 mr-1 text-left">
                {prefix && <span className="text-roomly-muted flex-shrink-0">{prefix}</span>}
                <SelectPrimitive.Value placeholder={placeholder} />
              </div>

              <SelectPrimitive.Icon asChild>
                <ChevronDown className="w-3.5 h-3.5 text-roomly-muted group-data-[state=open]:rotate-180 transition-transform duration-200 flex-shrink-0" />
              </SelectPrimitive.Icon>
            </>
          )}
        </SelectPrimitive.Trigger>

        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            position="popper"
            align={align}
            sideOffset={6}
            className={cn(
              "z-50 min-w-[12rem] max-h-[22rem] overflow-hidden rounded-2xl bg-[#FDFCF8] border border-roomly-border shadow-xl",
              "p-1.5 text-roomly-dark select-none",
              "data-[state=open]:animate-in data-[state=closed]:animate-out",
              "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
              "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
              "data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2",
              contentClassName
            )}
          >
            {searchable && (
              <div
                className="px-2 pt-2 pb-1"
                onPointerDown={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-roomly-muted pointer-events-none" />
                  <input
                    ref={inputRef}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={searchPlaceholder}
                    className="w-full h-10 pl-8 pr-8 rounded-lg border border-roomly-border bg-white text-sm text-roomly-dark placeholder:text-roomly-muted focus:outline-none focus:ring-2 focus:ring-roomly-green/20 focus:border-roomly-green"
                    onKeyDown={(e) => {
                      e.stopPropagation();
                      if (e.key === "ArrowDown") {
                        e.preventDefault();
                        const firstItem = document.querySelector(
                          "[data-radix-select-item]"
                        );
                        (firstItem as HTMLElement | null)?.focus();
                      } else if (e.key === "Escape") {
                        setIsOpen(false);
                      }
                    }}
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery("");
                        inputRef.current?.focus();
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-5 h-5 rounded-full hover:bg-roomly-bg text-roomly-muted hover:text-roomly-dark transition-colors"
                      aria-label="Clear search"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            )}

            <SelectPrimitive.Viewport className="p-0.5 space-y-0.5">
              {filteredOptions.length === 0 ? (
                <div className="py-3 px-3 text-xs text-roomly-muted text-center">
                  {emptyText}
                </div>
              ) : (
                filteredOptions.map((option) => (
                  <SelectPrimitive.Item
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                    className={cn(
                      "relative flex items-center justify-between w-full py-2.5 px-3 rounded-xl text-xs sm:text-sm font-medium",
                      "cursor-pointer outline-none transition-colors duration-150",
                      "data-[highlighted]:bg-roomly-green/10 data-[highlighted]:text-roomly-dark",
                      "data-[state=checked]:bg-roomly-green/12 data-[state=checked]:text-roomly-green data-[state=checked]:font-semibold",
                      "data-[disabled]:opacity-40 data-[disabled]:cursor-not-allowed"
                    )}
                    onKeyDown={(e) => {
                      if (searchable && /^[a-zA-Z0-9 ]$/.test(e.key) && e.key.length === 1) {
                        e.preventDefault();
                        setSearchQuery((q) => q + e.key);
                        inputRef.current?.focus();
                      }
                    }}
                  >
                    <div className="flex flex-col pr-4 text-left">
                      <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
                      {option.subLabel && (
                        <span className="text-[11px] text-roomly-muted font-normal mt-0.5">
                          {option.subLabel}
                        </span>
                      )}
                    </div>

                    <SelectPrimitive.ItemIndicator className="flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-roomly-green" />
                    </SelectPrimitive.ItemIndicator>
                  </SelectPrimitive.Item>
                ))
              )}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>

      {error && <span className="text-xs text-roomly-coral">{error}</span>}
    </div>
  );
}
