import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SERVICES, CLINIC_CONFIG } from "@/lib/data";
import { ArrowRight, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: `Dental Services Mumbai — Implants, Veneers, Aligners | ${CLINIC_CONFIG.name}`,
  description:
    "Complete dental services in Bandra, Mumbai: implants, teeth whitening, smile makeovers, Invisalign, root canal, crowns, pediatric care, and emergency dentistry.",
  alternates: { canonical: "https://puresmile.in/services" },
};

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        {/* Header */}
        <section className="bg-dental-navy-900 text-white py-20">
          <div className="container-dental text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-dental-mint">What We Offer</span>
            <h1 className="font-display text-display-xl text-white mt-2 mb-3">
              Our <em className="italic text-dental-mint">Services</em>
            </h1>
            <p className="text-white/55 max-w-xl mx-auto text-base leading-relaxed">
              Multi-specialty dental care delivered by experts — from routine hygiene
              to full smile transformations.
            </p>
          </div>
        </section>

        {/* Services grid */}
        <section className="py-16 bg-dental-slate-50">
          <div className="container-dental">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {SERVICES.map((service) => {
                const CardTag = service.href ? "a" : "div";
                const interactive = Boolean(service.href);
                return (
                  <CardTag
                    key={service.id}
                    {...(interactive ? { href: service.href } : {})}
                    className={`group block rounded-2xl p-6 border transition-all duration-300 ${
                      interactive ? "hover:-translate-y-1 hover:shadow-dental" : ""
                    } ${service.isEmergency
                      ? "bg-dental-navy-900 border-dental-navy-700 hover:border-dental-navy-600"
                      : "bg-white border-dental-slate-100 hover:border-dental-navy-200 hover:shadow-card-hover"
                    }`}
                  >
                  {/* icon removed per request */}
                  <h2 className={`font-semibold text-base mb-2 ${service.isEmergency ? "text-white" : "text-dental-slate-900"}`}>
                    {service.name}
                  </h2>
                  <p className={`text-sm leading-relaxed mb-4 ${service.isEmergency ? "text-white/55" : "text-dental-slate-500"}`}>
                    {service.shortDesc}
                  </p>
                  <div className="space-y-1 mb-4">
                    {service.benefits.map((b) => (
                      <div key={b} className={`flex items-center gap-2 text-xs ${service.isEmergency ? "text-white/65" : "text-dental-slate-600"}`}>
                        <CheckCircle size={12} className="text-dental-mint flex-shrink-0" />
                        {b}
                      </div>
                    ))}
                  </div>
                  {service.href && (
                    <div className={`inline-flex items-center gap-1.5 text-xs font-semibold group-hover:gap-2.5 transition-all
                      ${service.isEmergency ? "text-dental-mint" : "text-dental-navy-600"}`}>
                      Learn more <ArrowRight size={13} />
                    </div>
                  )}
                  </CardTag>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-dental-navy-900 text-white text-center">
          <div className="container-dental">
            <h2 className="font-display text-display-md text-white mb-3">
              Not Sure Which Treatment You Need?
            </h2>
            <p className="text-white/55 max-w-lg mx-auto mb-8 text-base">
              Book a free 30-minute consultation with {CLINIC_CONFIG.doctor.name}.
              We will assess your needs and recommend the best treatment plan.
            </p>
            <a href="/#appointment" className="btn btn-mint btn-lg gap-2">
              Book Free Consultation <ArrowRight size={16} />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
