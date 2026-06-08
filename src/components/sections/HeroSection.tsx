"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Calendar, Phone, Star, ArrowRight, ShieldCheck } from "lucide-react";
import { CLINIC_CONFIG, STATS } from "@/lib/data";
import { sanitizePhone } from "@/lib/utils";
import { useCountUp, useCountUpWithWaypoints, useInView } from "@/hooks";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
});

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const bgY  = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-dental-cream"
      aria-label="Hero"
    >
      {/* Subtle background shapes */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-dental-navy-50 opacity-60 blur-3xl" />
        <div className="absolute -bottom-24 -left-16 w-[400px] h-[400px] rounded-full bg-dental-mint-50 opacity-70 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-dental-navy-50/40 blur-3xl" />
      </motion.div>

      <div className="container-dental relative z-10 pt-28 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">
          {/* ── Left content ── */}
          <motion.div style={{ opacity }}>
            {/* Badge */}
            <motion.div {...fadeUp(0)}>
              <div className="badge mb-6 w-fit">
                <span className="w-2 h-2 rounded-full bg-dental-mint animate-pulse-dot flex-shrink-0" />
                Now Accepting New Patients — Same-Day Slots Available
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              {...fadeUp(0.1)}
              className="text-display text-[clamp(2.6rem,5.5vw,4.25rem)] text-dental-slate-900 leading-[1.08] mb-5"
            >
              Creating{" "}
              <em className="not-italic italic text-dental-navy-700">Healthy &amp; Beautiful</em>
              <br />
              Smiles for Life
            </motion.h1>

            {/* Subheadline */}
            <motion.p {...fadeUp(0.2)} className="text-[1.05rem] text-dental-slate-500 leading-[1.75] max-w-[520px] mb-8">
              Personalized dental care using cutting-edge technology and a compassionate,
              patient-first approach — at {CLINIC_CONFIG.name} in {CLINIC_CONFIG.contact.address.city}.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div {...fadeUp(0.3)} className="flex flex-wrap gap-3 mb-8">
              <a href="#appointment" className="btn btn-primary btn-lg gap-2 shadow-dental">
                <Calendar size={18} strokeWidth={2} />
                Book Appointment
                <ArrowRight size={16} className="opacity-70" />
              </a>
              <a
                href={`tel:${sanitizePhone(CLINIC_CONFIG.contact.emergencyPhone)}`}
                className="btn btn-emergency btn-lg gap-2"
                aria-label="Emergency dental care"
              >
                <Phone size={18} strokeWidth={2} />
                Emergency Care
              </a>
            </motion.div>

            {/* Trust indicators */}
            <motion.div {...fadeUp(0.4)} className="flex flex-wrap items-center gap-4">
              {/* Google rating */}
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1,2,3,4,5].map((s) => (
                    <Star key={s} size={15} className="fill-dental-gold text-dental-gold" />
                  ))}
                </div>
                <div>
                  <span className="text-sm font-semibold text-dental-slate-800">4.9</span>
                  <span className="text-xs text-dental-slate-400"> · 1,247 Google Reviews</span>
                </div>
              </div>
              <div className="w-px h-5 bg-dental-slate-200" />
              <div className="flex items-center gap-1.5 text-sm text-dental-slate-500">
                <ShieldCheck size={15} className="text-dental-mint" />
                <span><strong className="text-dental-slate-700">NABH</strong> Accredited</span>
              </div>
              <div className="w-px h-5 bg-dental-slate-200" />
              <div className="text-sm text-dental-slate-500">
                <strong className="text-dental-slate-700">{CLINIC_CONFIG.doctor.experience}+ Years</strong> of Excellence
              </div>
            </motion.div>
          </motion.div>

        </div>

        {/* Stats row */}
        <StatsRow />
      </div>
    </section>
  );
}

function StatItem({ stat, index, inView }: { stat: typeof STATS[number]; index: number; inView: boolean }) {
  // Use a slightly longer duration for a natural count feel, but still smooth
  const duration = 2500;
  const count = stat.waypoints
    ? useCountUpWithWaypoints(stat.waypoints, duration, inView)
    : useCountUp(stat.numericValue, duration, inView);
  // Always display the numeric count (no K abbreviation) so counts look realistic
  const display = `${count}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.03, duration: 0.6 }}
      className="text-center px-4 first:pl-0 last:pr-0"
    >
      {stat.icon && <div className="text-2xl mb-1">{stat.icon}</div>}
      <div className="font-display text-3xl font-medium text-dental-navy-700">
        {display}{stat.suffix}
      </div>
      <div className="text-xs text-dental-slate-400 mt-1 font-medium">{stat.label}</div>
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
      className="mt-16 pt-8 border-t border-dental-slate-200"
    >
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-6">
        {STATS.map((stat, i) => (
          <StatItem key={stat.id} stat={stat} index={i} inView={inView} />
        ))}
      </div>
    </motion.div>
  );
}
