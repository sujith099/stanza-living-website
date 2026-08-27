export interface BrokenStep {
  number: string;
  title: string;
  detail: string;
}

export interface RoomlyPrinciple {
  number: string;
  title: string;
  summary: string;
  detail: string;
}

export type StanzaPrinciple = RoomlyPrinciple;

export interface BeliefItem {
  number: string;
  title: string;
  tagline: string;
  description: string;
}

export interface TimelineStage {
  step: string;
  title: string;
  tagline: string;
  description: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface CommunityMoment {
  moment: string;
  caption: string;
  image: string;
}

export const BROKEN_STEPS: BrokenStep[] = [
  {
    number: "01",
    title: "Search everywhere.",
    detail: "Jumping across multiple classified portals, fragmented broker chats, and unverified social posts.",
  },
  {
    number: "02",
    title: "Message everyone.",
    detail: "Reaching out to dozens of contacts without knowing if the room is still available or long gone.",
  },
  {
    number: "03",
    title: "Wait for replies.",
    detail: "Endless hours waiting for callbacks, vague descriptions, and inconsistent contact points.",
  },
  {
    number: "04",
    title: "Visit places that don't match.",
    detail: "Showing up in person only to realize the photos were from five years ago or a completely different unit.",
  },
  {
    number: "05",
    title: "Discover unexpected costs.",
    detail: "Surprise brokerage fees, unexplained maintenance levies, and rigid deposit locks at checkout.",
  },
  {
    number: "06",
    title: "Start searching again.",
    detail: "Exhausted, frustrated, and forced back to square one just days before your new job or semester starts.",
  },
];

export const ROOMLY_PRINCIPLES: RoomlyPrinciple[] = [
  {
    number: "01",
    title: "See clearly.",
    summary: "Real photos. Clear information.",
    detail: "High-resolution architectural documentation of the exact room, bed, desk, and bath you will live in.",
  },
  {
    number: "02",
    title: "Compare honestly.",
    summary: "Understand what you're paying for.",
    detail: "Transparent itemized costs with utilities, high-speed Wi-Fi, and maintenance accounted for upfront.",
  },
  {
    number: "03",
    title: "Choose confidently.",
    summary: "Know where you're going before you move.",
    detail: "Neighborhood connectivity, walking times to metro and coffee, and verified resident reviews.",
  },
];

export const STANZA_PRINCIPLES = ROOMLY_PRINCIPLES;

export const BELIEFS: BeliefItem[] = [
  {
    number: "01",
    title: "TRANSPARENCY",
    tagline: "Rent shouldn't be a puzzle.",
    description: "Every utility, service, and security deposit term must be plain and clear before anyone sends a rupee.",
  },
  {
    number: "02",
    title: "TRUST",
    tagline: "What you see should be what you get.",
    description: "No wide-angle lens trickery. No stock photos from other buildings. Verified on-site by people who care.",
  },
  {
    number: "03",
    title: "COMMUNITY",
    tagline: "Where you live should feel like somewhere you belong.",
    description: "Good neighbors, quiet corners for deep focus, and shared tables where strangers turn into lifelong friends.",
  },
  {
    number: "04",
    title: "SIMPLICITY",
    tagline: "Moving is already complicated enough.",
    description: "Digital discovery, scheduled visits, and transparent escrow reservations without the broker hassle.",
  },
];

export const TIMELINE_STAGES: TimelineStage[] = [
  {
    step: "01",
    title: "The idea",
    tagline: "Make room discovery simpler.",
    description: "Frustrated by our own relocations to Bengaluru, we realized young professionals spend weeks navigating broker friction for simple living essentials.",
  },
  {
    step: "02",
    title: "First homes",
    tagline: "Start with the places people actually live.",
    description: "Partnered directly with high-standard property curators in Indiranagar and Koramangala to pilot transparent, verified rooms.",
  },
  {
    step: "03",
    title: "The platform",
    tagline: "Bring search, comparison and booking together.",
    description: "Built the digital living experience — pairing editorial design with realistic photography, map walking times, and direct visit booking.",
  },
  {
    step: "04",
    title: "The community",
    tagline: "Build an experience that continues after move-in.",
    description: "Expanded our focus to on-site support, 1Gbps fiber connectivity, quiet hour agreements, and reliable housekeeping.",
  },
  {
    step: "05",
    title: "What's next",
    tagline: "Make moving to a new city feel less uncertain.",
    description: "Expanding curated residence networks across Hyderabad, Pune, Delhi NCR, Mumbai, and Chennai.",
  },
];

export const PROTOTYPE_STATS = [
  { value: "124+", label: "Homes listed", sub: "in active beta" },
  { value: "6", label: "Cities mapped", sub: "major metros" },
  { value: "4.8", label: "Average rating", sub: "from verified stays" },
  { value: "24/7", label: "Support team", sub: "on-site & digital" },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Aarav",
    role: "Product & Strategy",
    bio: "Turns messy urban moving problems into simpler, calmer product decisions.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Meera",
    role: "Design & Brand",
    bio: "Obsessed with editorial typography, warm natural textures, and humane digital spaces.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Dev",
    role: "Engineering",
    bio: "Builds fast, accessible web architectures that stay snappy even on unpredictable transit networks.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Ananya",
    role: "Community & Curations",
    bio: "Spends her days visiting residences, checking acoustics, and talking with neighborhood locals.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
  },
];

export const COMMUNITY_MOMENTS: CommunityMoment[] = [
  {
    moment: "Morning",
    caption: "Your first coffee in a new neighbourhood.",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop",
  },
  {
    moment: "Work",
    caption: "A quiet desk setup that lets you focus.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop",
  },
  {
    moment: "Community",
    caption: "People who become familiar, friendly faces.",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop",
  },
  {
    moment: "Living",
    caption: "Sunlight, plants, and natural ventilation.",
    image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=800&auto=format&fit=crop",
  },
  {
    moment: "Kitchen",
    caption: "Shared dinners after a long day in the city.",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=800&auto=format&fit=crop",
  },
  {
    moment: "Neighbourhood",
    caption: "Canopy trees and weekend evening walks.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
  },
];

export const RESIDENT_VOICE_QUOTE = {
  quote: "I wasn't looking for the fanciest room in Bangalore. I wanted somewhere honest, with a reliable desk and quiet mornings, that made my everyday easier.",
  author: "Siddharth V.",
  role: "Backend Engineer",
  city: "Indiranagar, Bengaluru",
};

export const FUTURE_VISION_ITEMS = [
  {
    title: "Better discovery",
    description: "Commute-first search connecting office clusters directly with residential pockets.",
  },
  {
    title: "Smarter recommendations",
    description: "Matching rooms based on your acoustic preferences and remote-work rhythm.",
  },
  {
    title: "More transparent pricing",
    description: "Standardized all-inclusive pricing with zero brokerage and verified escrow guarantees.",
  },
  {
    title: "Resident community",
    description: "Neighborhood meetups, shared interest circles, and local culinary perks.",
  },
  {
    title: "Simpler move-ins",
    description: "Digital keys, seamless inventory check-ins, and same-day luggage transfers.",
  },
];
