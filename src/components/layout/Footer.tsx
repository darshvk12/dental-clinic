import Link from "next/link";
import { CLINIC_CONFIG, SERVICES } from "@/lib/data";
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube, MessageCircle } from "lucide-react";

const FOOTER_LINKS = {
  services: SERVICES.slice(0, 7).map(s => ({ label: s.name, href: s.href })),
  clinic: [
    { label: "About Dr. Pooja Bala",    href: "#about" },
    { label: "Smile Gallery",           href: "#gallery" },
    { label: "Patient Reviews",         href: "#testimonials" },
    { label: "FAQ",                     href: "#faq" },
    { label: "Blog & Tips",             href: "#blog" },
    { label: "Book Appointment",        href: "#appointment" },
  ],
  legal: [
    { label: "Privacy Policy",     href: "/privacy" },
    { label: "Terms of Use",       href: "/terms" },
    { label: "Cookie Policy",      href: "/cookies" },
    { label: "Sitemap",            href: "/sitemap.xml" },
  ],
};

const SOCIAL_LINKS = [
  { label: "Instagram", href: CLINIC_CONFIG.social.instagram ?? "#", Icon: Instagram },
  { label: "Facebook",  href: CLINIC_CONFIG.social.facebook  ?? "#", Icon: Facebook },
  { label: "YouTube",   href: CLINIC_CONFIG.social.youtube   ?? "#", Icon: Youtube },
  { label: "WhatsApp",  href: CLINIC_CONFIG.social.whatsapp  ?? "#", Icon: MessageCircle },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const { address, phone, email } = CLINIC_CONFIG.contact;

  return (
    <footer className="bg-dental-slate-900 text-white" role="contentinfo">
      {/* Main footer */}
      <div className="container-dental py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-[2fr_1.2fr_1.2fr_1.2fr] gap-10 lg:gap-12">
          {/* Brand column */}
          <div>
            <Link href="/" className="inline-flex items-center mb-4 group" aria-label="Dr. Pooja Bala Home">
              <img
                src="/dr-pooja-bala-dentist-logo.svg"
                alt="Dr. Pooja Bala logo"
                className="h-12 w-auto"
                loading="eager"
              />
            </Link>

            <p className="text-white/45 text-sm leading-relaxed mb-5 max-w-[260px]">
              Creating healthy, beautiful smiles since 2009. Trusted by{" "}
              <strong className="text-white/65">10,000+ patients</strong> across Agra.
            </p>

            {/* Doctor profile card removed — moved to About section */}

            {/* Quick contact */}
            <div className="space-y-2.5 mb-5">
              <a href={`tel:${phone}`} className="flex items-center gap-2.5 text-sm text-white/55 hover:text-white transition-colors group">
                <Phone size={14} className="text-dental-mint flex-shrink-0" />
                {phone}
              </a>
              <a href={`mailto:${email}`} className="flex items-center gap-2.5 text-sm text-white/55 hover:text-white transition-colors">
                <Mail size={14} className="text-dental-mint flex-shrink-0" />
                {email}
              </a>
              <div className="flex items-start gap-2.5 text-sm text-white/55">
                <MapPin size={14} className="text-dental-mint flex-shrink-0 mt-0.5" />
                <span>{address.line1}, {address.city} {address.pin}</span>
              </div>
            </div>

            {/* Social */}
            <div className="flex gap-2">
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank" rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center text-white/60 hover:bg-dental-mint hover:text-white hover:border-dental-mint transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.1em] text-white/35 mb-4">Services</h3>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.services.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="text-sm text-white/55 hover:text-white transition-colors hover:translate-x-1 inline-block">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Clinic */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.1em] text-white/35 mb-4">Clinic</h3>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.clinic.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="text-sm text-white/55 hover:text-white transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours & Emergency */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.1em] text-white/35 mb-4">Opening Hours</h3>
            <div className="space-y-2">
              {CLINIC_CONFIG.contact.hours.map((h) => (
                <div key={h.day} className="flex flex-col gap-0.5">
                  <span className={`text-xs font-semibold ${h.isEmergency ? "text-red-400" : "text-white/75"}`}>
                    {h.day}
                  </span>
                  <span className="text-xs text-white/40">
                    {h.close ? `${h.open} – ${h.close}` : h.open}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 p-3.5 bg-red-900/30 border border-red-500/20 rounded-xl">
              <div className="text-xs font-bold text-red-300 mb-1">🚨 Dental Emergency?</div>
              <a href={`tel:${CLINIC_CONFIG.contact.emergencyPhone}`} className="text-xs font-semibold text-white hover:text-dental-mint transition-colors block">
                {CLINIC_CONFIG.contact.emergencyPhone}
              </a>
              <div className="text-[0.65rem] text-white/35 mt-0.5">Available 24/7</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8">
        <div className="container-dental py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-white/30">
              © {year} Dr. Pooja Bala. All rights reserved. Crafted with care in Mumbai.
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 justify-center sm:justify-end">
              {FOOTER_LINKS.legal.map(({ label, href }) => (
                <a key={label} href={href} className="text-xs text-white/30 hover:text-white/60 transition-colors">
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
