"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Send } from "lucide-react";
import { DEMO_MESSAGES, DashboardMessageThread } from "@/data/dashboard";
import { FadeIn } from "@/components/ui/FadeIn";
import { BackButton } from "@/components/ui/BackButton";
import { cn } from "@/lib/utils";

export default function DashboardMessagesPage() {
  const [threads, setThreads] = useState<DashboardMessageThread[]>(DEMO_MESSAGES);
  const [activeThreadId, setActiveThreadId] = useState(DEMO_MESSAGES[0].id);
  const [text, setText] = useState("");

  const activeThread =
    threads.find((t) => t.id === activeThreadId) || threads[0];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    setThreads((prev) =>
      prev.map((t) => {
        if (t.id === activeThread.id) {
          return {
            ...t,
            messages: [
              ...t.messages,
              {
                id: `msg-${Date.now()}`,
                sender: "me",
                text: text.trim(),
                time: "Just now",
              },
            ],
          };
        }
        return t;
      })
    );
    setText("");
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
            Direct Messages
          </h1>
          <p className="text-xs text-roomly-muted">
            Direct channel with Stanza Living tenant care and your on-site building desk
          </p>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left Column: Channels */}
        <div className="md:col-span-5 flex flex-col gap-3">
          {threads.map((thread) => {
            const isSelected = thread.id === activeThread.id;

            return (
              <button
                key={thread.id}
                type="button"
                onClick={() => setActiveThreadId(thread.id)}
                className={cn(
                  "p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3.5",
                  isSelected
                    ? "bg-[#FDFCF8] border-roomly-dark shadow-md"
                    : "bg-white border-roomly-border hover:bg-roomly-bg"
                )}
              >
                <div className="relative w-11 h-11 rounded-full overflow-hidden flex-shrink-0 bg-roomly-border">
                  <Image
                    src={thread.avatar}
                    alt={thread.participant}
                    fill
                    sizes="44px"
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-col gap-0.5 flex-grow min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-display font-bold text-xs sm:text-sm text-roomly-dark truncate">
                      {thread.participant}
                    </span>
                    <span className="text-[10px] text-roomly-muted flex-shrink-0">
                      {thread.timestamp}
                    </span>
                  </div>

                  <p className="text-xs text-roomly-muted truncate">
                    {thread.lastMessage}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Chat Stream */}
        <div className="md:col-span-7 p-6 rounded-3xl bg-[#FDFCF8] border border-roomly-border shadow-md flex flex-col justify-between min-h-[460px]">
          {/* Header */}
          <div className="flex items-center gap-3 pb-4 border-b border-roomly-border">
            <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-roomly-border">
              <Image
                src={activeThread.avatar}
                alt={activeThread.participant}
                fill
                sizes="40px"
                className="object-cover"
              />
            </div>

            <div className="flex flex-col">
              <span className="font-display font-bold text-sm text-roomly-dark">
                {activeThread.participant}
              </span>
              <span className="text-[11px] text-roomly-muted">
                {activeThread.role}
              </span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex flex-col gap-3 my-4 overflow-y-auto max-h-80 pr-1">
            {activeThread.messages.map((m) => (
              <div
                key={m.id}
                className={cn(
                  "flex flex-col max-w-[75%] rounded-2xl p-3 text-xs leading-relaxed",
                  m.sender === "me"
                    ? "self-end bg-roomly-dark text-roomly-cream"
                    : "self-start bg-roomly-bg border border-roomly-border text-roomly-dark"
                )}
              >
                <span>{m.text}</span>
                <span
                  className={cn(
                    "text-[9px] pt-0.5 self-end",
                    m.sender === "me" ? "text-roomly-cream/60" : "text-roomly-muted"
                  )}
                >
                  {m.time}
                </span>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <form onSubmit={handleSend} className="flex items-center gap-2 pt-3 border-t border-roomly-border">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write a message..."
              className="flex-grow px-4 py-2.5 rounded-full bg-white border border-roomly-border text-xs text-roomly-dark focus:outline-none focus:border-roomly-dark"
            />
            <button
              type="submit"
              className="p-2.5 rounded-full bg-roomly-dark text-roomly-lime hover:bg-black transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
