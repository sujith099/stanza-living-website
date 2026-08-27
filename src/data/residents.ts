export interface Resident {
  name: string;
  room: string;
  property: string;
  neighbourhood: string;
  city: string;
  moveInDate: string;
  preferences: string[];
}

export interface PaymentRecord {
  month: string;
  amount: string;
  dueDate: string;
  status: "Due" | "Paid" | "Upcoming";
  receiptId?: string;
  paidOn?: string;
}

export interface MaintenanceTicket {
  id: string;
  category: "AC" | "Wi-Fi" | "Plumbing" | "Electrical" | "Furniture" | "Cleaning" | "Other";
  title: string;
  description: string;
  submittedOn: string;
  priority: "Low" | "Normal" | "Urgent";
  status: "Received" | "Assigned" | "In progress" | "Resolved";
  assignedTo?: string;
  updatedTime?: string;
}

export interface CommunityEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  dayOfWeek: string;
  location: string;
  description: string;
  attendeesCount: number;
  category: string;
  image: string;
}

export interface Announcement {
  id: string;
  title: string;
  date: string;
  time: string;
  tag: "Maintenance" | "Community" | "Notice";
  description: string;
}

export interface ResidentDocument {
  id: string;
  name: string;
  date: string;
  type: string;
  size: string;
}

export interface ResidentNotification {
  id: string;
  title: string;
  time: string;
  read: boolean;
  category: "payment" | "maintenance" | "community" | "announcement";
}

export const SAMPLE_RESIDENT: Resident = {
  name: "Meera Sharma",
  room: "Room 204",
  property: "Oak House",
  neighbourhood: "Indiranagar",
  city: "Bengaluru",
  moveInDate: "July 2025",
  preferences: ["Quiet hours after 10 PM", "Vegetarian refrigerator space", "Double-glazed window preference", "No smoking"],
};

export const CURRENT_PAYMENT: PaymentRecord = {
  month: "September 2026",
  amount: "₹18,500",
  dueDate: "Sep 5, 2026",
  status: "Due",
};

export const PAYMENT_HISTORY: PaymentRecord[] = [
  {
    month: "August 2026",
    amount: "₹18,500",
    dueDate: "Aug 5, 2026",
    status: "Paid",
    receiptId: "REC-2026-0804",
    paidOn: "Aug 4, 2026",
  },
  {
    month: "July 2026",
    amount: "₹18,500",
    dueDate: "Jul 5, 2026",
    status: "Paid",
    receiptId: "REC-2026-0703",
    paidOn: "Jul 3, 2026",
  },
  {
    month: "June 2026",
    amount: "₹18,500",
    dueDate: "Jun 5, 2026",
    status: "Paid",
    receiptId: "REC-2026-0604",
    paidOn: "Jun 4, 2026",
  },
];

export const SAMPLE_TICKETS: MaintenanceTicket[] = [
  {
    id: "#2048",
    category: "AC",
    title: "AC cooling reduced during midday",
    description: "The 1.5-ton split unit in Room 204 requires filter cleaning and compressor coolant check.",
    submittedOn: "Aug 24, 2026",
    priority: "Normal",
    status: "In progress",
    assignedTo: "Kiran (HVAC Lead)",
    updatedTime: "2 hours ago",
  },
  {
    id: "#1982",
    category: "Wi-Fi",
    title: "2nd floor mesh router latency check",
    description: "Mesh node near study room updated with primary Gigabit fiber routing.",
    submittedOn: "Aug 12, 2026",
    priority: "Urgent",
    status: "Resolved",
    assignedTo: "ACT Fibernet Team",
    updatedTime: "Aug 13, 2026",
  },
];

export const COMMUNITY_EVENTS: CommunityEvent[] = [
  {
    id: "evt-1",
    title: "Community Rooftop Dinner",
    dayOfWeek: "Friday",
    date: "Sep 4, 2026",
    time: "7:00 PM",
    location: "Oak House Terrace Garden",
    description: "Freshly wood-fired sourdough pizzas, salads, cold brew kombucha, and casual conversation under the Indiranagar rain trees.",
    attendeesCount: 14,
    category: "Food & Social",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "evt-2",
    title: "Indie Cinema & Documentary Night",
    dayOfWeek: "Saturday",
    date: "Sep 5, 2026",
    time: "8:00 PM",
    location: "Common Living Lounge",
    description: "Screening of curated design and architecture short films followed by tea and relaxed discussion.",
    attendeesCount: 9,
    category: "Film & Arts",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "evt-3",
    title: "Cubbon Park Weekend Run & Coffee",
    dayOfWeek: "Sunday",
    date: "Sep 6, 2026",
    time: "7:30 AM",
    location: "Meet at Oak House Foyer",
    description: "A gentle 5km loop around Cubbon Park bamboo groves followed by filter coffee at Church Street.",
    attendeesCount: 11,
    category: "Wellness",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
  },
];

