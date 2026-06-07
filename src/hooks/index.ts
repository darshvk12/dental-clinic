"use client";
import { useState, useEffect, useRef, useCallback } from "react";

// ─── useInView ────────────────────────────────────────────────
export function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.15, ...options }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [options]);

  return { ref, inView };
}

// ─── useCountUp ───────────────────────────────────────────────
export function useCountUp(target: number, duration = 1200, enabled = true) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!enabled) return;
    let startTime: number;
    let rafId: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // easeOutExpo for ultra-smooth, fast start with elegant slow-down
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(eased * target));
      if (progress < 1) rafId = requestAnimationFrame(step);
      else setCount(target);
    };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [target, duration, enabled]);

  return count;
}

// ─── useCountUpWithWaypoints ──────────────────────────────────
export function useCountUpWithWaypoints(waypoints: number[], totalDuration = 1200, enabled = true) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!enabled || waypoints.length < 2) return;
    let startTime: number;
    let rafId: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / totalDuration, 1);
      const segmentIndex = Math.floor(progress * (waypoints.length - 1));
      const nextIndex = Math.min(segmentIndex + 1, waypoints.length - 1);
      const segmentProgress = (progress * (waypoints.length - 1)) - segmentIndex;

      const currentWaypoint = waypoints[segmentIndex];
      const nextWaypoint = waypoints[nextIndex];
      const eased = segmentProgress === 0 ? 0 : 1 - Math.pow(2, -10 * segmentProgress);
      const value = currentWaypoint + (nextWaypoint - currentWaypoint) * eased;

      setCount(Math.floor(value));
      if (progress < 1) rafId = requestAnimationFrame(step);
      else setCount(waypoints[waypoints.length - 1]);
    };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [waypoints, totalDuration, enabled]);

  return count;
}

// ─── useScrollProgress ─────────────────────────────────────────
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return progress;
}

// ─── useMediaQuery ────────────────────────────────────────────
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    setMatches(mq.matches);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [query]);
  return matches;
}

// ─── useDebounce ──────────────────────────────────────────────
export function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}
