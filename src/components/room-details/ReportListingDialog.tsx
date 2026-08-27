"use client";

import React, { useState } from "react";
import { Flag, X } from "lucide-react";
import { StanzaSelect, StanzaSelectOption } from "@/components/ui/StanzaSelect";
import { cn } from "@/lib/utils";

const REPORT_REASONS: StanzaSelectOption[] = [
  { value: "Incorrect information", label: "Incorrect information" },
  { value: "Wrong photos", label: "Wrong photos" },
  { value: "Property unavailable", label: "Property unavailable" },
  { value: "Pricing issue", label: "Pricing issue" },
  { value: "Other", label: "Other reason" },
];

export interface ReportListingDialogProps {
  propertyName: string;
  onToast: (msg: string) => void;
  className?: string;
}

export function ReportListingDialog({
  propertyName,
  onToast,
  className,
}: ReportListingDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [reason, setReason] = useState("Incorrect information");
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOpen(false);
    onToast("Listing report submitted to Stanza Living Trust & Safety team.");
  };

  return (
    <>
      <div className={cn("flex justify-center pt-8 border-t border-roomly-border/60", className)}>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="text-xs text-roomly-muted hover:text-roomly-dark transition-colors inline-flex items-center gap-1.5 cursor-pointer underline-offset-4 hover:underline"
        >
          <Flag className="w-3.5 h-3.5" />
          <span>Report this listing</span>
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm select-none">
          <div className="bg-[#FDFCF8] border border-roomly-border rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl flex flex-col gap-5">
            <div className="flex items-center justify-between pb-3 border-b border-roomly-border">
              <div className="flex items-center gap-2">
                <Flag className="w-4 h-4 text-roomly-coral" />
                <h3 className="font-display font-bold text-base text-roomly-dark">
                  Report {propertyName}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-full bg-roomly-bg flex items-center justify-center text-roomly-dark"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-xs">
              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-roomly-dark">
                  Reason for reporting
                </label>
                <StanzaSelect
                  options={REPORT_REASONS}
                  value={reason}
                  onChange={setReason}
                  size="sm"
                  shape="rounded"
                  triggerClassName="w-full bg-roomly-bg"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-roomly-dark">
                  Additional context (optional)
                </label>
                <textarea
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Describe the discrepancy..."
                  className="bg-roomly-bg border border-roomly-border rounded-xl p-2.5 text-xs text-roomly-dark focus:outline-none resize-none"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 py-2.5 rounded-full border border-roomly-border text-xs font-semibold text-roomly-dark hover:bg-roomly-bg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-full bg-roomly-dark text-roomly-cream text-xs font-semibold hover:bg-roomly-green"
                >
                  Submit report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
