"use client";
import { motion } from "framer-motion";
import { useInView } from "@/hooks";
import { CLINIC_CONFIG } from "@/lib/data";
import { MapPin, Phone, Mail, Clock, ArrowRight, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

function useReveal() {
  const { ref, inView } = useInView();
  return { ref: ref as React.RefObject<HTMLDivElement>, inView };
}

function RevealDiv({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const { ref, inView } = useReveal();
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}>{children}</motion.div>
  );
}

export default function ContactSection() {
  const { address, phone, emergencyPhone, email, hours } = CLINIC_CONFIG.contact;
  const fullAddress = `${address.line1}${address.line2 ? ", " + address.line2 : ""}, ${address.city}, ${address.state} ${address.pin}`;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;

  return (
    <section id="contact" className="section-py bg-white">
      <div className="container-dental">
        <div className="text-center mb-12">
          <RevealDiv><span className="section-tag">Visit Us</span></RevealDiv>
          <RevealDiv delay={0.1}>
            <h2 className="text-display text-display-lg text-dental-slate-900 mt-1 mb-3">
              Find Our <em className="text-dental-navy-600">Clinic</em>
            </h2>
          </RevealDiv>
          <RevealDiv delay={0.15}>
            <p className="text-dental-slate-500 max-w-[460px] mx-auto text-base leading-relaxed">
                          </p>
          </RevealDiv>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 xl:gap-14 items-start">
          {/* Info side */}
          <div className="space-y-4">
            {/* Address */}
            <RevealDiv>
              <ContactCard icon={MapPin} iconBg="bg-dental-navy-50" iconColor="text-dental-navy-600" title="Our Address">
                <p className="text-dental-slate-600 text-sm leading-relaxed">{address.line1}</p>
                {address.line2 && <p className="text-dental-slate-500 text-sm">{address.line2}</p>}
                <p className="text-dental-slate-600 text-sm font-medium">{address.city}, {address.state} — {address.pin}</p>
                <a
                  href={mapsUrl}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-dental-navy-600 hover:text-dental-navy-800 mt-2 transition-colors"
                >
                  <ExternalLink size={12} /> Get Directions on Google Maps
                </a>
              </ContactCard>
            </RevealDiv>

            {/* Phone */}
            <RevealDiv delay={0.08}>
              <ContactCard icon={Phone} iconBg="bg-dental-mint-50" iconColor="text-dental-mint-600" title="Phone">
                <a href={`tel:${phone}`} className="text-dental-slate-700 text-sm font-semibold hover:text-dental-navy-700 transition-colors block">
                  {phone}
                </a>
                <a href={`tel:${emergencyPhone}`} className="inline-flex items-center gap-1.5 text-xs text-red-500 font-semibold mt-1 hover:text-red-700 transition-colors">
                  🚨 Emergency: {emergencyPhone}
                </a>
              </ContactCard>
            </RevealDiv>

            {/* Email */}
            <RevealDiv delay={0.12}>
              <ContactCard icon={Mail} iconBg="bg-purple-50" iconColor="text-purple-600" title="Email">
                <a href={`mailto:${email}`} className="text-dental-slate-700 text-sm font-semibold hover:text-dental-navy-700 transition-colors">
                  {email}
                </a>
                <p className="text-dental-slate-400 text-xs mt-1">We reply to all emails within 4 hours.</p>
              </ContactCard>
            </RevealDiv>

            {/* Hours */}
            <RevealDiv delay={0.16}>
              <ContactCard icon={Clock} iconBg="bg-amber-50" iconColor="text-amber-600" title="Working Hours">
                <div className="space-y-2 mt-1">
                  {hours.map((h) => (
                    <div key={h.day} className="flex justify-between items-center text-sm">
                      <span className={cn("font-medium", h.isEmergency ? "text-red-500" : "text-dental-slate-700")}>
                        {h.isEmergency && "🚨 "}{h.day}
                      </span>
                      <span className="text-dental-slate-500 font-medium tabular-nums">
                        {h.close ? `${h.open} – ${h.close}` : h.open}
                      </span>
                    </div>
                  ))}
                </div>
              </ContactCard>
            </RevealDiv>
          </div>

          {/* Map side */}
          <RevealDiv delay={0.2} className="h-full min-h-[420px]">
            <div className="rounded-[1.75rem] h-full min-h-[420px] border border-dental-slate-200 overflow-hidden bg-white">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3548.826325075771!2d77.9664011751774!3d27.193194847981164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397477a1e2575889%3A0xbcb5aed27329a92d!2sShree%20Narayandas%20Medicare%20Centre!5e0!3m2!1sen!2sin!4v1780638110572!5m2!1sen!2sin"
                title="Clinic Location"
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </RevealDiv>
        </div>

        {/* CTA strip */}
        <RevealDiv delay={0.25} className="mt-10">
          <div className="bg-dental-navy-50 border border-dental-navy-100 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="font-semibold text-dental-slate-900 mb-1">Ready to book your appointment?</div>
              <div className="text-sm text-dental-slate-500">Same-day slots available. No waiting weeks for a consultation.</div>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <a href={`tel:${phone}`} className="btn btn-ghost btn-md gap-2">
                <Phone size={15} /> Call Now
              </a>
              <a href="#appointment" className="btn btn-primary btn-md gap-2">
                Book Online <ArrowRight size={15} />
              </a>
            </div>
          </div>
        </RevealDiv>
      </div>
    </section>
  );
}

function ContactCard({ icon: Icon, iconBg, iconColor, title, children }: {
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4 items-start p-4 bg-dental-slate-50 rounded-2xl border border-dental-slate-100 hover:border-dental-navy-200 hover:bg-dental-navy-50/50 transition-all duration-200">
      <div className={`w-11 h-11 ${iconBg} rounded-xl flex items-center justify-center flex-shrink-0`}>
        <Icon size={18} className={iconColor} />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-xs font-bold uppercase tracking-wider text-dental-slate-400 mb-1.5">{title}</h3>
        {children}
      </div>
    </div>
  );
}
