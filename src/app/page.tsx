import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StickyUI from "@/components/ui/StickyUI";

import HeroSection from "@/components/sections/HeroSection";
import { TrustBar, AboutSection, ServicesSection, BeforeAfterSection } from "@/components/sections/ContentSections";
import { WhyChooseSection, JourneySection } from "@/components/sections/FeatureSections";
import { TestimonialsSection, FAQSection, BlogSection } from "@/components/sections/SocialProofSections";
import AppointmentSection from "@/components/sections/AppointmentSection";
import ContactSection from "@/components/sections/ContactSection";
import { CLINIC_CONFIG } from "@/lib/data";

export const metadata: Metadata = {
  title: CLINIC_CONFIG.seo.title,
  description: CLINIC_CONFIG.seo.description,
};

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main id="main-content" tabIndex={-1}>
        {/* 1. Hero */}
        <HeroSection />

        {/* 2. Trust Bar */}
        <TrustBar />

        {/* 3. About Doctor */}
        <AboutSection />

        {/* 4. Services */}
        <ServicesSection />

        {/* 5. Before & After */}
        <BeforeAfterSection />

        {/* 6. Why Choose */}
        <WhyChooseSection />

        {/* 7. Patient Journey */}
        <JourneySection />

        {/* 8. Technology (removed) */}

        {/* 9. Testimonials */}
        <TestimonialsSection />

        {/* 10. FAQ */}
        <FAQSection />

        {/* 12. Blog */}
        <BlogSection />

        {/* 13. Book Appointment */}
        <AppointmentSection />

        {/* 14. Contact */}
        <ContactSection />
      </main>

      <Footer />
      <StickyUI />
    </>
  );
}
