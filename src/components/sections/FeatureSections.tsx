"use client";
import { motion } from "framer-motion";
import { useInView } from "@/hooks";
import { WHY_CHOOSE, JOURNEY_STEPS } from "@/lib/data";
import { ArrowRight } from "lucide-react";

function useReveal() {
  const { ref, inView } = useInView();
  return { ref: ref as React.RefObject<HTMLDivElement>, inView };
}

function RevealDiv({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const { ref, inView } = useReveal();
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════ */
/* WHY CHOOSE                                                     */
/* ══════════════════════════════════════════════════════════════ */
export function WhyChooseSection() {
  return (
    <section id="why" className="section-py bg-dental-cream">
      <div className="container-dental">
        <div className="text-center mb-12">
          <RevealDiv><span className="section-tag">Why Choose Us ?</span></RevealDiv>
          <RevealDiv delay={0.1}>
            <h2 className="text-display text-display-lg text-dental-slate-900 mt-1 mb-3">
              The <em className="text-dental-navy-600">PureSmile</em> Difference
            </h2>
          </RevealDiv>
          <RevealDiv delay={0.15}>
            <p className="text-dental-slate-500 max-w-[560px] mx-auto text-base leading-relaxed">
              Clinical excellence, cutting-edge technology, and genuine compassion everything that sets us apart.
            </p>
          </RevealDiv>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 xl:gap-5">
          {WHY_CHOOSE.map((item, i) => {
            const { ref, inView } = useInView();
            return (
              <motion.div
                key={item.id}
                ref={ref as React.RefObject<HTMLDivElement>}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: (i % 3) * 0.09, ease: [0.16, 1, 0.3, 1] }}
                className="card-base p-6 relative overflow-hidden group"
              >
                {/* Large number watermark */}
                <span className="absolute top-2 right-4 font-display text-[5rem] leading-none font-light text-dental-navy-50 select-none pointer-events-none group-hover:text-dental-navy-100 transition-colors">
                  {item.number}
                </span>

                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-base font-semibold text-dental-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-dental-slate-500 leading-relaxed relative z-10">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════ */
/* PATIENT JOURNEY                                                */
/* ══════════════════════════════════════════════════════════════ */
export function JourneySection() {
  return (
    <section
      id="journey"
      className="section-py bg-gradient-to-br from-dental-navy-700 to-dental-navy-900 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/3 -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-dental-mint/10 translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="container-dental relative z-10">
        <div className="text-center mb-14">
          <RevealDiv><span className="text-xs font-semibold uppercase tracking-[0.12em] text-dental-mint">Your Journey</span></RevealDiv>
          <RevealDiv delay={0.1}>
            <h2 className="text-display text-display-lg text-white mt-1 mb-3">
              From First Visit to <em className="italic text-dental-mint">Perfect Smile</em>
            </h2>
          </RevealDiv>
          <RevealDiv delay={0.15}>
            <p className="text-white/55 max-w-[520px] mx-auto text-base leading-relaxed">
              A seamless, guided process designed entirely around your comfort, goals, and timeline.
            </p>
          </RevealDiv>
        </div>

        {/* Desktop: horizontal steps */}
        <div className="hidden md:flex items-start gap-0 relative">
          {/* Connector line */}
          <div className="absolute top-7 left-[calc(10%+28px)] right-[calc(10%+28px)] h-0.5 bg-white/15 overflow-hidden rounded-full">
            <span className="journey-glow-sweep absolute inset-0 block" />
          </div>

          {JOURNEY_STEPS.map((step, i) => {
            const { ref, inView } = useInView();
            return (
              <motion.div
                key={step.id}
                ref={ref as React.RefObject<HTMLDivElement>}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
transition={{ delay: i * 0.06 + 0.08, duration: 0.5 }}
                className="flex-1 flex flex-col items-center text-center px-3 group"
              >
                {/* Step number circle */}
                <div className="journey-step-circle relative z-10 w-14 h-14 rounded-full border-2 border-white/25 bg-white/10 flex items-center justify-center font-display text-xl font-medium text-white mb-4 group-hover:bg-dental-mint group-hover:border-dental-mint transition-all duration-300 group-hover:scale-110">
                  {step.step}
                </div>
                <div className="text-lg mb-1">{step.icon}</div>
                <div className="text-sm font-semibold text-white mb-1.5">{step.title}</div>
                <div className="text-xs text-white/50 leading-relaxed">{step.description}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile: vertical steps */}
        <div className="flex flex-col gap-4 md:hidden">
          {JOURNEY_STEPS.map((step, i) => (
            <RevealDiv key={step.id} delay={i * 0.1} className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-full border border-white/25 bg-white/10 flex items-center justify-center font-display text-lg text-white flex-shrink-0">
                {step.step}
              </div>
              <div className="pt-1">
                <div className="text-sm font-semibold text-white mb-1">{step.icon} {step.title}</div>
                <div className="text-xs text-white/50 leading-relaxed">{step.description}</div>
              </div>
            </RevealDiv>
          ))}
        </div>

        <RevealDiv delay={0.3} className="text-center mt-12">
          <a href="#appointment" className="btn btn-mint btn-lg shadow-mint gap-2">
            Begin Your Journey
            <ArrowRight size={16} />
          </a>
        </RevealDiv>
      </div>
    </section>
  );
}

/* TECHNOLOGY SECTION removed */
