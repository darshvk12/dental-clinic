// ─── Site Config ───────────────────────────────────────────────
export interface ClinicConfig {
  name: string;
  tagline: string;
  doctor: DoctorProfile;
  contact: ContactInfo;
  social: SocialLinks;
  seo: SEOConfig;
}

export interface DoctorProfile {
  name: string;
  title: string;
  qualifications: string[];
  experience: number; // years
  bio: string;
  philosophy: string;
  image?: string;
  fellowships: string[];
}

export interface ContactInfo {
  phone: string;
  emergencyPhone: string;
  email: string;
  address: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    pin: string;
    country: string;
  };
  hours: WorkingHours[];
  mapEmbedUrl?: string;
  coordinates?: { lat: number; lng: number };
}

export interface WorkingHours {
  day: string;
  open: string;
  close: string;
  isEmergency?: boolean;
}

export interface SocialLinks {
  instagram?: string;
  facebook?: string;
  youtube?: string;
  whatsapp?: string;
  twitter?: string;
  linkedin?: string;
}

export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
  canonicalUrl: string;
  locale: string;
}

// ─── Services ──────────────────────────────────────────────────
export interface Service {
  id: string;
  icon: string;
  name: string;
  shortDesc: string;
  description: string;
  benefits: string[];
  duration?: string;
  priceRange?: string;
  isEmergency?: boolean;
  isFeatured?: boolean;
  href: string;
}

// ─── Testimonials ───────────────────────────────────────────────
export interface Testimonial {
  id: string;
  name: string;
  initials: string;
  rating: number;
  review: string;
  treatment: string;
  date: string;
  verified: boolean;
  source: "google" | "practo" | "justdial" | "website";
  avatarBg?: string;
}

// ─── Before / After ─────────────────────────────────────────────
export interface BeforeAfterCase {
  id: string;
  title: string;
  treatment: string;
  duration: string;
  beforeEmoji: string;
  afterEmoji: string;
  beforeImage?: string;
  afterImage?: string;
}

// ─── Technology ─────────────────────────────────────────────────
export interface Technology {
  id: string;
  icon: string;
  name: string;
  description: string;
  benefit: string;
}

// ─── Blog ───────────────────────────────────────────────────────
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  author: string;
  date: string;
  readTime: number;
  emoji: string;
  bgClass: string;
  href: string;
  content: string;
}

export type BlogCategory =
  | "Oral Hygiene"
  | "Cosmetic Dentistry"
  | "Kids Dental Health"
  | "Dental Care Tips"
  | "Dental Technology"
  | "Patient Stories";

// ─── FAQ ────────────────────────────────────────────────────────
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: FAQCategory;
}

export type FAQCategory =
  | "General"
  | "Treatments"
  | "Cost & Insurance"
  | "Appointments"
  | "Technology";

// ─── Insurance ──────────────────────────────────────────────────
export interface InsuranceProvider {
  id: string;
  name: string;
  icon: string;
}

export interface PaymentOption {
  id: string;
  icon: string;
  title: string;
  description: string;
}

// ─── Trust Indicators ────────────────────────────────────────────
export interface TrustBadge {
  id: string;
  icon: string;
  label: string;
}

export interface StatCard {
  id: string;
  value: string;
  numericValue: number;
  suffix: string;
  label: string;
  icon: string;
  waypoints?: number[];
}

// ─── Appointment Form ────────────────────────────────────────────
export interface AppointmentFormData {
  name: string;
  phone: string;
  email: string;
  treatment: string;
  date: string;
  time: string;
  message: string;
}

// ─── Why Choose ─────────────────────────────────────────────────
export interface WhyChooseItem {
  id: string;
  number: string;
  icon: string;
  title: string;
  description: string;
}

// ─── Journey Steps ───────────────────────────────────────────────
export interface JourneyStep {
  id: string;
  step: number;
  title: string;
  description: string;
  icon: string;
}
