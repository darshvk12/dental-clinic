import { CLINIC_CONFIG } from "@/lib/data";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ArrowLeft, Award, GraduationCap, Heart } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `About Dr. ${CLINIC_CONFIG.doctor.name} | ${CLINIC_CONFIG.name}`,
  description: `Learn more about Dr. Pooja Bala, an experienced Endodontist and Restorative Dentist with 18+ years of expertise in comprehensive dental care.`,
  alternates: { canonical: "https://puresmile.in/about" },
};

export default function AboutPage() {
  const { doctor } = CLINIC_CONFIG;
  const bioSections = (doctor.fullBio || "").split("\n\n").filter(Boolean);

  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        {/* Hero Header */}
        <section className="bg-dental-navy-900 text-white py-16">
          <div className="container-dental">
            <Link href="/" className="inline-flex items-center gap-2 text-dental-mint hover:text-dental-mint-light transition mb-6 text-sm font-semibold">
              <ArrowLeft size={16} />
              Back to Home
            </Link>
            <div className="text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-dental-mint">About Our Doctor</span>
              <h1 className="font-display text-display-lg text-white mt-2 mb-3">
                Dr. Pooja Bala
              </h1>
              <p className="text-white/65 text-base leading-relaxed">
                {doctor.title} • {doctor.experience}+ Years of Clinical Excellence
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 bg-dental-slate-50">
          <div className="container-dental">
            <div className="max-w-3xl mx-auto">
              {/* Biography */}
              <div className="bg-white rounded-2xl p-8 shadow-card border border-dental-slate-100 mb-12">
                <div className="space-y-6">
                  {bioSections.map((section, index) => (
                    <p key={index} className="text-dental-slate-600 leading-8 text-base">
                      {section}
                    </p>
                  ))}
                </div>
              </div>

              {/* Two Column Layout - Only show if there's content */}
              {(doctor.qualifications.length > 0 || doctor.fellowships.length > 0) && (
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Qualifications */}
                  {doctor.qualifications.length > 0 && (
                    <div>
                      <h2 className="font-display text-display-sm text-dental-slate-900 mb-6">
                        Qualifications
                      </h2>
                      <div className="space-y-4">
                        {doctor.qualifications.map((qual, index) => (
                          <div
                            key={index}
                            className="bg-white rounded-xl p-4 border-l-4 border-dental-mint shadow-sm hover:shadow-card transition-shadow"
                          >
                            <div className="flex gap-3">
                              <GraduationCap size={20} className="text-dental-mint flex-shrink-0 mt-0.5" />
                              <p className="text-dental-slate-700 text-sm leading-relaxed">{qual}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Memberships */}
                  {doctor.fellowships.length > 0 && (
                    <div>
                      <h2 className="font-display text-display-sm text-dental-slate-900 mb-6">
                        Professional Memberships
                      </h2>
                      <div className="space-y-4">
                        {doctor.fellowships.map((fellowship, index) => (
                          <div
                            key={index}
                            className="bg-white rounded-xl p-4 border-l-4 border-dental-navy-400 shadow-sm hover:shadow-card transition-shadow"
                          >
                            <div className="flex gap-3">
                              <Award size={20} className="text-dental-navy-500 flex-shrink-0 mt-0.5" />
                              <p className="text-dental-slate-700 text-sm leading-relaxed">{fellowship}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Philosophy Section - Only show if there's content */}
              {doctor.philosophy && (
                <div className="mt-12 bg-gradient-to-br from-dental-navy-900 to-dental-navy-800 rounded-2xl p-8 text-white border border-dental-navy-700">
                  <div className="flex gap-4">
                    <Heart size={24} className="text-dental-mint flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-display text-display-sm mb-3">Professional Philosophy</h3>
                      <p className="text-white/80 leading-8 italic text-base">
                        "{doctor.philosophy}"
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* CTA Section */}
              <div className="mt-12 bg-gradient-to-r from-dental-navy-900/5 to-dental-mint/5 border border-dental-navy-900/10 rounded-2xl p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <div>
                  <h3 className="font-display text-display-sm text-dental-slate-900 mb-2">Ready to Experience Exceptional Dental Care?</h3>
                  <p className="text-dental-slate-500 text-base">
                    Schedule your consultation with Dr. Pooja Bala and take the first step toward your healthiest smile.
                  </p>
                </div>
                <div className="flex gap-3 flex-shrink-0 flex-col sm:flex-row">
                  <a
                    href={`tel:${CLINIC_CONFIG.contact.phone}`}
                    className="btn btn-ghost btn-lg border border-dental-slate-200 hover:border-dental-slate-300 text-dental-slate-900"
                  >
                    Call Now
                  </a>
                  <Link
                    href="/#appointment"
                    className="btn btn-mint btn-lg"
                  >
                    Book Appointment
                  </Link>
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
