export interface LifestylePillar {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  tag: string;
  image: string;
}

export const LIFESTYLE_PILLARS: LifestylePillar[] = [
  {
    id: "pillar-work",
    number: "01",
    title: "Acoustic Quiet & Deep Work",
    subtitle: "Engineered for focus",
    description: "Every private room and communal studio features sound-attenuating doors, dual 1Gbps backup fiber links, and ergonomic seating so you can build without distraction.",
    tag: "Workplace Grade",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "pillar-hospitality",
    number: "02",
    title: "Invisible Hospitality",
    subtitle: "Zero administrative friction",
    description: "Daily housekeeping, hotel-grade linen replacement, filtered drinking water on tap, and instantaneous maintenance resolution through one tap.",
    tag: "Hotel Standards",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "pillar-sanctuary",
    number: "03",
    title: "Organic Architecture",
    subtitle: "Spaces that breathe",
    description: "We bypass sterile corporate serviced apartments in favor of natural lime plasters, real terracotta tiles, generous ceiling heights, and pocket balconies.",
    tag: "Human Scale",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "pillar-community",
    number: "04",
    title: "Curated, Unforced Culture",
    subtitle: "Warm, respectful peers",
    description: "Live alongside product designers, engineers, independent writers, and founders. We preserve peaceful privacy with casual rooftop coffee on Sunday mornings.",
    tag: "Respectful Community",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1200&auto=format&fit=crop"
  }
];
