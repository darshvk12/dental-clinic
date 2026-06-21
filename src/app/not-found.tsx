import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CLINIC_CONFIG } from "@/lib/data";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="pt-[72px] min-h-[70vh] flex items-center">
        <div className="container-dental text-center py-20">
          <div className="text-8xl mb-6">🦷</div>
          <h1 className="font-display text-display-xl text-dental-slate-900 mb-3">
            Page Not Found
          </h1>
          <p className="text-dental-slate-500 text-base max-w-md mx-auto mb-8 leading-relaxed">
            The page you're looking for has moved or doesn't exist. Let us get you back on track to finding the perfect smile care solution.
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <Link href="/" className="btn btn-mint btn-lg">
              Return Home
            </Link>
            <Link href="/#appointment" className="btn btn-ghost btn-lg">
              Book Appointment
            </Link>
          </div>

          {/* Quick links */}
          <div className="mt-16">
            <p className="text-dental-slate-400 text-sm mb-6">Or explore popular pages:</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/services" className="px-4 py-2 rounded-lg bg-dental-slate-100 text-dental-slate-700 hover:bg-dental-slate-200 transition text-sm font-medium">
                Services
              </Link>
              <Link href="/blog" className="px-4 py-2 rounded-lg bg-dental-slate-100 text-dental-slate-700 hover:bg-dental-slate-200 transition text-sm font-medium">
                Blog
              </Link>
              <Link href="/about" className="px-4 py-2 rounded-lg bg-dental-slate-100 text-dental-slate-700 hover:bg-dental-slate-200 transition text-sm font-medium">
                About Dr. Bala
              </Link>
              <a href={`tel:${CLINIC_CONFIG.contact.phone}`} className="px-4 py-2 rounded-lg bg-dental-slate-100 text-dental-slate-700 hover:bg-dental-slate-200 transition text-sm font-medium">
                Call Us
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
