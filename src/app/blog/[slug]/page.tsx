import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { BLOG_POSTS, CLINIC_CONFIG } from "@/lib/data";
import { ArrowRight, Calendar, Clock } from "lucide-react";

interface BlogPostPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = BLOG_POSTS.find((item) => item.slug === params.slug);
  if (!post) return { title: "Blog Post" };

  return {
    title: `${post.title} | PureSmile Blog`,
    description: post.excerpt,
    alternates: { canonical: `https://puresmile.in/blog/${post.slug}` },
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = BLOG_POSTS.find((item) => item.slug === params.slug);
  if (!post) notFound();

  return (
    <>
      <Navbar />
      <main className="pt-[72px] bg-dental-slate-50">
        <section className="py-16 bg-white">
          <div className="container-dental">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8 space-y-5">
                <div>
                  <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-dental-navy-600 font-semibold hover:text-dental-navy-800 transition-colors"
                  >
                    <ArrowRight size={16} className="rotate-180" />
                    Back to Blog
                  </Link>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full bg-dental-mint/10 border border-dental-mint/20 px-3 py-1 text-xs uppercase tracking-[0.18em] font-semibold text-dental-mint">
                    {post.category}
                  </span>
                  <span className="text-3xl">{post.emoji}</span>
                </div>
                <h1 className="mt-4 text-3xl font-display text-dental-slate-900 sm:text-4xl">
                  {post.title}
                </h1>
                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-dental-slate-500">
                  <span className="flex items-center gap-2"><Calendar size={14} />{post.date}</span>
                  <span className="flex items-center gap-2"><Clock size={14} />{post.readTime} min read</span>
                  <span className="font-medium text-dental-slate-700">By {post.author}</span>
                </div>
              </div>

              <article className="space-y-6 text-dental-slate-700 max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
