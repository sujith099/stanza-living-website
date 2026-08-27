"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Send, ArrowUpRight } from "lucide-react";
import { DEMO_ENQUIRIES, DashboardEnquiry } from "@/data/dashboard";
import { FadeIn } from "@/components/ui/FadeIn";
import { BackButton } from "@/components/ui/BackButton";
import { cn } from "@/lib/utils";

export default function DashboardEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<DashboardEnquiry[]>(DEMO_ENQUIRIES);
  const [activeEnquiryId, setActiveEnquiryId] = useState(DEMO_ENQUIRIES[0].id);
  const [replyText, setReplyText] = useState("");

  const activeEnquiry =
    enquiries.find((e) => e.id === activeEnquiryId) || enquiries[0];

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    setEnquiries((prev) =>
      prev.map((item) => {
        if (item.id === activeEnquiry.id) {
          return {
            ...item,
            messages: [
              ...item.messages,
              {
                id: `msg-${Date.now()}`,
                sender: "user",
                text: replyText.trim(),
                timestamp: "Just now",
              },
            ],
          };
        }
        return item;
      })
    );
    setReplyText("");
  };

  return (
    <div className="flex flex-col gap-6 w-full select-none">
      {/* Back to Dashboard */}
      <div>
        <BackButton label="Back to dashboard" fallback="/dashboard" />
      </div>

      {/* Header */}
      <FadeIn>
        <div>
          <h1 className="font-display font-black text-3xl text-roomly-dark">
            Enquiries & Visits
          </h1>
          <p className="text-xs text-roomly-muted">
            Direct communication with on-site building managers and hosts
          </p>
        </div>
      </FadeIn>

      {/* Main 2-Column Chat Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left Column: Enquiry List */}
        <div className="md:col-span-5 flex flex-col gap-3">
          {enquiries.map((enq) => {
            const isSelected = enq.id === activeEnquiry.id;

            return (
              <button
                key={enq.id}
                type="button"
                onClick={() => setActiveEnquiryId(enq.id)}
                className={cn(
                  "p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col gap-2",
                  isSelected
                    ? "bg-[#FDFCF8] border-roomly-dark shadow-md"
                    : "bg-white border-roomly-border hover:bg-roomly-bg"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="font-display font-bold text-sm text-roomly-dark">
                    {enq.propertyName}
                  </span>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-roomly-bg border border-roomly-border text-roomly-green">
                    {enq.status}
                  </span>
                </div>

                <p className="text-xs text-roomly-muted line-clamp-1">
                  &ldquo;{enq.initialQuestion}&rdquo;
                </p>

                <div className="flex items-center justify-between text-[11px] text-roomly-muted pt-1 border-t border-roomly-border/50">
                  <span>{enq.neighbourhood}</span>
                  <span>{enq.updatedAt}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Active Conversation */}
        <div className="md:col-span-7 p-6 rounded-3xl bg-[#FDFCF8] border border-roomly-border shadow-md flex flex-col justify-between min-h-[440px]">
          {/* Thread Header */}
          <div className="flex items-center justify-between pb-4 border-b border-roomly-border">
            <div>
              <h3 className="font-display font-bold text-base text-roomly-dark">
                {activeEnquiry.propertyName}
              </h3>
              <span className="text-xs text-roomly-muted">
                {activeEnquiry.neighbourhood} · Direct Desk
              </span>
            </div>

            <Link
              href={`/rooms/${activeEnquiry.propertySlug}`}
              className="inline-flex items-center gap-1 text-xs font-semibold text-roomly-green hover:underline"
            >
              <span>View listing</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Messages Stream */}
          <div className="flex flex-col gap-3.5 my-4 overflow-y-auto max-h-72 pr-1">
            {activeEnquiry.messages.map((m) => (
              <div
                key={m.id}
                className={cn(
                  "flex flex-col max-w-[80%] rounded-2xl p-3.5 text-xs leading-relaxed",
                  m.sender === "user"
                    ? "self-end bg-roomly-dark text-roomly-cream"
                    : "self-start bg-roomly-bg border border-roomly-border text-roomly-dark"
                )}
              >
                <span>{m.text}</span>
                <span
                  className={cn(
                    "text-[9px] pt-1 self-end",
                    m.sender === "user"
                      ? "text-roomly-cream/60"
                      : "text-roomly-muted"
                  )}
                >
                  {m.timestamp}
                </span>
              </div>
            ))}
          </div>

          {/* Reply Box */}
          <form onSubmit={handleSendReply} className="flex items-center gap-2 pt-3 border-t border-roomly-border">
            <input
              type="text"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Write a message to the property team..."
              className="flex-grow px-4 py-2.5 rounded-full bg-white border border-roomly-border text-xs text-roomly-dark focus:outline-none focus:border-roomly-dark"
            />
            <button
              type="submit"
              className="p-2.5 rounded-full bg-roomly-dark text-roomly-lime hover:bg-black transition-colors cursor-pointer"
              title="Send reply"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
