"use client";

import React from "react";
import { Check } from "lucide-react";
import { PropertyRoomOption } from "@/data/bookings";
import { cn } from "@/lib/utils";

export interface RoomSelectorProps {
  rooms: PropertyRoomOption[];
  selectedRoomId: string;
  onSelectRoom: (room: PropertyRoomOption) => void;
  className?: string;
}

export function RoomSelector({
  rooms,
  selectedRoomId,
  onSelectRoom,
  className,
}: RoomSelectorProps) {
  if (rooms.length <= 1) return null;

  return (
    <div className={cn("flex flex-col gap-4 w-full select-none", className)}>
      <div className="flex flex-col gap-1">
        <h3 className="font-display font-bold text-xl sm:text-2xl text-roomly-dark">
          Choose your room
        </h3>
        <p className="text-xs text-roomly-muted">
          Select between curated private suites and shared quarters
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        {rooms.map((room) => {
          const isSelected = room.id === selectedRoomId;

          return (
            <div
              key={room.id}
              onClick={() => onSelectRoom(room)}
              className={cn(
                "p-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer flex flex-col justify-between gap-3",
                isSelected
                  ? "bg-roomly-dark text-roomly-cream border-roomly-dark shadow-md scale-[1.01]"
                  : "bg-[#FDFCF8] text-roomly-dark border-roomly-border hover:border-roomly-dark/40"
              )}
            >
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="font-display font-black text-xs uppercase tracking-wider text-roomly-green">
                    {room.name}
                  </span>
                  {isSelected ? (
                    <div className="w-5 h-5 rounded-full bg-roomly-lime text-roomly-dark flex items-center justify-center">
                      <Check className="w-3 h-3" />
                    </div>
                  ) : (
                    <span className="text-[10px] uppercase font-bold text-roomly-muted">
                      {room.type}
                    </span>
                  )}
                </div>

                <div className="font-display font-bold text-base mt-1">
                  ₹{room.price.toLocaleString("en-IN")}{" "}
                  <span className="text-xs font-normal opacity-80">/ mo</span>
                </div>
              </div>

              {/* Features list */}
              <div className="flex flex-col gap-1 pt-2 border-t border-roomly-border/40 text-[11px]">
                {room.features.slice(0, 2).map((f) => (
                  <span
                    key={f}
                    className={cn(
                      isSelected ? "text-roomly-cream/70" : "text-roomly-muted"
                    )}
                  >
                    • {f}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
