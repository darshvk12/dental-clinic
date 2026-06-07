import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CLINIC_CONFIG } from "@/lib/data";
import { Phone, Clock, MapPin, AlertCircle, CheckCircle } from "lucide-react";
import { sanitizePhone } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Emergency Dental Care Mumbai — 24/7 | PureSmile Dental",
  description:
    "Dental emergency in Mumbai? Call PureSmile Dental immediately. Same-day appointments for toothache, knocked-out teeth, broken crowns, abscesses. 24/7 emergency line.",
  alternates: { canonical: "https://puresmile.in/emergency" },
};

const EMERGENCY_CONDITIONS = [
  { icon: "🦷", condition: "Severe Toothache",       action: "Pain relief within 30 minutes of arrival" },
  { icon: "💥", condition: "Knocked-Out Tooth",       action: "Reimplantation possible within 60 minutes" },
  { icon: "💔", condition: "Broken / Cracked Tooth",  action: "Same-day crown or bonding" },
  { icon: "🦠", condition: "Dental Abscess / Swelling", action: "Immediate drainage and antibiotics" },
  { icon: "👑", condition: "Lost Crown or Bridge",    action: "Re-cemented or replaced same day" },
  { icon: "🩸", condition: "Post-Extraction Bleeding", action: "Haemostatic treatment on arrival" },
  { icon: "😖", condition: "Broken Denture",          action: "Emergency repair while you wait" },
  { icon: "🏥", condition: "Facial Trauma / Injury",  action: "Immediate assessment and stabilisation" },
];

export default function EmergencyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        {/* Emergency hero */}
        <section className="bg-red-900 text-white py-20">
          <div className="container-dental text-center">
            <div className="inline-flex items-center gap-2 bg-red-800 border border-red-700 rounded-full px-4 py-2 text-sm font-semibold mb-6">
              <span className="w-2 h-2 rounded-full bg-red-300 animate-pulse" />
              24/7 Emergency Dental Service
            </div>
            <h1 className="font-display text-[clamp(2.5rem,6vw,4rem)] font-light leading-tight mb-4">
              Dental Emergency?<br />
              <em className="italic text-red-200">We Are Here Right Now.</em>
            </h1>
            <p className="text-red-200/80 text-lg max-w-xl mx-auto mb-8 leading-relaxed">
              Do not wait. Dental emergencies worsen with every hour.
              Call our emergency line immediately for same-day relief.
            </p>
            <a
              href={`tel:${sanitizePhone(CLINIC_CONFIG.contact.emergencyPhone)}`}
              className="inline-flex items-center gap-3 bg-white text-red-900 font-bold text-xl px-8 py-4 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:bg-red-50 transition-colors active:scale-95"
            >
              <Phone size={24} strokeWidth={2.5} />
              {CLINIC_CONFIG.contact.emergencyPhone}
            </a>
            <p className="mt-4 text-red-300/60 text-sm">
              Tap to call instantly. Available 24 hours, 7 days a week.
            </p>
          </div>
        </section>

        {/* Emergency conditions */}
        <section className="py-16 bg-dental-slate-50">
          <div className="container-dental">
            <h2 className="font-display text-display-md text-dental-slate-900 text-center mb-3">
              What Counts as a <em className="text-red-600">Dental Emergency?</em>
            </h2>
            <p className="text-dental-slate-500 text-center text-base mb-10 max-w-lg mx-auto">
              If you are experiencing any of the following, call us immediately.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {EMERGENCY_CONDITIONS.map(({ icon, condition, action }) => (
                <div key={condition} className="bg-white rounded-2xl p-5 border border-dental-slate-100 shadow-card">
                  <div className="text-3xl mb-3">{icon}</div>
                  <div className="font-semibold text-dental-slate-900 text-sm mb-1.5">{condition}</div>
                  <div className="flex items-start gap-1.5 text-xs text-dental-slate-500">
                    <CheckCircle size={12} className="text-dental-mint mt-0.5 flex-shrink-0" />
                    {action}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* First aid tips */}
        <section className="py-16 bg-white">
          <div className="container-dental">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="font-display text-display-md text-dental-slate-900 mb-4">
                  First Aid While You Wait
                </h2>
                <div className="space-y-4">
                  {[
                    { title: "Knocked-Out Tooth", steps: ["Handle by crown only — never touch the root", "Rinse gently with milk or saline, do NOT scrub", "Keep it moist: store in milk, saliva, or saline", "Get to us within 60 minutes for best outcome"] },
                    { title: "Severe Toothache", steps: ["Rinse with warm salt water", "Take OTC pain relief (Ibuprofen preferred)", "Apply cold compress outside jaw — never heat", "Do NOT place aspirin directly on the gum"] },
                    { title: "Broken Tooth", steps: ["Collect any large broken pieces", "Rinse mouth with warm water", "Cover sharp edges with dental wax if available", "Avoid biting on that side — come in immediately"] },
                  ].map(({ title, steps }) => (
                    <div key={title} className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <AlertCircle size={16} className="text-amber-600" />
                        <span className="font-semibold text-amber-900 text-sm">{title}</span>
                      </div>
                      <ol className="space-y-1.5">
                        {steps.map((s, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-amber-800">
                            <span className="w-4 h-4 rounded-full bg-amber-200 text-amber-700 flex items-center justify-center text-[0.65rem] font-bold flex-shrink-0 mt-0.5">{i + 1}</span>
                            {s}
                          </li>
                        ))}
                      </ol>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                {/* Contact info */}
                <div className="bg-dental-navy-900 text-white rounded-3xl p-8 space-y-5">
                  <h3 className="font-display text-2xl font-light">Reach Us Now</h3>
                  <div className="space-y-4">
                    <a href={`tel:${sanitizePhone(CLINIC_CONFIG.contact.emergencyPhone)}`} className="flex items-center gap-3 bg-red-600 rounded-2xl p-4 hover:bg-red-700 transition-colors">
                      <Phone size={20} className="text-white" />
                      <div>
                        <div className="text-xs text-red-200 font-medium">Emergency Hotline</div>
                        <div className="text-white font-bold text-lg">{CLINIC_CONFIG.contact.emergencyPhone}</div>
                      </div>
                    </a>
                    <a href={`tel:${sanitizePhone(CLINIC_CONFIG.contact.phone)}`} className="flex items-center gap-3 bg-white/10 rounded-2xl p-4 hover:bg-white/15 transition-colors">
                      <Phone size={20} className="text-dental-mint" />
                      <div>
                        <div className="text-xs text-white/50 font-medium">Main Clinic Line</div>
                        <div className="text-white font-semibold">{CLINIC_CONFIG.contact.phone}</div>
                      </div>
                    </a>
                    <div className="flex items-start gap-3 bg-white/8 rounded-2xl p-4">
                      <MapPin size={20} className="text-dental-mint mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-xs text-white/50 font-medium mb-1">Clinic Address</div>
                        <div className="text-white/80 text-sm leading-relaxed">
                          {CLINIC_CONFIG.contact.address.line1}<br />
                          {CLINIC_CONFIG.contact.address.line2}<br />
                          {CLINIC_CONFIG.contact.address.city}, {CLINIC_CONFIG.contact.address.state}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 bg-white/8 rounded-2xl p-4">
                      <Clock size={20} className="text-dental-mint mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-xs text-white/50 font-medium mb-1">Emergency Availability</div>
                        <div className="text-white font-semibold">24 Hours · 7 Days a Week</div>
                        <div className="text-white/50 text-xs mt-0.5">Including public holidays</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