export const ANNOUNCEMENTS: Announcement[] = [
  {
    id: "ann-1",
    title: "Borewell & Water Tank Preventive Maintenance",
    date: "Tomorrow, Sep 1",
    time: "10:00 AM – 12:30 PM",
    tag: "Maintenance",
    description: "Overhead solar and water booster pumps are undergoing scheduled bi-monthly descaling. Secondary storage will maintain normal tap pressure throughout.",
  },
  {
    id: "ann-2",
    title: "Common Kitchen & Refrigerator Deep Clean",
    date: "Friday, Sep 4",
    time: "2:00 PM – 4:00 PM",
    tag: "Community",
    description: "Weekly housekeeping team deep clean. Please mark and label your personal containers in the refrigeration zones before 1 PM.",
  },
  {
    id: "ann-3",
    title: "Welcome Orientation for September Residents",
    date: "Saturday, Sep 5",
    time: "11:00 AM",
    tag: "Notice",
    description: "Quick 20-minute terrace orientation for newly relocated residents covering waste segregation, high-speed Wi-Fi roaming, and neighborhood grocery perks.",
  },
];

export const RESIDENT_DOCUMENTS: ResidentDocument[] = [
  {
    id: "doc-1",
    name: "Digital Lease Agreement (Oak House)",
    date: "Executed Jul 1, 2025",
    type: "Signed Agreement (PDF)",
    size: "1.4 MB",
  },
  {
    id: "doc-2",
    name: "Security Deposit Escrow Receipt",
    date: "Paid Jul 1, 2025",
    type: "Tax Invoice (PDF)",
    size: "240 KB",
  },
  {
    id: "doc-3",
    name: "Government ID Verification Record",
    date: "Verified Jul 2, 2025",
    type: "KYC Clearance",
    size: "180 KB",
  },
  {
    id: "doc-4",
    name: "Oak House Resident Guide & House Rules",
    date: "Updated Aug 2026",
    type: "Property Handbook",
    size: "3.2 MB",
  },
];

export const RESIDENT_NOTIFICATIONS: ResidentNotification[] = [
  {
    id: "notif-1",
    title: "September rent of ₹18,500 due in 5 days",
    time: "3 hours ago",
    read: false,
    category: "payment",
  },
  {
    id: "notif-2",
    title: "AC maintenance request #2048 assigned to technician",
    time: "5 hours ago",
    read: false,
    category: "maintenance",
  },
  {
    id: "notif-3",
    title: "14 neighbors RSVP'd for Friday Rooftop Dinner",
    time: "Yesterday",
    read: true,
    category: "community",
  },
  {
    id: "notif-4",
    title: "Scheduled water tank servicing tomorrow at 10 AM",
    time: "Yesterday",
    read: true,
    category: "announcement",
  },
];

export const MOVE_IN_STEPS = [
  {
    step: "01",
    title: "Before you arrive",
    summary: "Booking confirmation & digital KYC",
    details: "Confirm your dates, digitally sign your lease agreement, and receive your digital room access PIN.",
  },
  {
    step: "02",
    title: "Move-in day",
    summary: "Keys, orientation & walkthrough",
    details: "Arrive at your chosen hour. Our property manager greets you with an on-site condition checklist and room keys.",
  },
  {
    step: "03",
    title: "First week",
    summary: "Settling in & meeting neighbors",
    details: "Connect to Gigabit fiber, calibrate your workspace, raise any settling requests, and meet fellow residents.",
  },
  {
    step: "04",
    title: "Everyday living",
    summary: "One-tap rent & ongoing support",
    details: "Automated receipts, prompt repair technicians, scheduled community dinners, and quiet hour assurance.",
  },
];

export const RESIDENT_BENEFITS = [
  {
    title: "Simple payments",
    description: "One unified bill covers rent, electricity, Gigabit Wi-Fi, and weekly housekeeping without surprise levies.",
  },
  {
    title: "Fast maintenance",
    description: "Track tickets with real-time status updates instead of following up on disorganized messaging groups.",
  },
  {
    title: "Clear communication",
    description: "Property notices, water tank cleanups, and deliveries posted transparently with plenty of advance notice.",
  },
  {
    title: "Community",
    description: "Connect with thoughtful neighbors who respect quiet work hours and appreciate weekend dinners.",
  },
];
