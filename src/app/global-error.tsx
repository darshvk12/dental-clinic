"use client";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <html>
      <body className="min-h-screen flex items-center justify-center bg-dental-cream font-body p-8 text-center">
        <div>
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="font-display text-3xl text-dental-slate-900 mb-2">Something went wrong</h2>
          <p className="text-dental-slate-500 text-sm mb-6 max-w-sm mx-auto">
            We apologise for the inconvenience. Please try refreshing the page or call us directly.
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={reset}
              className="btn btn-primary btn-md"
            >
              Try Again
            </button>
            <a href="tel:+919820012345" className="btn btn-ghost btn-md">
              📞 Call Clinic
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
