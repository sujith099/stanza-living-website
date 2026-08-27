"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Property } from "@/data/properties";
import {
  OAK_HOUSE_ROOMS,
  AVAILABLE_MOVE_IN_DATES,
  PropertyRoomOption,
  GuestDetails,
} from "@/data/bookings";
import {
  BookingNav,
  BookingProgress,
  PropertySummaryCard,
  MoveInCalendar,
  RoomSelector,
  GuestDetailsForm,
  BookingReviewStep,
  EnquiryModal,
  VisitSchedulerModal,
} from "@/components/booking";
import { RoomlyButton } from "@/components/ui/RoomlyButton";
import { BackButton } from "@/components/ui/BackButton";

import { useRoomlyApp } from "@/context/RoomlyAppContext";

export interface BookingClientProps {
  property: Property;
}

export function BookingClient({ property }: BookingClientProps) {
  const router = useRouter();
  const { updateBooking } = useRoomlyApp();

  // Flow step: 1 (Date & Room) | 2 (Details) | 3 (Review & Confirm)
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  const availableRooms =
    property.rooms && property.rooms.length > 0
      ? property.rooms
      : OAK_HOUSE_ROOMS;

  // State
  const [selectedDate, setSelectedDate] = useState(
    AVAILABLE_MOVE_IN_DATES[0].label
  );
  const [selectedRoom, setSelectedRoom] = useState<PropertyRoomOption>(
    availableRooms[0]
  );
  const [guestDetails, setGuestDetails] = useState<GuestDetails>({
    fullName: "",
    email: "",
    phone: "",
    occupation: "Working professional",
    workplaceOrCollege: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Modals
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [visitOpen, setVisitOpen] = useState(false);

  // Step navigation handlers
  const handleStep1Continue = () => {
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleStep2Continue = () => {
    const newErrors: Record<string, string> = {};
    if (!guestDetails.fullName.trim()) {
      newErrors.fullName = "Please enter your full name.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guestDetails.email)) {
      newErrors.email = "Enter a valid email address.";
    }
    if (guestDetails.phone.replace(/\D/g, "").length < 10) {
      newErrors.phone = "Enter a valid 10-digit phone number.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setCurrentStep(3);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleConfirmBooking = () => {
    setIsSubmitting(true);
    updateBooking({
      propertyName: property.name,
      propertySlug: property.slug,
      propertyImage: property.images[0],
      address: `${property.neighbourhood}, ${property.city}`,
      city: property.city,
      neighbourhood: property.neighbourhood,
      roomName: selectedRoom.name,
      roomType: selectedRoom.type,
      monthlyRent: selectedRoom.price,
      deposit: 25000,
      moveInDate: "2026-09-01",
      status: "Booking requested",
    });
    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/booking/success");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-roomly-bg text-roomly-dark selection:bg-roomly-green selection:text-roomly-cream flex flex-col justify-between">
      {/* 1. Minimal Checkout Navigation */}
      <BookingNav propertySlug={property.slug} />

      {/* Main Checkout Container */}
      <main className="max-w-7xl mx-auto w-full px-5 sm:px-8 lg:px-12 py-8 sm:py-12 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Form & Steps */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Contextual Back Navigation */}
            <div className="flex items-center">
              {currentStep === 1 && (
                <BackButton
                  label="Back to room"
                  fallback={`/rooms/${property.slug}`}
                />
              )}
              {currentStep === 2 && (
                <BackButton
                  label="Back to dates & room"
                  onClick={() => {
                    setCurrentStep(1);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                />
              )}
              {currentStep === 3 && (
                <BackButton
                  label="Back to your details"
                  onClick={() => {
                    setCurrentStep(2);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                />
              )}
            </div>

            {/* Progress Stepper */}
            <BookingProgress currentStep={currentStep} />

            {/* STEP 1: Date & Room */}
            {currentStep === 1 && (
              <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-2">
                <MoveInCalendar
                  selectedDate={selectedDate}
                  onSelectDate={setSelectedDate}
                />

                <RoomSelector
                  rooms={availableRooms}
                  selectedRoomId={selectedRoom.id}
                  onSelectRoom={setSelectedRoom}
                />

                {/* Alternative actions */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-roomly-border text-xs">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setEnquiryOpen(true)}
                      className="text-roomly-muted hover:text-roomly-dark font-medium underline transition-colors cursor-pointer"
                    >
                      Send an enquiry →
                    </button>
                    <span className="text-roomly-border">•</span>
                    <button
                      type="button"
                      onClick={() => setVisitOpen(true)}
                      className="text-roomly-muted hover:text-roomly-dark font-medium underline transition-colors cursor-pointer"
                    >
                      Schedule a visit →
                    </button>
                  </div>

                  <RoomlyButton
                    variant="primary"
                    size="lg"
                    shape="pill"
                    withArrow
                    arrowStyle="circle"
                    onClick={handleStep1Continue}
                    className="text-xs sm:text-sm font-semibold px-8 py-3.5"
                  >
                    Continue to details
                  </RoomlyButton>
                </div>
              </div>
            )}

            {/* STEP 2: Guest Details */}
            {currentStep === 2 && (
              <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-2">
                <GuestDetailsForm
                  details={guestDetails}
                  onChange={setGuestDetails}
                  errors={errors}
                />

                <div className="flex items-center justify-between pt-4 border-t border-roomly-border">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-roomly-muted hover:text-roomly-dark transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to date</span>
                  </button>

                  <RoomlyButton
                    variant="primary"
                    size="lg"
                    shape="pill"
                    withArrow
                    arrowStyle="circle"
                    onClick={handleStep2Continue}
                    className="text-xs sm:text-sm font-semibold px-8 py-3.5"
                  >
                    Review & pay
                  </RoomlyButton>
                </div>
              </div>
            )}

            {/* STEP 3: Price Review & Confirmation */}
            {currentStep === 3 && (
              <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-2">
                <BookingReviewStep
                  property={property}
                  room={selectedRoom}
                  moveInDate={selectedDate}
                  guestDetails={guestDetails}
                  onConfirm={handleConfirmBooking}
                  isLoading={isSubmitting}
                />

                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-roomly-muted hover:text-roomly-dark self-start transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to details</span>
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Sticky Summary */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <PropertySummaryCard
              property={property}
              selectedRoom={selectedRoom}
              selectedDate={selectedDate}
            />
          </div>
        </div>
      </main>

      {/* Alternative Modals */}
      <EnquiryModal
        propertyName={property.name}
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
      />

      <VisitSchedulerModal
        propertyName={property.name}
        isOpen={visitOpen}
        onClose={() => setVisitOpen(false)}
      />

      {/* Minimal Footer */}
      <footer className="w-full border-t border-roomly-border py-6 px-5 text-center text-xs text-roomly-muted">
        <span>Stanza Living Concept Prototype · Managed student & shared living</span>
      </footer>
    </div>
  );
}
