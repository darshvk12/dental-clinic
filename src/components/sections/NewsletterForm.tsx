"use client";

import { useState } from "react";
import type { FormEvent } from "react";

export default function NewsletterForm() {
  const [status, setStatus] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("");
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = String(formData.get("email") ?? "").trim();

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const json = await response.json();
      if (!response.ok) {
        setError(json?.error || "Unable to subscribe right now.");
        return;
      }

      setStatus(json?.message || "You are now subscribed to blog updates.");
      form.reset();
    } catch (err) {
      setError("Something went wrong. Please try again later.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          name="email"
          type="email"
          placeholder="your@email.com"
          className="flex-1 px-4 py-3 rounded-xl border border-dental-slate-200 text-sm outline-none focus:border-dental-navy-400 focus:ring-2 focus:ring-dental-navy-100 transition"
        />
        <button type="submit" disabled={isLoading} className="btn btn-primary btn-md flex-shrink-0">
          {isLoading ? "Subscribing..." : "Subscribe"}
        </button>
      </div>
      {(status || error) && (
        <div className="mt-3 text-center sm:text-left">
          {status ? <p className="text-sm text-dental-navy-700">{status}</p> : null}
          {error ? <p className="text-sm text-red-500">{error}</p> : null}
        </div>
      )}
    </form>
  );
}
