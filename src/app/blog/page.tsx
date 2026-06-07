import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { BLOG_POSTS, CLINIC_CONFIG } from "@/lib/data";
import { Clock, Calendar, ArrowRight } from "lucide-react";
import type { BlogCategory } from "@/types";

export const metadata: Metadata = {
  title: "Dental Health Blog — Tips, Guides & Expert Advice | PureSmile",
  description:
    "Expert dental health articles by Dr. Aarav Mehta. Covering oral hygiene, cosmetic dentistry, implants, kids dental health, and more. Updated monthly.",
  alternates: { canonical: "https://puresmile.in/blog" },
};

const CATEGORIES: (BlogCategory | "All")[] = [
  "All", "Oral Hygiene", "Cosmetic Dentistry", "Kids Dental Health",
  "Dental Care Tips", "Dental Technology", "Patient Stories",
];

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        {/* Header */}
        <section className="py-16 bg-dental-navy-900 text-white">
          <div className="container-dental text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-dental-mint">From the Clinic</span>
            <h1 className="font-display text-display-lg text-white mt-2 mb-3">
              Dental Health <em className="italic text-dental-mint">Blog</em>
            </h1>
            <p className="text-white/55 max-w-xl mx-auto text-base leading-relaxed">
              Expert guidance from {CLINIC_CONFIG.doctor.name} — keeping you informed, confident,
              and smiling.
            </p>
          </div>
        </section>

        {/* Posts grid */}
        <section className="py-16 bg-dental-slate-50">
          <div className="container-dental">
            {/* Category pills */}
            <div className="flex flex-wrap gap-2 mb-10">
              {CATEGORIES.map((cat) => (
                <span
                  key={cat}
                  className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white border border-dental-slate-200 text-dental-slate-600 cursor-pointer hover:border-dental-navy-400 hover:text-dental-navy-700 transition-colors"
                >
                  {cat}
                </span>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {BLOG_POSTS.map((post) => (
                <article key={post.id} className="bg-white rounded-2xl overflow-hidden border border-dental-slate-100 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300">
                  <div className={`h-48 bg-gradient-to-br ${post.bgClass} flex items-center justify-center text-5xl relative`}>
                    {post.emoji}
                    <span className="absolute bottom-3 left-3 text-[0.65rem] font-bold uppercase tracking-wider bg-white/90 text-dental-navy-700 px-2.5 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <h2 className="text-sm font-semibold text-dental-slate-900 leading-snug mb-2 line-clamp-2">
                      {post.title}
                    </h2>
                    <div className="flex items-center gap-3 text-xs text-dental-slate-400 mb-3">
                      <span className="flex items-center gap-1"><Calendar size={11} />{post.date}</span>
                      <span className="flex items-center gap-1"><Clock size={11} />{post.readTime} min read</span>
                    </div>
                    <p className="text-xs text-dental-slate-500 leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>
                    <a
                      href={post.href}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-dental-navy-600 hover:text-dental-navy-800 transition-colors"
                    >
                      Read Full Article <ArrowRight size={12} />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-16 bg-dental-navy-50 border-t border-dental-navy-100">
          <div className="container-dental text-center">
            <h2 className="font-display text-display-sm text-dental-slate-900 mb-2">
              Get Dental Tips in Your Inbox
            </h2>
            <p className="text-dental-slate-500 text-sm mb-6 max-w-md mx-auto">
              Monthly insights from Dr. Mehta — no spam, just genuinely useful dental health advice.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={e => e.preventDefault()}>
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 rounded-xl border border-dental-slate-200 text-sm outline-none focus:border-dental-navy-400 focus:ring-2 focus:ring-dental-navy-100 transition"
              />
              <button type="submit" className="btn btn-primary btn-md flex-shrink-0">
                Subscribe
              </button>
            </form>
            <p className="mt-3 text-xs text-dental-slate-400">Unsubscribe any time. We respect your privacy.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
