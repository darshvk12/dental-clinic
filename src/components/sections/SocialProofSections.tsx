"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "@/hooks";
import { TESTIMONIALS, FAQS, BLOG_POSTS } from "@/lib/data";
import { Star, ChevronDown, ArrowRight, Clock, Calendar } from "lucide-react";
import type { Testimonial, BlogPost } from "@/types";
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

/* ══════════════════════════════════════════════════════════════ */
/* TESTIMONIALS                                                   */
/* ══════════════════════════════════════════════════════════════ */
function TestimonialCard({ t, index }: { t: Testimonial; index: number }) {
  const { ref, inView } = useReveal();
  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: (index % 3) * 0.09, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="card-base p-5 flex flex-col gap-4"
    >
      {/* Stars + source */}
      <div className="flex items-center justify-between">
        <div className="flex gap-0.5">
          {Array.from({ length: t.rating }).map((_, i) => (
            <Star key={i} size={14} className="fill-dental-gold text-dental-gold" />
          ))}
        </div>
        <div className="flex items-center gap-1.5">
          {t.verified && (
            <span className="text-[0.65rem] bg-dental-mint/10 text-dental-mint-600 font-semibold px-2 py-0.5 rounded-full border border-dental-mint/20">
              ✓ Verified
            </span>
          )}
          <span className="text-[0.65rem] text-dental-slate-400 uppercase tracking-wider font-medium capitalize">
            {t.source}
          </span>
        </div>
      </div>

      {/* Review text */}
      <blockquote className="font-display text-[1rem] font-light italic leading-relaxed text-dental-slate-700">
        "{t.review}"
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-3 pt-2 border-t border-dental-slate-100">
        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.avatarBg ?? "from-blue-100 to-blue-200"} flex items-center justify-center text-xs font-bold text-dental-navy-700 flex-shrink-0`}>
          {t.initials}
        </div>
        <div>
          <div className="text-sm font-semibold text-dental-slate-900">{t.name}</div>
          <div className="text-xs text-dental-slate-400">{t.treatment}</div>
        </div>
        <div className="ml-auto text-xs text-dental-slate-300 flex items-center gap-1">
          <Calendar size={10} />
          {t.date}
        </div>
      </div>
    </motion.article>
  );
}

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="section-py bg-dental-slate-50">
      <div className="container-dental">
        <div className="text-center mb-12">
          <RevealDiv><span className="section-tag">Patient Stories</span></RevealDiv>
          <RevealDiv delay={0.1}>
            <h2 className="text-display text-display-lg text-dental-slate-900 mt-1 mb-3">
              Smiles That Speak <em className="text-dental-navy-600">for Themselves</em>
            </h2>
          </RevealDiv>
          <RevealDiv delay={0.15}>
            <p className="text-dental-slate-500 max-w-[520px] mx-auto text-base leading-relaxed">
              Real words from real patients who trusted us with their most important feature.
            </p>
          </RevealDiv>

          {/* Overall rating banner */}
          <RevealDiv delay={0.2} className="inline-flex items-center gap-3 bg-white border border-dental-slate-100 rounded-2xl px-5 py-3 mt-6 shadow-card">
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(i => <Star key={i} size={16} className="fill-dental-gold text-dental-gold" />)}
            </div>
            <div className="text-sm font-bold text-dental-slate-900">4.9 out of 5</div>
            <div className="w-px h-4 bg-dental-slate-200" />
            <div className="text-xs text-dental-slate-400">Based on 1,247 verified reviews</div>
          </RevealDiv>
        </div>

        <div className="relative overflow-hidden py-stack-md">
          <div className="marquee-container flex gap-8 testimonial-scroll">
            {Array.from({ length: 2 }).flatMap((_, groupIndex) =>
              TESTIMONIALS.map((t) => (
                <article
                  key={`${t.id}-${groupIndex}`}
                  className={`glass-card p-glass-padding flex flex-col justify-between h-full italic text-dental-slate-600 w-[500px] shrink-0 ${groupIndex === 0 ? "bg-white/80" : "bg-dental-slate-50/80"}`}
                >
                  <p className="text-lg mb-stack-lg leading-relaxed">"{t.review}"</p>

                  <div className="flex items-center gap-4 not-italic">
                    <div className="w-12 h-12 rounded-full bg-dental-slate-100 overflow-hidden flex items-center justify-center text-sm font-semibold text-dental-slate-700">
                      {t.initials}
                    </div>
                    <div>
                      <p className="font-bold text-dental-slate-900">{t.name}</p>
                      <p className="text-[0.65rem] uppercase tracking-[0.2em] opacity-70">{t.treatment}</p>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>

        <RevealDiv delay={0.25} className="text-center mt-8">
          <a
            href="https://g.page/r/puresmile-dental"
            target="_blank" rel="noopener noreferrer"
            className="btn btn-ghost btn-md gap-2"
          >
            Read All Reviews on Google <ArrowRight size={15} />
          </a>
        </RevealDiv>
      </div>
    </section>
  );
}


/* ══════════════════════════════════════════════════════════════ */
/* FAQ                                                            */
/* ══════════════════════════════════════════════════════════════ */
function FAQItem({ item, index }: { item: typeof FAQS[0]; index: number }) {
  const [open, setOpen] = useState(false);
  const { ref, inView } = useReveal();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: (index % 2) * 0.06, duration: 0.5 }}
      className={cn(
        "border rounded-2xl overflow-hidden transition-all duration-200",
        open ? "border-dental-navy-200 shadow-[0_0_0_3px_rgba(15,45,94,0.06)]" : "border-dental-slate-100 bg-white"
      )}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-dental-navy-50 transition-colors focus-visible:outline-none"
        aria-expanded={open}
      >
        <span className="text-sm font-semibold text-dental-slate-800 leading-snug flex-1">
          {item.question}
        </span>
        <ChevronDown
          size={18}
          className={cn("text-dental-slate-400 flex-shrink-0 transition-transform duration-300", open && "rotate-180 text-dental-navy-600")}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="px-5 pb-4 text-sm text-dental-slate-600 leading-relaxed border-t border-dental-slate-100 pt-3">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQSection() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const categories = ["All", "General", "Treatments", "Cost & Insurance", "Technology", "Appointments"];
  const filtered = activeCategory === "All" ? FAQS : FAQS.filter(f => f.category === activeCategory);

  return (
    <section id="faq" className="section-py bg-dental-slate-50">
      <div className="container-dental">
        <div className="text-center mb-10">
          <RevealDiv><span className="section-tag">FAQ</span></RevealDiv>
          <RevealDiv delay={0.1}>
            <h2 className="text-display text-display-lg text-dental-slate-900 mt-1 mb-3">
              Frequently Asked <em className="text-dental-navy-600">Questions</em>
            </h2>
          </RevealDiv>
          <RevealDiv delay={0.15}>
            <p className="text-dental-slate-500 max-w-[520px] mx-auto text-base leading-relaxed">
              Everything you need to know before your first visit.
            </p>
          </RevealDiv>

          {/* Category filter */}
          <RevealDiv delay={0.2} className="flex flex-wrap justify-center gap-2 mt-6">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all",
                  activeCategory === cat
                    ? "bg-dental-navy-700 text-white shadow-dental"
                    : "bg-white border border-dental-slate-200 text-dental-slate-600 hover:border-dental-navy-200"
                )}
              >
                {cat}
              </button>
            ))}
          </RevealDiv>
        </div>

        <div className="grid lg:grid-cols-2 gap-3">
          <AnimatePresence mode="wait">
            {filtered.map((item, i) => (
              <FAQItem key={item.id} item={item} index={i} />
            ))}
          </AnimatePresence>
        </div>

        <RevealDiv delay={0.3} className="text-center mt-8">
          <p className="text-dental-slate-400 text-sm mb-3">Still have questions?</p>
          <a href="#contact" className="btn btn-primary btn-md gap-2">
            Ask Our Team <ArrowRight size={15} />
          </a>
        </RevealDiv>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════ */
/* BLOG                                                           */
/* ══════════════════════════════════════════════════════════════ */
function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  const { ref, inView } = useReveal();
  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: (index % 3) * 0.09, duration: 0.6 }}
      className="card-base overflow-hidden group"
    >
      {/* Thumbnail */}
      <div className={`h-44 bg-gradient-to-br ${post.bgClass} flex items-center justify-center text-5xl relative overflow-hidden`}>
        {post.emoji}
        <div className="absolute bottom-3 left-3">
          <span className="text-[0.65rem] font-bold uppercase tracking-wider bg-white/90 text-dental-navy-700 px-2.5 py-1 rounded-full shadow-sm">
            {post.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-sm font-semibold text-dental-slate-900 mb-2 leading-snug group-hover:text-dental-navy-700 transition-colors line-clamp-2">
          {post.title}
        </h3>

        <div className="flex items-center gap-3 text-xs text-dental-slate-400 mb-3">
          <span className="flex items-center gap-1"><Calendar size={11} /> {post.date}</span>
          <span className="flex items-center gap-1"><Clock size={11} /> {post.readTime} min read</span>
        </div>

        <p className="text-xs text-dental-slate-500 leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>

        <a
          href={post.href}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-dental-navy-600 hover:text-dental-navy-800 transition-colors"
          aria-label={`Read ${post.title}`}
        >
          Read Article <ArrowRight size={12} />
        </a>
      </div>
    </motion.article>
  );
}

export function BlogSection() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? BLOG_POSTS : BLOG_POSTS.slice(0, 3);

  return (
    <section id="blog" className="section-py bg-dental-cream">
      <div className="container-dental">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <RevealDiv><span className="section-tag">Expert Insights</span></RevealDiv>
            <RevealDiv delay={0.1}>
              <h2 className="text-display text-display-md text-dental-slate-900 mt-1">
                Dental <em className="text-dental-navy-600">Health Blog</em>
              </h2>
            </RevealDiv>
          </div>
          <RevealDiv delay={0.15}>
            <a href="/blog" className="btn btn-ghost btn-sm gap-2 flex-shrink-0">
              View All Articles <ArrowRight size={14} />
            </a>
          </RevealDiv>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence>
            {visible.map((post, i) => (
              <BlogCard key={post.id} post={post} index={i} />
            ))}
          </AnimatePresence>
        </div>

        {!showAll && BLOG_POSTS.length > 3 && (
          <RevealDiv delay={0.2} className="text-center mt-8">
            <button onClick={() => setShowAll(true)} className="btn btn-ghost btn-md gap-2">
              Load More Articles <ChevronDown size={15} />
            </button>
          </RevealDiv>
        )}
      </div>
    </section>
  );
}
