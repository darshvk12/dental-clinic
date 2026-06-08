"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Calendar, Menu, X, ChevronDown } from "lucide-react";
import { cn, sanitizePhone } from "@/lib/utils";
import { CLINIC_CONFIG } from "@/lib/data";

const NAV_LINKS = [
  { label: "About",       href: "/#about" },
  { label: "Services",    href: "/#services" },
  { label: "Smile Gallery", href: "/#gallery" },
  { label: "Reviews",     href: "/#testimonials" },
  { label: "Blog",        href: "/#blog" },
  { label: "Contact",     href: "/#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [mobileOpen, setMobile]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-white/95 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.06)] py-0"
            : "bg-dental-cream/90 backdrop-blur-md py-0"
        )}
      >
        <div className="container-dental">
          <div className="flex items-center justify-between h-[72px]">
            {/* Logo */}
            <Link href="/" className="flex items-center group" aria-label="Dr. Pooja Bala Home">
              <img
                src="/dr-pooja-bala-dentist-logo.svg"
                alt="Dr. Pooja Bala logo"
                className="h-12 w-auto"
                loading="eager"
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-3.5 py-2 text-sm font-medium text-dental-slate-600 hover:text-dental-navy-700 rounded-lg hover:bg-dental-navy-50 transition-all duration-200"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* CTA buttons */}
            <div className="hidden md:flex items-center gap-2.5">
              <a
                href={`tel:${sanitizePhone(CLINIC_CONFIG.contact.phone)}`}
                className="btn btn-ghost btn-sm gap-1.5"
                aria-label="Call clinic"
              >
                <Phone size={14} strokeWidth={2.5} />
                <span className="hidden lg:inline">{CLINIC_CONFIG.contact.phone}</span>
                <span className="lg:hidden">Call</span>
              </a>
              <a href="/#appointment" className="btn btn-primary btn-sm gap-1.5">
                <Calendar size={14} strokeWidth={2.5} />
                Book Appointment
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobile((v) => !v)}
              className="lg:hidden p-2 rounded-lg text-dental-slate-600 hover:bg-dental-slate-100 transition-colors"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <ProgressBar />
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-white lg:hidden flex flex-col pt-[72px]"
          >
            <div className="flex-1 overflow-y-auto p-6">
              <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
                {NAV_LINKS.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobile(false)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                    className="text-lg font-medium text-dental-slate-800 py-3.5 px-4 rounded-xl hover:bg-dental-navy-50 hover:text-dental-navy-700 transition-colors border-b border-dental-slate-100 last:border-0"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>

              <div className="mt-8 flex flex-col gap-3">
                <a
                  href="/#appointment"
                  onClick={() => setMobile(false)}
                  className="btn btn-primary btn-lg w-full justify-center"
                >
                  <Calendar size={18} /> Book Appointment
                </a>
                <a
                  href={`tel:${sanitizePhone(CLINIC_CONFIG.contact.emergencyPhone)}`}
                  className="btn btn-emergency btn-lg w-full justify-center"
                >
                  <Phone size={18} /> Emergency: {CLINIC_CONFIG.contact.emergencyPhone}
                </a>
              </div>

              {/* Contact quick info */}
              <div className="mt-8 p-4 bg-dental-slate-50 rounded-2xl space-y-2">
                <p className="text-xs font-semibold uppercase tracking-widest text-dental-slate-400 mb-3">Clinic Hours</p>
                {CLINIC_CONFIG.contact.hours.map((h) => (
                  <div key={h.day} className="flex justify-between text-sm">
                    <span className={cn("font-medium", h.isEmergency ? "text-red-600" : "text-dental-slate-700")}>{h.day}</span>
                    <span className="text-dental-slate-500">{h.close ? `${h.open} – ${h.close}` : h.open}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function ProgressBar() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      setProgress((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-dental-slate-100">
      <div
        className="h-full bg-dental-mint transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
