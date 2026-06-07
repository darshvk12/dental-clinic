"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ArrowUp, Phone } from "lucide-react";
import { CLINIC_CONFIG } from "@/lib/data";
import { sanitizePhone } from "@/lib/utils";

export default function StickyUI() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showCTA, setShowCTA] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setShowScrollTop(y > 600);
      setShowCTA(y > 300);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Sticky booking CTA (bottom right) */}
      <AnimatePresence>
        {showCTA && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-6 right-6 z-50 flex flex-col gap-2"
          >
            <a
              href="#appointment"
              className="flex items-center gap-2 bg-dental-navy-700 text-white px-5 py-3 rounded-full text-sm font-semibold shadow-[0_8px_32px_rgba(15,45,94,0.35)] hover:bg-dental-navy-800 hover:shadow-[0_12px_40px_rgba(15,45,94,0.45)] transition-all active:scale-95"
              aria-label="Book appointment"
            >
              <Calendar size={16} strokeWidth={2.5} />
              Book Appointment
            </a>
            <a
              href={`tel:${sanitizePhone(CLINIC_CONFIG.contact.emergencyPhone)}`}
              className="flex items-center justify-center gap-2 bg-red-600 text-white px-5 py-2.5 rounded-full text-xs font-semibold shadow-lg hover:bg-red-700 transition-all active:scale-95"
              aria-label="Call emergency line"
            >
              <Phone size={13} strokeWidth={2.5} />
              Emergency
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll to top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 left-6 z-50 w-10 h-10 rounded-full bg-dental-slate-800/80 backdrop-blur-sm border border-white/10 text-white/70 hover:text-white hover:bg-dental-slate-700 flex items-center justify-center transition-all shadow-lg"
            aria-label="Scroll to top"
          >
            <ArrowUp size={16} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
