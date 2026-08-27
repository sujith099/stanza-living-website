export interface Review {
  id: string;
  author: string;
  role: string;
  company: string;
  residence: string;
  location: string;
  quote: string;
  stayDuration: string;
  rating: number;
  avatar: string;
}

export const REVIEWS: Review[] = [
  {
    id: "rev-01",
    author: "Tanvi Seshadri",
    role: "Product Designer",
    company: "Swiggy",
    residence: "Oak House",
    location: "Indiranagar, Bengaluru",
    quote: "The metro is a 7-minute walk, and the lane is quiet enough to take morning work calls with the balcony door open. Kitchen is kept clean and housekeeping is reliable.",
    stayDuration: "Resident for 8 months",
    rating: 4.8,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "rev-02",
    author: "Arjun Nambiar",
    role: "Backend Engineer",
    company: "Razorpay",
    residence: "Lake House",
    location: "Gachibowli, Hyderabad",
    quote: "Commuting to DLF Cyber City takes about 10 minutes. The fiber Wi-Fi has not dropped during peak rain, and common area cleaning happens every morning like clockwork.",
    stayDuration: "Resident for 6 months",
    rating: 4.7,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "rev-03",
    author: "Devika Rao",
    role: "Management Consultant",
    company: "EY",
    residence: "Urban House",
    location: "Gurugram, Delhi NCR",
    quote: "Zero brokerage and transparent monthly bills. The Rapid Metro is close by. Street parking can be tight in the evening, but the room itself is spacious and quiet.",
    stayDuration: "Resident for 11 months",
    rating: 4.6,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "rev-04",
    author: "Rahul Varma",
    role: "UI Engineer",
    company: "PhonePe",
    residence: "The Nest",
    location: "Viman Nagar, Pune",
    quote: "Everything from grocery stores to cafés along Lane 2 is within walking distance. The caretaker is responsive whenever a geyser or Wi-Fi issue comes up.",
    stayDuration: "Resident for 5 months",
    rating: 4.8,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
  },
];
