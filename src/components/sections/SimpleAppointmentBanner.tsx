import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";
import { CLINIC_CONFIG } from "@/lib/data";

export default function SimpleAppointmentBanner() {
  return (
    <section className="py-12 bg-dental-slate-50">
      <div className="container-dental">
        <div className="bg-gradient-to-r from-dental-navy-900/5 to-dental-mint/5 border border-dental-navy-900/10 rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <h3 className="font-display text-display-sm text-dental-slate-900 mb-2">
              Ready to book your appointment?
            </h3>
            <p className="text-dental-slate-500 text-base">
              Same-day slots available. No waiting weeks for a consultation.
            </p>
          </div>

          <div className="flex gap-3 flex-shrink-0 flex-col sm:flex-row">
            <a
              href={`tel:${CLINIC_CONFIG.contact.phone}`}
              className="btn btn-ghost btn-lg gap-2 border border-dental-slate-200 hover:border-dental-slate-300 text-dental-slate-900"
            >
              <Phone size={18} />
              Call Now
            </a>
            <Link
              href="/#appointment"
              className="btn btn-mint btn-lg gap-2"
            >
              Book Online
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
