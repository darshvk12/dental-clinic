"use client";

import type { FormEvent } from "react";

export default function NewsletterForm() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="your@email.com"
        className="flex-1 px-4 py-3 rounded-xl border border-dental-slate-200 text-sm outline-none focus:border-dental-navy-400 focus:ring-2 focus:ring-dental-navy-100 transition"
      />
      <button type="submit" className="btn btn-primary btn-md flex-shrink-0">
        Subscribe
      </button>
    </form>
  );
}
