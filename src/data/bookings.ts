export interface GuestDetails {
  fullName: string;
  phone: string;
  email: string;
  occupation: "Working professional" | "Student" | "Other";
  workplaceOrCollege?: string;
}

export interface PropertyRoomOption {
  id: string;
  name: string;
  type: "Private" | "Twin sharing" | "Triple sharing";
  price: number;
  availableDate: string;
  features: string[];
}

export interface Booking {
  id: string;
  propertyId: string;
  propertySlug: string;
  propertyName: string;
  propertyCity: string;
  propertyNeighbourhood: string;
  propertyImage: string;
  roomId: string;
  roomName: string;
  moveInDate: string;
  monthlyRent: number;
  deposit: number;
  bookingFee: number;
  totalDueToday: number;
  status: "Draft" | "Review" | "Payment pending" | "Booking requested" | "Confirmed" | "Cancelled";
  guestDetails: GuestDetails;
  createdAt: string;
}

export interface VisitRequest {
  propertyId: string;
  propertyName: string;
  date: string;
  timeSlot: string;
  guestName: string;
  guestPhone: string;
}

export interface Enquiry {
  propertyId: string;
  propertyName: string;
  category: string;
  message: string;
  guestName: string;
  guestEmail: string;
}

export const OAK_HOUSE_ROOMS: PropertyRoomOption[] = [
  {
    id: "room-204",
    name: "Room 204",
    type: "Private",
    price: 18500,
    availableDate: "Sep 1, 2026",
    features: ["Double bed", "Ergonomic oak desk", "Ensuite bath", "South garden view"],
  },
  {
    id: "room-207",
    name: "Room 207",
    type: "Private",
    price: 19200,
    availableDate: "Sep 5, 2026",
    features: ["Private balcony", "King single bed", "Walk-in wardrobe", "Quiet corner"],
  },
  {
    id: "room-301",
    name: "Room 301",
    type: "Twin sharing",
    price: 12500,
    availableDate: "Sep 1, 2026",
    features: ["Two single beds", "Twin study desks", "Ensuite bath", "Spacious layout"],
  },
];

export const AVAILABLE_MOVE_IN_DATES = [
  { day: 1, label: "September 1, 2026", available: true },
  { day: 5, label: "September 5, 2026", available: true },
  { day: 10, label: "September 10, 2026", available: true },
  { day: 15, label: "September 15, 2026", available: true },
  { day: 20, label: "September 20, 2026", available: true },
];

export const VISIT_TIME_SLOTS = [
  "10:00 AM",
  "12:00 PM",
  "3:00 PM",
  "5:00 PM",
];

export const ENQUIRY_CATEGORIES = [
  "Is this room still available for my dates?",
  "Can I schedule an in-person or video visit?",
  "Can I know more about house rules & deposit?",
  "Other questions",
];
