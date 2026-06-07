import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

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
            The page you are looking for has moved or does not exist.
            Let us get you back on track.
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <Link href="/" className="btn btn-primary btn-lg">
              Return Home
            </Link>
            <Link href="#appointment" className="btn btn-ghost btn-lg">
              Book Appointment
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
