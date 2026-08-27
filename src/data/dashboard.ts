export interface DashboardUser {
  name: string;
  avatar: string;
  email: string;
  phone: string;
  occupation: string;
  company: string;
  city: string;
  joinedDate: string;
}

export interface DashboardBooking {
  id: string;
  propertyName: string;
  propertySlug: string;
  propertyImage: string;
  address: string;
  city: string;
  neighbourhood: string;
  roomName: string;
  roomType: string;
  moveInDate: string; // ISO or human format e.g. "2026-09-01"
  monthlyRent: number;
  deposit: number;
  status: "Draft" | "Booking requested" | "Confirmed" | "Resident";
  hostContact: string;
  checkInInstructions: string;
}

export interface DashboardPayment {
  id: string;
  title: string;
  period: string;
  amount: number;
  dueDate: string;
  status: "Upcoming" | "Paid" | "Overdue";
  method?: string;
  receiptUrl?: string;
}

export interface DashboardMaintenanceTicket {
  id: string;
  category: string;
  title: string;
  description: string;
  property: string;
  room: string;
  submittedDate: string;
  status: "Received" | "Assigned" | "In progress" | "Resolved";
  assignedLead?: string;
  eta?: string;
  priority: "Normal" | "Urgent";
}

export interface EnquiryMessage {
  id: string;
  sender: "user" | "property";
  text: string;
  timestamp: string;
}

export interface DashboardEnquiry {
  id: string;
  propertyName: string;
  propertySlug: string;
  neighbourhood: string;
  initialQuestion: string;
  status: "Awaiting reply" | "Replied" | "Visit requested";
  updatedAt: string;
  messages: EnquiryMessage[];
}

export interface DashboardMessageThread {
  id: string;
  participant: string;
  role: string;
  avatar: string;
  unreadCount: number;
  lastMessage: string;
  timestamp: string;
  messages: {
    id: string;
    sender: "me" | "them";
    text: string;
    time: string;
  }[];
}

export interface DashboardNotification {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  link: string;
  type: "payment" | "maintenance" | "booking" | "message";
}

export interface DashboardDocument {
  id: string;
  name: string;
  category: "Agreement" | "Receipt" | "Verification" | "Handbook";
  date: string;
  status: "Verified" | "Pending signature" | "Available";
  fileSize: string;
}

export interface FAQItem {
  id: string;
  category: "Booking" | "Payments" | "Move-in" | "Maintenance" | "Account";
  question: string;
  answer: string;
}

export const DEMO_USER: DashboardUser = {
  name: "Meera Sharma",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
  email: "meera.sharma@work.com",
  phone: "+91 98765 43210",
  occupation: "Software Engineer",
  company: "Swiggy",
  city: "Bengaluru",
  joinedDate: "August 2026",
};

export const DEMO_BOOKING: DashboardBooking = {
  id: "RM-2026-00124",
  propertyName: "Oak House",
  propertySlug: "oak-house",
  propertyImage: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200&auto=format&fit=crop",
  address: "742, 100ft Road, Defence Colony, Indiranagar",
  city: "Bengaluru",
  neighbourhood: "Indiranagar",
  roomName: "Room 204",
  roomType: "Private room with ensuite",
  moveInDate: "2026-09-01",
  monthlyRent: 18500,
  deposit: 25000,
  status: "Booking requested",
  hostContact: "+91 80 4012 0000",
  checkInInstructions: "Keys and digital RFID fob can be collected from the building manager desk from 9:00 AM on move-in day.",
};

export const DEMO_PAYMENTS: DashboardPayment[] = [
  {
    id: "PAY-SEP-26",
    title: "September Rent & Utilities",
    period: "September 2026",
    amount: 18500,
    dueDate: "Sep 5, 2026",
    status: "Upcoming",
    method: "UPI / Net Banking",
  },
  {
    id: "PAY-AUG-26",
    title: "August Move-in Deposit & Fee",
    period: "August 2026",
    amount: 26000,
    dueDate: "Aug 26, 2026",
    status: "Paid",
    method: "UPI (Google Pay)",
    receiptUrl: "#",
  },
];

