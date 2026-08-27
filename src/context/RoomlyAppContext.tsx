"use client";

import React, { createContext, useContext, useState } from "react";
import {
  DEMO_BOOKING,
  DEMO_USER,
  DEMO_NOTIFICATIONS,
  DEMO_MAINTENANCE_TICKETS,
  DashboardBooking,
  DashboardUser,
  DashboardNotification,
  DashboardMaintenanceTicket,
} from "@/data/dashboard";
import { PROPERTIES } from "@/data/properties";

interface RoomlyAppContextType {
  // Saved rooms
  savedPropertyIds: string[];
  isSaved: (id: string) => boolean;
  toggleSave: (id: string) => boolean;

  // Active booking & home pass
  activeBooking: DashboardBooking;
  updateBooking: (booking: Partial<DashboardBooking>) => void;

  // Maintenance tickets
  maintenanceTickets: DashboardMaintenanceTicket[];
  addMaintenanceTicket: (ticket: Omit<DashboardMaintenanceTicket, "id" | "submittedDate">) => void;

  // Notifications
  notifications: DashboardNotification[];
  unreadNotificationCount: number;
  markAllNotificationsRead: () => void;

  // User profile
  user: DashboardUser;
  updateUser: (updated: Partial<DashboardUser>) => void;

  // Global toast
  toastMessage: string | null;
  showToast: (message: string) => void;
}

const RoomlyAppContext = createContext<RoomlyAppContextType | null>(null);

const STORAGE_SAVED_KEY = "stanza_saved_rooms";
const LEGACY_SAVED_KEY = "roomly_saved_rooms";

export function RoomlyAppProvider({ children }: { children: React.ReactNode }) {
  // 1. Saved Rooms State (initialized lazily with localStorage)
  const [savedPropertyIds, setSavedPropertyIds] = useState<string[]>(() => {
    if (typeof window === "undefined") {
      return ["oak-house", "june-house", "fern-house"];
    }
    try {
      const stored =
        localStorage.getItem(STORAGE_SAVED_KEY) ||
        localStorage.getItem(LEGACY_SAVED_KEY);
      return stored ? JSON.parse(stored) : ["oak-house", "june-house", "fern-house"];
    } catch {
      return ["oak-house", "june-house", "fern-house"];
    }
  });

  // 2. Active Home Booking
  const [activeBooking, setActiveBooking] = useState<DashboardBooking>(DEMO_BOOKING);

  // 3. Maintenance Tickets
  const [maintenanceTickets, setMaintenanceTickets] =
    useState<DashboardMaintenanceTicket[]>(DEMO_MAINTENANCE_TICKETS);

  // 4. Notifications
  const [notifications, setNotifications] =
    useState<DashboardNotification[]>(DEMO_NOTIFICATIONS);

  // 5. User Profile
  const [user, setUser] = useState<DashboardUser>(DEMO_USER);

  // 6. Global Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((current) => (current === message ? null : current));
    }, 3200);
  };

  const isSaved = (id: string) => {
    return savedPropertyIds.includes(id);
  };

  const toggleSave = (id: string): boolean => {
    let nowSaved = false;
    setSavedPropertyIds((prev) => {
      let updated: string[];
      if (prev.includes(id)) {
        updated = prev.filter((item) => item !== id);
        nowSaved = false;
      } else {
        updated = [...prev, id];
        nowSaved = true;
      }
      try {
        localStorage.setItem(STORAGE_SAVED_KEY, JSON.stringify(updated));
      } catch {
        // Ignore storage quotas
      }
      return updated;
    });

    const property = PROPERTIES.find((p) => p.id === id || p.slug === id);
    const name = property ? property.name : "Room";
    showToast(nowSaved ? `${name} saved to shortlist` : `${name} removed from shortlist`);

    return nowSaved;
  };

  const updateBooking = (bookingUpdates: Partial<DashboardBooking>) => {
    setActiveBooking((prev) => ({ ...prev, ...bookingUpdates }));
  };

  const addMaintenanceTicket = (
    ticket: Omit<DashboardMaintenanceTicket, "id" | "submittedDate">
  ) => {
    const newTicket: DashboardMaintenanceTicket = {
      ...ticket,
      id: `REQ-${Math.floor(1000 + Math.random() * 9000)}`,
      submittedDate: "Just now",
    };
    setMaintenanceTickets((prev) => [newTicket, ...prev]);
    showToast(`Maintenance ticket ${newTicket.id} submitted`);
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast("All notifications marked as read");
  };

  const updateUser = (updated: Partial<DashboardUser>) => {
    setUser((prev) => ({ ...prev, ...updated }));
    showToast("Profile changes saved");
  };

  const unreadNotificationCount = notifications.filter((n) => !n.read).length;

  return (
    <RoomlyAppContext.Provider
      value={{
        savedPropertyIds,
        isSaved,
        toggleSave,
        activeBooking,
        updateBooking,
        maintenanceTickets,
        addMaintenanceTicket,
        notifications,
        unreadNotificationCount,
        markAllNotificationsRead,
        user,
        updateUser,
        toastMessage,
        showToast,
      }}
    >
      {children}

      {/* Global Toast Notification Component */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-3 duration-300">
          <div className="px-4 py-3 rounded-2xl bg-roomly-dark text-roomly-cream border border-white/10 shadow-xl text-xs font-semibold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-roomly-lime" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </RoomlyAppContext.Provider>
  );
}

export function useRoomlyApp() {
  const context = useContext(RoomlyAppContext);
  if (!context) {
    throw new Error("useRoomlyApp must be used within a RoomlyAppProvider");
  }
  return context;
}

export function useRoomlyAppSafe() {
  return useContext(RoomlyAppContext);
}

export const StanzaAppProvider = RoomlyAppProvider;
export const StanzaAppContext = RoomlyAppContext;
export const useStanzaApp = useRoomlyApp;
export const useStanzaAppSafe = useRoomlyAppSafe;
