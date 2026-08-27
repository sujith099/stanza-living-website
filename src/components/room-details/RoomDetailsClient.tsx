"use client";

import React, { useState } from "react";
import { Property } from "@/data/properties";
import { RoomlyNav } from "@/components/ui/RoomlyNav";
import { RoomlyFooter } from "@/components/ui/RoomlyFooter";
import { Toast } from "@/components/ui/Toast";
import { PageTransition } from "@/components/ui/PageTransition";
import { BackButton } from "@/components/ui/BackButton";
import {
  RoomBreadcrumb,
  RoomGallery,
  PropertyHeader,
  BookingPanel,
  PriceBreakdown,
  RoomInformation,
  AmenityGrid,
  IncludedList,
  LocationMap,
  NeighbourhoodInfo,
  HouseRules,
  AvailabilityCalendar,
  ReviewSection,
  ContactProperty,
  BookingCTA,
  SimilarRooms,
  ScheduleVisitModal,
  BookingModal,
  ReportListingDialog,
} from "@/components/room-details";

export interface RoomDetailsClientProps {
  property: Property;
  allProperties: Property[];
}

export function RoomDetailsClient({
  property,
  allProperties,
}: RoomDetailsClientProps) {
  // Move-in date state synced between Calendar, Panel, and Modal
  const [selectedDate, setSelectedDate] = useState<string>(
    property.availableDates[0] || "2026-09-01"
  );

  // Modal states
  const [visitModalOpen, setVisitModalOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  // Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  return (
    <PageTransition className="min-h-screen bg-roomly-bg text-roomly-dark selection:bg-roomly-green selection:text-roomly-cream flex flex-col justify-between">
      {/* 1. Global Floating Navigation */}
      <RoomlyNav />

      {/* Toast Notification Container */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

      {/* Main Container */}
      <main className="pt-24 sm:pt-32 pb-24 px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto w-full flex-grow flex flex-col gap-8 sm:gap-10">
        {/* 2. Top Nav: Back to Rooms & Breadcrumb */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <BackButton label="Back to rooms" fallback="/rooms" />
          <RoomBreadcrumb
            city={property.city}
            neighbourhood={property.neighbourhood}
            propertyName={property.name}
          />
        </div>

        {/* 3. Image Gallery */}
        <RoomGallery
          images={property.images}
          propertyName={property.name}
        />

        {/* 4. Property Header */}
        <PropertyHeader
          property={property}
          onToast={showToast}
        />

        {/* 5. Main 2-Column Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column (Content Areas) */}
          <div className="lg:col-span-8 flex flex-col gap-10 sm:gap-12">
            {/* Price Breakdown */}
            <PriceBreakdown property={property} />

            {/* Room Specifications */}
            <RoomInformation property={property} />

            {/* Amenities Grid */}
            <AmenityGrid amenities={property.amenities} />

            {/* Included vs Optional Services */}
            <IncludedList property={property} />

            {/* Location & Interactive Place Map */}
            <LocationMap
              propertyName={property.name}
              neighbourhood={property.neighbourhood}
              city={property.city}
              nearbyPlaces={property.nearbyPlaces}
            />

            {/* Neighbourhood Editorial Summary */}
            <NeighbourhoodInfo property={property} />

            {/* House Rules */}
            <HouseRules property={property} />

            {/* Availability Mini-Calendar */}
            <AvailabilityCalendar
              property={property}
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
            />

            {/* Resident Reviews */}
            <ReviewSection property={property} />

            {/* Contact Property Team */}
            <ContactProperty
              propertyName={property.name}
              onScheduleVisit={() => setVisitModalOpen(true)}
              onToast={showToast}
            />

            {/* Final Booking Decision CTA */}
            <BookingCTA
              propertyName={property.name}
              onBookRoom={() => setBookingModalOpen(true)}
              onScheduleVisit={() => setVisitModalOpen(true)}
            />

            {/* Similar Rooms */}
            <SimilarRooms
              currentPropertyId={property.id}
              allProperties={allProperties}
              onToast={showToast}
            />

            {/* Report Listing */}
            <ReportListingDialog
              propertyName={property.name}
              onToast={showToast}
            />
          </div>

          {/* Right Column (Desktop Sticky Booking Panel) */}
          <div className="lg:col-span-4">
            <BookingPanel
              property={property}
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
              onScheduleVisit={() => setVisitModalOpen(true)}
              onBookRoom={() => setBookingModalOpen(true)}
            />
          </div>
        </div>
      </main>

      {/* Modals */}
      <ScheduleVisitModal
        property={property}
        isOpen={visitModalOpen}
        onClose={() => setVisitModalOpen(false)}
        onSuccess={showToast}
      />

      <BookingModal
        property={property}
        selectedDate={selectedDate}
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        onSuccess={showToast}
      />

      {/* Reusable Minimal Footer */}
      <RoomlyFooter />
    </PageTransition>
  );
}