export const DEMO_MAINTENANCE_TICKETS: DashboardMaintenanceTicket[] = [
  {
    id: "REQ-2048",
    category: "AC",
    title: "AC not cooling below 24°C",
    description: "Airflow is steady but temperature remains warm during daytime.",
    property: "Oak House",
    room: "Room 204",
    submittedDate: "Aug 24, 2026",
    status: "In progress",
    assignedLead: "Ramesh K. (HVAC Team)",
    eta: "Aug 29 · 2:00 PM",
    priority: "Normal",
  },
  {
    id: "REQ-1982",
    category: "Wi-Fi",
    title: "2nd Floor mesh router signal check",
    description: "Brief latency spike around 9 PM on Tuesday.",
    property: "Oak House",
    room: "Room 204",
    submittedDate: "Aug 15, 2026",
    status: "Resolved",
    assignedLead: "ACT Fiber Desk",
    priority: "Normal",
  },
];

export const DEMO_ENQUIRIES: DashboardEnquiry[] = [
  {
    id: "ENQ-01",
    propertyName: "Oak House",
    propertySlug: "oak-house",
    neighbourhood: "Indiranagar",
    initialQuestion: "Is the room available from September 1?",
    status: "Replied",
    updatedAt: "2 hours ago",
    messages: [
      {
        id: "m1",
        sender: "user",
        text: "Is the room available from September 1?",
        timestamp: "Yesterday, 4:15 PM",
      },
      {
        id: "m2",
        sender: "property",
        text: "Yes, Room 204 is currently available and scheduled for deep cleaning on Aug 30.",
        timestamp: "Yesterday, 5:30 PM",
      },
      {
        id: "m3",
        sender: "user",
        text: "Can I visit this weekend to test the study desk and Wi-Fi speed?",
        timestamp: "Today, 10:00 AM",
      },
      {
        id: "m4",
        sender: "property",
        text: "Saturday at 3 PM is open! Our host Arjun will be at the front desk.",
        timestamp: "Today, 11:30 AM",
      },
    ],
  },
  {
    id: "ENQ-02",
    propertyName: "June House",
    propertySlug: "june-house",
    neighbourhood: "HSR Layout",
    initialQuestion: "Can I schedule a visit?",
    status: "Visit requested",
    updatedAt: "1 day ago",
    messages: [
      {
        id: "j1",
        sender: "user",
        text: "Can I schedule a weekend visit for June House?",
        timestamp: "Aug 26, 11:00 AM",
      },
      {
        id: "j2",
        sender: "property",
        text: "We've noted your request for Sunday morning. Confirmation sent shortly!",
        timestamp: "Aug 26, 2:15 PM",
      },
    ],
  },
];

export const DEMO_MESSAGES: DashboardMessageThread[] = [
  {
    id: "msg-support",
    participant: "Stanza Living Support",
    role: "Tenant Care & Escrow Desk",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
    unreadCount: 2,
    lastMessage: "Hi Meera, your move-in rental agreement is ready for review.",
    timestamp: "12:45 PM",
    messages: [
      { id: "s1", sender: "them", text: "Welcome to Stanza Living, Meera! We're preparing your onboarding packet.", time: "10:00 AM" },
      { id: "s2", sender: "me", text: "Thank you! When will the digital lock code be ready?", time: "11:20 AM" },
      { id: "s3", sender: "them", text: "Hi Meera, your move-in rental agreement is ready for review. You can sign it under the Documents tab.", time: "12:45 PM" },
    ],
  },
  {
    id: "msg-property",
    participant: "Oak House Property Team",
    role: "Building Manager",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    unreadCount: 1,
    lastMessage: "Ramesh from our HVAC team will visit Room 204 on Saturday.",
    timestamp: "Yesterday",
    messages: [
      { id: "p1", sender: "me", text: "Hi team, regarding the AC cooling ticket #2048, is the technician scheduled?", time: "Aug 26, 3:00 PM" },
      { id: "p2", sender: "them", text: "Ramesh from our HVAC team will visit Room 204 on Saturday between 2 PM and 3 PM.", time: "Yesterday, 4:00 PM" },
    ],
  },
];

