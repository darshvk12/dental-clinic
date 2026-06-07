import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SERVICES, CLINIC_CONFIG } from "@/lib/data";
import { CheckCircle, Clock, ArrowRight, Phone, Calendar, Star } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SERVICES.map((s) => ({
    slug: s.href.replace("/services/", ""),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.href === `/services/${slug}`);
  if (!service) return {};
  return {
    title: `${service.name} in Mumbai | ${CLINIC_CONFIG.name}`,
    description: service.description,
    alternates: { canonical: `https://puresmile.in/services/${slug}` },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.href === `/services/${slug}`);
  if (!service) notFound();

  const relatedServices = SERVICES.filter((s) => s.id !== service.id).slice(0, 3);

  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        {/* Hero */}
        <section className="bg-dental-navy-900 text-white py-20">
          <div className="container-dental">
            <div className="max-w-2xl">
              <a href="/services" className="text-dental-mint text-xs font-semibold hover:underline mb-4 inline-block">
                ← All Services
              </a>
              {service.icon && (
                <div className="text-5xl mb-4">{service.icon}</div>
              )}
              <h1 className="font-display text-display-lg text-white mb-3">
                {service.name}
              </h1>
              <p className="text-white/65 text-base leading-relaxed mb-6 max-w-xl">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#appointment" className="btn btn-mint btn-lg gap-2">
                  <Calendar size={18} /> Book This Treatment
                </a>
                <a href={`tel:${CLINIC_CONFIG.contact.phone}`} className="btn btn-ghost btn-lg gap-2" style={{ color: "white", borderColor: "rgba(255,255,255,0.2)" }}>
                  <Phone size={18} /> Call to Ask Questions
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Details */}
        <section className="py-16 bg-white">
          <div className="container-dental">
            <div className="grid lg:grid-cols-3 gap-10">
              {/* Main content */}
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <h2 className="font-display text-display-sm text-dental-slate-900 mb-4">
                    What to Expect
                  </h2>
                  <p className="text-dental-slate-600 leading-relaxed text-base">
                    At PureSmile Dental, every {service.name.toLowerCase()} procedure is performed
                    with precision, care, and the most advanced technology available. {service.description}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-dental-slate-900 mb-4 text-lg">Key Benefits</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {service.benefits.map((b) => (
                      <div key={b} className="flex items-start gap-3 bg-dental-mint-50 rounded-xl p-3.5 border border-dental-mint-100">
                        <CheckCircle size={16} className="text-dental-mint mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-dental-slate-700">{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Google reviews snippet */}
                <div className="bg-dental-slate-50 rounded-2xl p-6 border border-dental-slate-100">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map(i => <Star key={i} size={14} className="fill-dental-gold text-dental-gold" />)}
                    </div>
                    <span className="text-sm font-bold text-dental-slate-900">4.9 stars</span>
                    <span className="text-xs text-dental-slate-400">· 1,247 Google Reviews</span>
                  </div>
                  <blockquote className="font-display text-base italic text-dental-slate-600 leading-relaxed">
                    "The team at PureSmile made my {service.name.toLowerCase()} experience completely pain-free and
                    the results exceeded every expectation. I cannot recommend them highly enough."
                  </blockquote>
                  <div className="mt-3 text-xs text-dental-slate-400">— Verified patient · {service.name}</div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-4">
                {/* Quick info */}
                <div className="bg-dental-navy-50 rounded-2xl p-5 border border-dental-navy-100">
                  <h3 className="font-semibold text-dental-slate-900 mb-4 text-sm uppercase tracking-wider">Treatment Info</h3>
                  <div className="space-y-3">
                    {service.duration && (
                      <div className="flex items-center gap-2.5 text-sm text-dental-slate-600">
                        <Clock size={15} className="text-dental-navy-500 flex-shrink-0" />
                        <span><strong>Duration:</strong> {service.duration}</span>
                      </div>
                    )}
                    {service.priceRange && (
                      <div className="flex items-center gap-2.5 text-sm text-dental-slate-600">
                        <span className="text-dental-navy-500 text-base">₹</span>
                        <span><strong>Investment:</strong> {service.priceRange}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* CTA card */}
                <div className="bg-dental-navy-900 rounded-2xl p-5 text-white">
                  <h3 className="font-display text-lg font-light text-white mb-2">
                    Ready to Get Started?
                  </h3>
                  <p className="text-white/55 text-xs leading-relaxed mb-4">
                    Book a consultation to discuss your {service.name.toLowerCase()} treatment plan.
                  </p>
                  <a href="#appointment" className="btn btn-mint btn-md w-full justify-center gap-2">
                    <Calendar size={15} /> Book Consultation
                  </a>
                  <a href={`tel:${CLINIC_CONFIG.contact.phone}`} className="mt-2 flex items-center justify-center gap-2 text-white/50 hover:text-white text-xs font-medium transition-colors">
                    <Phone size={12} /> Or call {CLINIC_CONFIG.contact.phone}
                  </a>
                </div>

                {/* Related services */}
                <div>
                  <h3 className="font-semibold text-dental-slate-700 text-xs uppercase tracking-wider mb-3">Related Services</h3>
                  <div className="space-y-2">
                    {relatedServices.map((s) => (
                      <a
                        key={s.id}
                        href={s.href}
                        className="flex items-center gap-3 p-3 rounded-xl border border-dental-slate-100 hover:border-dental-navy-200 hover:bg-dental-navy-50 transition-all text-sm text-dental-slate-700 group"
                      >
                        <span className="text-xl">{s.icon}</span>
                        <span className="flex-1 font-medium">{s.name}</span>
                        <ArrowRight size={13} className="text-dental-slate-300 group-hover:text-dental-navy-500 transition-colors" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Appointment section */}
        <section id="appointment" className="py-16 bg-dental-slate-50">
          <div className="container-dental text-center">
            <h2 className="font-display text-display-md text-dental-slate-900 mb-3">
              Book Your <em className="text-dental-navy-600">{service.name}</em> Consultation
            </h2>
            <p className="text-dental-slate-500 max-w-md mx-auto mb-8 text-base">
              Same-day appointments often available. Our team will confirm within 30 minutes.
            </p>
            <div className="flex justify-center gap-3 flex-wrap">
              <a href={`tel:${CLINIC_CONFIG.contact.phone}`} className="btn btn-primary btn-lg gap-2">
                <Phone size={18} /> Call {CLINIC_CONFIG.contact.phone}
              </a>
              <a href="/#appointment" className="btn btn-ghost btn-lg gap-2">
                <Calendar size={18} /> Fill Online Form
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
