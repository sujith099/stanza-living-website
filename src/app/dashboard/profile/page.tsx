"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import { DashboardUser } from "@/data/dashboard";
import { RoomlyButton } from "@/components/ui/RoomlyButton";
import { BackButton } from "@/components/ui/BackButton";
import { FadeIn } from "@/components/ui/FadeIn";

import { useRoomlyApp } from "@/context/RoomlyAppContext";

export default function DashboardProfilePage() {
  const { user: globalUser, updateUser } = useRoomlyApp();
  const [user, setUser] = useState<DashboardUser>(globalUser);
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser(user);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="flex flex-col gap-6 w-full select-none max-w-3xl">
      {/* Back to Dashboard */}
      <div>
        <BackButton label="Back to dashboard" fallback="/dashboard" />
      </div>

      {/* Header */}
      <FadeIn>
        <div>
          <h1 className="font-display font-black text-3xl text-roomly-dark">
            Your Profile
          </h1>
          <p className="text-xs text-roomly-muted">
            Manage your personal identity, occupation, and verified residency contact details
          </p>
        </div>
      </FadeIn>

      {/* Profile Card */}
      <FadeIn delay={0.05}>
        <div className="p-6 sm:p-8 rounded-3xl bg-[#FDFCF8] border border-roomly-border shadow-md flex flex-col gap-6">
          {/* Avatar + Basic Tag */}
          <div className="flex items-center gap-4 pb-6 border-b border-roomly-border">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden flex-shrink-0 bg-roomly-border shadow-sm">
              <Image
                src={user.avatar}
                alt={user.name}
                fill
                sizes="80px"
                className="object-cover"
              />
            </div>

            <div className="flex flex-col gap-0.5">
              <h3 className="font-display font-bold text-xl sm:text-2xl text-roomly-dark">
                {user.name}
              </h3>
              <span className="text-xs text-roomly-muted">
                {user.occupation} at {user.company} · Member since {user.joinedDate}
              </span>
              <span className="text-[10px] uppercase font-bold text-roomly-green mt-1">
                ✓ Government KYC Verified
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSave} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold uppercase tracking-wider text-roomly-dark">
                  Full Name
                </label>
                <input
                  type="text"
                  disabled={!editing}
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  className="px-3.5 py-2.5 rounded-xl bg-white border border-roomly-border text-xs text-roomly-dark disabled:bg-roomly-bg disabled:text-roomly-muted focus:outline-none focus:border-roomly-dark"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold uppercase tracking-wider text-roomly-dark">
                  Email Address
                </label>
                <input
                  type="email"
                  disabled={!editing}
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  className="px-3.5 py-2.5 rounded-xl bg-white border border-roomly-border text-xs text-roomly-dark disabled:bg-roomly-bg disabled:text-roomly-muted focus:outline-none focus:border-roomly-dark"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold uppercase tracking-wider text-roomly-dark">
                  Phone Number
                </label>
                <input
                  type="tel"
                  disabled={!editing}
                  value={user.phone}
                  onChange={(e) => setUser({ ...user, phone: e.target.value })}
                  className="px-3.5 py-2.5 rounded-xl bg-white border border-roomly-border text-xs text-roomly-dark disabled:bg-roomly-bg disabled:text-roomly-muted focus:outline-none focus:border-roomly-dark"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold uppercase tracking-wider text-roomly-dark">
                  Primary Metro City
                </label>
                <input
                  type="text"
                  disabled={!editing}
                  value={user.city}
                  onChange={(e) => setUser({ ...user, city: e.target.value })}
                  className="px-3.5 py-2.5 rounded-xl bg-white border border-roomly-border text-xs text-roomly-dark disabled:bg-roomly-bg disabled:text-roomly-muted focus:outline-none focus:border-roomly-dark"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold uppercase tracking-wider text-roomly-dark">
                  Occupation
                </label>
                <input
                  type="text"
                  disabled={!editing}
                  value={user.occupation}
                  onChange={(e) => setUser({ ...user, occupation: e.target.value })}
                  className="px-3.5 py-2.5 rounded-xl bg-white border border-roomly-border text-xs text-roomly-dark disabled:bg-roomly-bg disabled:text-roomly-muted focus:outline-none focus:border-roomly-dark"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold uppercase tracking-wider text-roomly-dark">
                  Company / Organization
                </label>
                <input
                  type="text"
                  disabled={!editing}
                  value={user.company}
                  onChange={(e) => setUser({ ...user, company: e.target.value })}
                  className="px-3.5 py-2.5 rounded-xl bg-white border border-roomly-border text-xs text-roomly-dark disabled:bg-roomly-bg disabled:text-roomly-muted focus:outline-none focus:border-roomly-dark"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-roomly-border">
              {editing ? (
                <div className="flex items-center gap-3">
                  <RoomlyButton
                    type="submit"
                    variant="primary"
                    size="sm"
                    shape="pill"
                    className="text-xs font-semibold px-5 py-2.5"
                  >
                    Save changes
                  </RoomlyButton>

                  <button
                    type="button"
                    onClick={() => setEditing(false)}
                    className="text-xs font-semibold text-roomly-muted hover:text-roomly-dark cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setEditing(true)}
                  className="text-xs font-semibold text-roomly-green hover:underline cursor-pointer"
                >
                  Edit profile →
                </button>
              )}

              {saved && (
                <span className="text-xs font-bold text-roomly-green flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>Profile updated successfully</span>
                </span>
              )}
            </div>
          </form>
        </div>
      </FadeIn>
    </div>
  );
}
