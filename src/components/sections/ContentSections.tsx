"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "@/hooks";
import { TRUST_BADGES, CLINIC_CONFIG, SERVICES, BEFORE_AFTER } from "@/lib/data";
import { ArrowRight, GraduationCap, Globe2, Award, CheckCircle2 } from "lucide-react";
import type { Service, BeforeAfterCase } from "@/types";

/* ── Shared animation helpers ──────────────────────────────────── */
function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const { ref, inView } = useInView<T>();
  return { ref, inView };
}

function RevealDiv({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const { ref, inView } = useReveal();
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════ */
/* TRUST BAR                                                      */
/* ══════════════════════════════════════════════════════════════ */
export function TrustBar() {
  return (
    <section className="bg-dental-navy-700 py-4" aria-label="Certifications and trust">
      <div className="container-dental">
        <div className="flex flex-wrap items-center justify-center sm:justify-between gap-x-6 gap-y-3">
          {TRUST_BADGES.map((badge, i) => (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              className="flex items-center gap-2.5"
            >
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-base flex-shrink-0">
                {badge.icon}
              </div>
              <span className="text-white/85 text-xs font-semibold whitespace-nowrap">{badge.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════ */
/* ABOUT SECTION                                                  */
/* ══════════════════════════════════════════════════════════════ */
export function AboutSection() {
  const doc = CLINIC_CONFIG.doctor;
  const qualIcons = [GraduationCap, Award, Globe2, CheckCircle2, Award];

  return (
    <section id="about" className="section-py bg-dental-cream">
      <div className="container-dental">
        <div className="grid lg:grid-cols-2 gap-14 xl:gap-20 items-center">
          {/* Portrait side */}
          <RevealDiv className="relative">
            {/* Main portrait card */}
            <div className="relative rounded-[2rem] overflow-hidden bg-gradient-to-br from-dental-navy-100 to-dental-navy-200 aspect-[0.85] flex items-end">
              {/* Portrait image (place your image at public/images/dr-pooja.jpg) */}
              <img
                src="/images/dr-pooja-bala.jpeg"
                alt={doc.name}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" aria-hidden="true" />


              {/* Bottom overlay */}
              <div className="relative z-10 w-full bg-white/95 backdrop-blur-sm m-4 rounded-xl p-4 shadow-card">
                <div className="text-[0.65rem] font-bold uppercase tracking-[0.12em] text-dental-navy-500 mb-1">Chief Dental Surgeon</div>
                <div className="font-display text-xl font-medium text-dental-slate-900">{doc.name}</div>
                <div className="text-xs text-dental-slate-500">{doc.title}</div>
              </div>
            </div>

            
          </RevealDiv>

          {/* Content side */}
          <div>
            <RevealDiv><span className="section-tag">About the Doctor</span></RevealDiv>
            <RevealDiv delay={0.1}>
              <h2 className="text-display text-display-lg text-dental-slate-900 mb-3">
                A Passion for <em className="text-dental-navy-600">Transforming Smiles</em>
              </h2>
            </RevealDiv>
            <div className="divider-dental" />
            <RevealDiv delay={0.2}>
              <p className="text-dental-slate-500 leading-relaxed mb-6">{doc.bio}</p>
            </RevealDiv>

            {/* Qualifications */}
            <RevealDiv delay={0.25}>
              <h3 className="text-sm font-bold uppercase tracking-widest text-dental-slate-400 mb-3">Qualifications & Memberships</h3>
              <div className="space-y-2.5">
                {doc.qualifications.map((q, i) => {
                  const Icon = qualIcons[i % qualIcons.length];
                  return (
                    <div key={q} className="flex items-start gap-3 bg-dental-navy-50 rounded-xl p-3 text-sm text-dental-slate-700">
                      <Icon size={16} className="text-dental-navy-500 mt-0.5 flex-shrink-0" />
                      <span>{q}</span>
                    </div>
                  );
                })}
              </div>
            </RevealDiv>

            {/* Philosophy quote */}
            <RevealDiv delay={0.35} className="mt-6">
              <blockquote className="relative bg-dental-slate-900 text-white rounded-2xl p-6 overflow-hidden">
                <div className="absolute -top-3 left-4 font-display text-[6rem] leading-none text-white/8 select-none">"</div>
                <p className="font-display text-lg font-light italic leading-relaxed relative z-10">
                  "{doc.philosophy}"
                </p>
                <footer className="mt-3 text-xs text-white/50 relative z-10">— {doc.name}</footer>
              </blockquote>
            </RevealDiv>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════ */
/* SERVICE CARD                                                   */
/* ══════════════════════════════════════════════════════════════ */
function ServiceCard({ service, index }: { service: Service; index: number }) {
  const { ref, inView } = useReveal<HTMLAnchorElement>();
  const imageSrc = "/images/teethcleaningservices.jpg";
  const href = service.isEmergency ? `tel:${CLINIC_CONFIG.contact.emergencyPhone}` : "#appointment";

  return (
    <motion.a
      ref={ref}
      href={href}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative card-base p-6 flex flex-col overflow-hidden transition-all duration-300 ${service.isEmergency ? "bg-dental-navy-900 border-dental-navy-800" : "hover:-translate-y-0.5 hover:shadow-card-hover"}`}
      aria-label={service.isEmergency ? `Call emergency line for ${service.name}` : `Book ${service.name} treatment`}
    >
      {service.isFeatured && !service.isEmergency && (
        <div className="absolute top-4 right-4 bg-dental-mint/10 text-dental-mint-600 text-[0.65rem] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-dental-mint/20">
          Popular
        </div>
      )}

      <div className="relative overflow-hidden -mx-6 -mt-6 mb-4 h-56">
        <Image
          src={imageSrc}
          alt={service.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      {/* Name */}
      <h3 className={`text-base font-semibold mb-2 ${service.isEmergency ? "text-white" : "text-dental-slate-900"}`}>
        {service.name}
      </h3>

      {/* Short desc */}
      {service.shortDesc && (
        <p className={`text-sm leading-relaxed mb-3 ${service.isEmergency ? "text-white/60" : "text-dental-slate-500"}`}>
          {service.shortDesc}
        </p>
      )}

      {/* Benefits */}
      {service.benefits.length > 0 && (
        <ul className="space-y-1.5 mb-4 flex-1">
          {service.benefits.map((b) => (
            <li key={b} className={`flex items-start gap-2 text-xs ${service.isEmergency ? "text-white/70" : "text-dental-slate-600"}`}>
              <span className="text-dental-mint mt-0.5 flex-shrink-0 font-bold">✓</span>
              {b}
            </li>
          ))}
        </ul>
      )}

      {/* Pricing hint */}
      {service.priceRange && (
        <div className={`text-xs mb-3 ${service.isEmergency ? "text-white/40" : "text-dental-slate-400"}`}>
          Starting from <strong className={service.isEmergency ? "text-white/70" : "text-dental-slate-600"}>
            {service.priceRange.split("–")[0]}
          </strong>
        </div>
      )}

      {/* CTA */}
      <span className={`btn ${service.isEmergency ? "btn-ghost text-white border-white/30" : "btn-primary"} btn-sm gap-2 w-full justify-center mt-auto`}>
        {service.isEmergency ? "Call Emergency Line" : "Book This Treatment"}
        <ArrowRight size={13} />
      </span>
    </motion.a>
  );
}

/* ══════════════════════════════════════════════════════════════ */
/* SERVICES SECTION                                               */
/* ══════════════════════════════════════════════════════════════ */
export function ServicesSection() {
  return (
    <section id="services" className="section-py bg-dental-slate-50">
      <div className="container-dental">
        <div className="text-center mb-12">
          <RevealDiv><span className="section-tag">Our Services</span></RevealDiv>
          <RevealDiv delay={0.1}>
            <h2 className="text-display text-display-lg text-dental-slate-900 mt-1 mb-3">
              World-Class <em className="text-dental-navy-600">Dental Treatments</em>
            </h2>
          </RevealDiv>
          <RevealDiv delay={0.15}>
            <p className="text-dental-slate-500 max-w-[560px] mx-auto text-base leading-relaxed">
              From routine hygiene to full smile transformations — every treatment under one roof,
              delivered by multi-specialty experts.
            </p>
          </RevealDiv>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 xl:gap-5">
          {SERVICES.map((svc, i) => (
            <ServiceCard key={svc.id} service={svc} index={i} />
          ))}
        </div>

        <RevealDiv delay={0.2} className="text-center mt-10">
          <p className="text-dental-slate-400 text-sm mb-4">Not sure which treatment you need?</p>
          <a href="#appointment" className="btn btn-ghost btn-md">
            Book a Free Consultation <ArrowRight size={15} />
          </a>
        </RevealDiv>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════ */
/* BEFORE & AFTER SECTION                                         */
/* ══════════════════════════════════════════════════════════════ */
function BACard({ item, index }: { item: BeforeAfterCase; index: number }) {
  const { ref, inView } = useReveal();
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl overflow-hidden bg-dental-slate-800 group"
    >
      {/* Image comparison */}
      <div className="grid grid-cols-2 h-48 relative">
        {/* Before */}
        <div className="bg-gradient-to-br from-dental-slate-700 to-dental-slate-900 flex items-center justify-center text-4xl relative overflow-hidden">
          {item.beforeImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={item.beforeImage} alt={`${item.title} — before`} className="w-full h-full object-contain z-0" loading="lazy" />
          )}
          <span className="absolute top-2.5 left-2.5 text-[0.6rem] font-bold uppercase tracking-wider bg-black/50 text-white/90 px-2 py-1 rounded-md z-10">
            Before
          </span>
        </div>
        {/* After */}
        <div className="bg-gradient-to-br from-dental-navy-700 to-dental-navy-900 flex items-center justify-center text-4xl relative overflow-hidden">
          {item.afterImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={item.afterImage} alt={`${item.title} — after`} className="w-full h-full object-contain z-0" loading="lazy" />
          )}
          <span className="absolute top-2.5 left-2.5 text-[0.6rem] font-bold uppercase tracking-wider bg-dental-mint/80 text-white px-2 py-1 rounded-md z-10">
            After
          </span>
        </div>
        {/* Divider */}
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-0.5 bg-white/20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white text-xs font-bold">
          ↔
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="font-semibold text-white text-sm mb-1">{item.title}</div>
        <div className="text-white/50 text-xs mb-1">{item.treatment}</div>
        <div className="text-dental-mint text-[0.7rem] font-medium">⏱ {item.duration}</div>
      </div>
    </motion.div>
  );
}

export function BeforeAfterSection() {
  return (
    <section id="gallery" className="section-py bg-dental-slate-900">
      <div className="container-dental">
        <div className="text-center mb-12">
          <RevealDiv><span className="text-xs font-semibold uppercase tracking-[0.12em] text-dental-mint">Real Transformations</span></RevealDiv>
          <RevealDiv delay={0.1}>
            <h2 className="text-display text-display-lg text-white mt-1 mb-3">
              Before &amp; After <em className="italic text-dental-mint">Smile Gallery</em>
            </h2>
          </RevealDiv>
          <RevealDiv delay={0.15}>
            <p className="text-white/55 max-w-[520px] mx-auto text-base leading-relaxed">
              Real patients, real results. Every transformation is unique, personalised, and life-changing.
            </p>
          </RevealDiv>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {BEFORE_AFTER.map((item, i) => (
            <BACard key={item.id} item={item} index={i} />
          ))}
        </div>

        <RevealDiv delay={0.2} className="text-center mt-10">
          <a href="#appointment" className="btn btn-mint btn-md shadow-mint">
            Start Your Transformation <ArrowRight size={15} />
          </a>
        </RevealDiv>
      </div>
    </section>
  );
}
