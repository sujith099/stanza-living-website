"use client";

import React, { useState } from "react";
import { Plus, CheckCircle2 } from "lucide-react";
import { DashboardMaintenanceTicket } from "@/data/dashboard";
import { MaintenanceModal } from "@/components/dashboard";
import { RoomlyButton } from "@/components/ui/RoomlyButton";
import { BackButton } from "@/components/ui/BackButton";
import { FadeIn } from "@/components/ui/FadeIn";
import { cn } from "@/lib/utils";

import { useRoomlyApp } from "@/context/RoomlyAppContext";

export default function DashboardMaintenancePage() {
  const { maintenanceTickets, addMaintenanceTicket } = useRoomlyApp();
  const [modalOpen, setModalOpen] = useState(false);

  const handleCreateTicket = (newT: {
    category: string;
    title: string;
    description: string;
    priority: "Normal" | "Urgent";
  }) => {
    addMaintenanceTicket({
      category: newT.category,
      title: newT.title,
      description: newT.description,
      property: "Oak House",
      room: "Room 204",
      status: "Received",
      priority: newT.priority,
    });
  };

  const activeTickets = maintenanceTickets.filter((t) => t.status !== "Resolved");
  const resolvedTickets = maintenanceTickets.filter((t) => t.status === "Resolved");

  const STAGES = ["Received", "Assigned", "In progress", "Resolved"] as const;

  const getStepIndex = (status: DashboardMaintenanceTicket["status"]) => {
    return STAGES.indexOf(status);
  };

  return (
    <div className="flex flex-col gap-6 w-full select-none">
      {/* Back to Dashboard */}
      <div>
        <BackButton label="Back to dashboard" fallback="/dashboard" />
      </div>

      {/* Header */}
      <FadeIn>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display font-black text-3xl text-roomly-dark">
              Home Requests & Maintenance
            </h1>
            <p className="text-xs text-roomly-muted">
              Report in-room repairs, air conditioning, plumbing, or Wi-Fi diagnostics
            </p>
          </div>

          <RoomlyButton
            variant="primary"
            size="sm"
            shape="pill"
            onClick={() => setModalOpen(true)}
            className="text-xs font-semibold self-start sm:self-center cursor-pointer"
          >
            <Plus className="w-4 h-4 mr-1" />
            <span>New request</span>
          </RoomlyButton>
        </div>
      </FadeIn>

      {/* Active Tickets with 4-Step Stepper */}
      <FadeIn delay={0.05}>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-lg text-roomly-dark">
              Active Requests
            </h3>
            <span className="text-xs text-roomly-muted">
              {activeTickets.length} open ticket
            </span>
          </div>

          <div className="flex flex-col gap-4">
            {activeTickets.map((ticket) => {
              const currentStepIdx = getStepIndex(ticket.status);

              return (
                <div
                  key={ticket.id}
                  className="p-6 sm:p-7 rounded-3xl bg-[#FDFCF8] border border-roomly-border shadow-md flex flex-col gap-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-roomly-border pb-4">
                    <div className="flex items-center gap-2.5">
                      <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-roomly-bg border border-roomly-border text-roomly-muted">
                        {ticket.id}
                      </span>
                      <span className="font-display font-bold text-base text-roomly-dark">
                        {ticket.title}
                      </span>
                    </div>

                    <span className="text-[11px] text-roomly-muted">
                      Submitted {ticket.submittedDate} · {ticket.room}
                    </span>
                  </div>

                  <p className="text-xs text-roomly-muted leading-relaxed">
                    {ticket.description}
                  </p>

                  {/* 4-Step Stepper */}
                  <div className="grid grid-cols-4 gap-2 pt-2">
                    {STAGES.map((stepName, idx) => {
                      const isPast = idx < currentStepIdx;
                      const isCurrent = idx === currentStepIdx;

                      return (
                        <div key={stepName} className="flex flex-col gap-1.5 items-center text-center">
                          <div
                            className={cn(
                              "w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold transition-all",
                              isPast
                                ? "bg-roomly-green text-white"
                                : isCurrent
                                ? "bg-roomly-dark text-roomly-lime ring-4 ring-roomly-lime/30"
                                : "bg-roomly-bg text-roomly-muted border border-roomly-border"
                            )}
                          >
                            {isPast ? "✓" : idx + 1}
                          </div>
                          <span
                            className={cn(
                              "text-[10px] font-semibold",
                              isCurrent
                                ? "text-roomly-dark font-bold"
                                : isPast
                                ? "text-roomly-green"
                                : "text-roomly-muted"
                            )}
                          >
                            {stepName}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {ticket.assignedLead && (
                    <div className="p-3.5 rounded-2xl bg-roomly-bg border border-roomly-border flex items-center justify-between text-xs">
                      <span className="text-roomly-muted">Assigned Specialist:</span>
                      <span className="font-bold text-roomly-dark">
                        {ticket.assignedLead} (ETA {ticket.eta})
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </FadeIn>

      {/* Resolved Tickets */}
      <FadeIn delay={0.1}>
        <div className="flex flex-col gap-3 pt-4">
          <h3 className="font-display font-bold text-base text-roomly-dark">
            Resolved Requests
          </h3>

          <div className="p-5 rounded-3xl bg-[#FDFCF8] border border-roomly-border shadow-xs flex flex-col gap-3">
            {resolvedTickets.map((t) => (
              <div
                key={t.id}
                className="p-3.5 rounded-xl bg-white border border-roomly-border flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-roomly-green" />
                  <span className="font-semibold text-roomly-dark">{t.title}</span>
                </div>
                <span className="text-roomly-muted">{t.submittedDate}</span>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Modal */}
      <MaintenanceModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmitSuccess={handleCreateTicket}
      />
    </div>
  );
}
