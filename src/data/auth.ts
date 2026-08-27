export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: "seeker" | "resident";
}

export interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password?: string;
  accountType?: "seeker" | "resident";
}

export interface OnboardingPreferences {
  city: string;
  routine: "Work" | "College" | "Both" | "Not sure yet";
  locationName: string;
  budgetMin: number;
  budgetMax: number;
  roomType: "Private" | "Twin sharing" | "Triple sharing" | "No preference";
  lifestyle: string[];
}

export interface CityOption {
  id: string;
  name: string;
  state: string;
  tagline: string;
}

export interface RoomTypeOption {
  id: "Private" | "Twin sharing" | "Triple sharing" | "No preference";
  title: string;
  subtitle: string;
  description: string;
  typicalRent: string;
}

export const ONBOARDING_CITIES: CityOption[] = [
  { id: "bengaluru", name: "Bengaluru", state: "Karnataka", tagline: "Startups, leafy avenues & specialty cafés" },
  { id: "hyderabad", name: "Hyderabad", state: "Telangana", tagline: "Tech corridors, biryani & rapid transit" },
  { id: "pune", name: "Pune", state: "Maharashtra", tagline: "Universities, IT campuses & green weather" },
  { id: "delhi-ncr", name: "Delhi NCR", state: "Gurugram & Noida", tagline: "High-speed metro & corporate headquarters" },
  { id: "chennai", name: "Chennai", state: "Tamil Nadu", tagline: "Coastal culture, IT expressway & music" },
  { id: "mumbai", name: "Mumbai", state: "Maharashtra", tagline: "Harbor views, non-stop energy & suburban rail" },
];

export const ROOM_TYPE_OPTIONS: RoomTypeOption[] = [
  {
    id: "Private",
    title: "PRIVATE ROOM",
    subtitle: "Your own space.",
    description: "Dedicated acoustic quiet, private study desk, and ensuite bath.",
    typicalRent: "From ₹16,000 / mo",
  },
  {
    id: "Twin sharing",
    title: "TWIN SHARING",
    subtitle: "More social, easier on the budget.",
    description: "Two curated single beds, individual study desks, and shared ensuite bath.",
    typicalRent: "From ₹11,500 / mo",
  },
  {
    id: "Triple sharing",
    title: "TRIPLE SHARING",
    subtitle: "Maximum value for students.",
    description: "Spacious layout with separate storage lockers and generous shared area.",
    typicalRent: "From ₹8,500 / mo",
  },
  {
    id: "No preference",
    title: "NO PREFERENCE",
    subtitle: "Show me the best matches.",
    description: "Open to both private and shared spaces based on neighbourhood vibe.",
    typicalRent: "Any price bracket",
  },
];

export const LIFESTYLE_TAGS = [
  "Quiet hours",
  "Social & community",
  "Near metro",
  "Short office commute",
  "Near campus",
  "Budget-friendly",
  "Premium furnishings",
  "Terrace & natural light",
  "Power backup",
  "Pet friendly",
];

export const INITIAL_PREFERENCES: OnboardingPreferences = {
  city: "Bengaluru",
  routine: "Work",
  locationName: "Indiranagar",
  budgetMin: 12000,
  budgetMax: 22000,
  roomType: "Private",
  lifestyle: ["Quiet hours", "Near metro", "Short office commute"],
};