export const DEMO_NOTIFICATIONS: DashboardNotification[] = [
  {
    id: "notif-1",
    title: "September rent due in 8 days",
    description: "Monthly invoice for ₹18,500 is generated. Due by September 5.",
    timestamp: "2 hours ago",
    read: false,
    link: "/dashboard/payments",
    type: "payment",
  },
  {
    id: "notif-2",
    title: "Move-in lease agreement ready",
    description: "Please review and sign your digital residential agreement.",
    timestamp: "Yesterday",
    read: false,
    link: "/dashboard/booking",
    type: "booking",
  },
  {
    id: "notif-3",
    title: "AC maintenance update (#2048)",
    description: "Technician Ramesh K. assigned for Saturday 2:00 PM.",
    timestamp: "Aug 26",
    read: true,
    link: "/dashboard/maintenance",
    type: "maintenance",
  },
  {
    id: "notif-4",
    title: "Visit confirmed at June House",
    description: "Host Deepak confirmed your visit on Sunday at 11:00 AM.",
    timestamp: "Aug 25",
    read: true,
    link: "/dashboard/enquiries",
    type: "message",
  },
];

export const DEMO_DOCUMENTS: DashboardDocument[] = [
  {
    id: "doc-1",
    name: "Residential Lease Agreement · Oak House",
    category: "Agreement",
    date: "Aug 27, 2026",
    status: "Pending signature",
    fileSize: "1.4 MB PDF",
  },
  {
    id: "doc-2",
    name: "Tenant Escrow Deposit Receipt (#RM-2026-00124)",
    category: "Receipt",
    date: "Aug 26, 2026",
    status: "Verified",
    fileSize: "420 KB PDF",
  },
  {
    id: "doc-3",
    name: "Government ID & KYC Verification",
    category: "Verification",
    date: "Aug 26, 2026",
    status: "Verified",
    fileSize: "850 KB PDF",
  },
  {
    id: "doc-4",
    name: "Oak House Resident Handbook & Quiet Hours",
    category: "Handbook",
    date: "Aug 2026",
    status: "Available",
    fileSize: "2.1 MB PDF",
  },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: "faq-1",
    category: "Payments",
    question: "How do I pay monthly rent?",
    answer: "Rent invoices are generated on the 1st of every month and due by the 5th. You can pay seamlessly via UPI, credit/debit card, or net banking directly from your Payments tab.",
  },
  {
    id: "faq-2",
    category: "Maintenance",
    question: "How quickly are maintenance requests resolved?",
    answer: "Standard repairs (Wi-Fi, plumbing, electrical) are dispatched within 4 hours. HVAC and specialized appliance servicing are typically resolved within 24 to 48 hours.",
  },
  {
    id: "faq-3",
    category: "Move-in",
    question: "Can I adjust my move-in date after reserving?",
    answer: "Yes, you can adjust your move-in date by up to 7 days before your scheduled arrival date through your booking tab or by messaging your building manager.",
  },
  {
    id: "faq-4",
    category: "Booking",
    question: "Is my security deposit escrow protected?",
    answer: "Yes. All deposits are held in a transparent 100% tenant escrow account and refunded within 48 hours of check-out after routine room inspection.",
  },
  {
    id: "faq-5",
    category: "Move-in",
    question: "What items should I bring on move-in day?",
    answer: "Your private room is fully furnished with a double bed, mattress, study desk, ergonomic chair, and wardrobe. You only need your personal bedding, towels, and clothing.",
  },
  {
    id: "faq-6",
    category: "Account",
    question: "How do I invite a guest or visitor?",
    answer: "Day visitors are welcome between 8:00 AM and 10:00 PM. Overnight guest passes can be submitted through the resident app up to 24 hours in advance.",
  },
];

/**
 * Calculates remaining days until target move-in date dynamically
 */
export function getDaysUntilMoveIn(targetDateStr: string = "2026-09-01"): number {
  const target = new Date(targetDateStr);
  const now = new Date();
  const diffTime = target.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(diffDays, 0);
}
