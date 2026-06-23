"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Calendar, Phone, Star, ArrowRight, Sparkles, Shield, Smile } from "lucide-react";
import { CLINIC_CONFIG, STATS } from "@/lib/data";
import { sanitizePhone } from "@/lib/utils";
import { useCountUp, useCountUpWithWaypoints, useInView } from "@/hooks";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
});

// Floating element animation
const float = (delay = 0, distance = 20) => ({
  initial: { y: 0, opacity: 0 },
  animate: { y: [0, -distance, 0], opacity: 1 },
  transition: {
    duration: 4 + delay,
    repeat: Infinity,
    ease: "easeInOut",
    delay,
  },
});

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-white"
      aria-label="Hero"
    >
      {/* Premium gradient background system */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large soft gradient behind image (no circular blobs) */}
        <div className="absolute top-0 right-0 w-[900px] h-[650px] rounded-3xl bg-gradient-to-b from-blue-50 via-blue-100/40 to-transparent blur-3xl opacity-60 -translate-y-1/4" />

        {/* Secondary soft blue glow */}
        <div className="absolute top-1/3 right-1/4 w-[700px] h-[550px] rounded-3xl bg-blue-200/20 blur-3xl" />

        {/* Subtle mint accent */}
        <div className="absolute -bottom-1/3 -left-1/4 w-[600px] h-[500px] rounded-3xl bg-blue-100/15 blur-3xl" />
      </div>



      <div className="container-dental relative z-10 pt-24 pb-16 md:pt-28 md:pb-18 xl:pt-32 xl:pb-20 min-h-[calc(100vh-80px)]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-16 items-center">
          {/* ── Left content ── */}
          <motion.div className="relative z-20 space-y-8">
            {/* Badge */}
            <motion.div {...fadeUp(0)}>
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full backdrop-blur-xl bg-white/50 border border-white/30 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm font-medium text-gray-700">
                  Now Accepting New Patients — Same-Day Slots
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.div {...fadeUp(0.1)}>
              <h1 className="text-[clamp(2.8rem,6vw,4.5rem)] font-display font-light leading-[1.1] text-gray-900">
                Creating{" "}
                <em className="text-dental-navy-600 font-display">Healthy &amp; Beautiful</em>

                <br />
                Smiles for Life
              </h1>
            </motion.div>

            {/* Subheadline */}
            <motion.p
              {...fadeUp(0.2)}
              className="text-lg text-gray-600 leading-relaxed max-w-md font-light"
            >
              Personalized dental care using cutting-edge technology and a compassionate,
              patient-first approach — at {CLINIC_CONFIG.name} in {CLINIC_CONFIG.contact.address.city}.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div {...fadeUp(0.3)} className="flex flex-col sm:flex-row items-start gap-4 pt-4">
              <a
                href="#appointment"
                className="btn btn-primary btn-lg gap-2 inline-flex items-center"
              >
                <Calendar size={20} strokeWidth={2} />
                Book Appointment
                <ArrowRight size={18} className="opacity-70" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl backdrop-blur-xl bg-white/50 border border-white/40 text-gray-700 font-semibold hover:bg-white/70 transition-all duration-300 shadow-lg"
                aria-label="Emergency information"
              >
                <Phone size={20} strokeWidth={2} />
                Emergency Care
              </a>
            </motion.div>

            {/* Trust indicators */}
            <motion.div {...fadeUp(0.4)} className="flex flex-wrap items-center gap-6 pt-2">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={16} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <div>
                  <span className="text-sm font-semibold text-gray-900">4.9</span>
                  <span className="text-xs text-gray-500 ml-1">1,00 Reviews</span>
                </div>
              </div>
              <div className="h-6 w-px bg-gray-200" />
              <div className="text-sm text-gray-600 font-medium">
                <strong className="text-gray-900">{CLINIC_CONFIG.doctor.experience}+ Years</strong> of Excellence
              </div>
            </motion.div>
          </motion.div>

          {/* ── Right visual (Premium image emergence) ── */}
          <div className="relative flex items-center justify-center w-full h-[320px] sm:h-[420px] md:h-[520px] lg:h-[600px]">
            {/* Ambient light orbs */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-3xl bg-gradient-to-t from-blue-500/0 via-blue-400/5 to-blue-300/0 blur-2xl" />
              <div className="absolute -inset-8 rounded-3xl bg-gradient-to-br from-white/40 to-transparent blur-2xl" />
            </div>

            {/* Main image with fade edges */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full h-full"
            >
              {/* Image container with soft blur fade */}
              <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/images/hero-clinic.png"
                  alt="Professional dental clinic with patient and dentist"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />

                {/* Soft fade mask around edges */}
                <div className="absolute inset-0 rounded-3xl pointer-events-none">
                  {/* Top fade */}
                  <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white/30 via-white/10 to-transparent blur-sm" />
                  {/* Bottom fade */}
                  <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/40 via-white/10 to-transparent blur-sm" />
                  {/* Left fade */}
                  <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-white/30 via-white/10 to-transparent blur-sm" />
                  {/* Right fade */}
                  <div className="absolute top-0 bottom-0 right-0 w-20 bg-gradient-to-l from-white/40 via-white/10 to-transparent blur-sm" />
                </div>

                {/* Subtle overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/10 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Glow effect behind image */}
              <div className="absolute inset-0 -m-8 rounded-3xl bg-gradient-to-br from-blue-400/20 to-transparent blur-3xl pointer-events-none -z-10" />
            </motion.div>
          </div>
        </div>

        {/* Stats row */}
        <StatsRow />
      </div>
    </section>
  );
}

function StatItem({ stat, index, inView }: { stat: typeof STATS[number]; index: number; inView: boolean }) {
  const duration = 2500;
  const count = stat.waypoints
    ? useCountUpWithWaypoints(stat.waypoints, duration, inView)
    : useCountUp(stat.numericValue, duration, inView);
  const display = `${count}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.03, duration: 0.6 }}
      className="text-center px-4 first:pl-0 last:pr-0"
    >
      {stat.icon && <div className="text-2xl mb-2">{stat.icon}</div>}
      <div className="font-display text-3xl font-semibold text-blue-900">
        {display}{stat.suffix}
      </div>
      <div className="text-xs text-gray-500 mt-2 font-medium">{stat.label}</div>
    </motion.div>
  );
}

function StatsRow() {
  // Trigger earlier when the top of the section enters viewport to avoid delayed start
  const { ref, inView } = useInView({ threshold: 0.05, rootMargin: '0px 0px -10% 0px' });

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.8, duration: 0.7 }}
      className="mt-16 pt-8 border-t border-gray-200"
    >
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-6">
        {STATS.map((stat, i) => (
          <StatItem key={stat.id} stat={stat} index={i} inView={inView} />
        ))}
      </div>
    </motion.div>
  );
}
