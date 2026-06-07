"use client";
import { useInView, useCountUp } from "@/hooks";
import { cn } from "@/lib/utils";

interface CounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  icon?: string;
  className?: string;
  dark?: boolean;
  formatAs?: "number" | "k" | "percent";
}

export default function AnimatedCounter({
  value, suffix = "", prefix = "", label, icon,
  className = "", dark = false, formatAs = "number",
}: CounterProps) {
  const { ref, inView } = useInView();
  const count = useCountUp(value, 2000, inView);

  let display = "";
  if (formatAs === "k" && count >= 1000) {
    display = `${(count / 1000).toFixed(count % 1000 === 0 ? 0 : 1)}K`;
  } else {
    display = count.toLocaleString("en-IN");
  }

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn("text-center", className)}
    >
      {icon && <div className="text-2xl mb-2">{icon}</div>}
      <div className={cn(
        "font-display text-4xl font-medium leading-none",
        dark ? "text-white" : "text-dental-navy-700"
      )}>
        {prefix}{display}{suffix}
      </div>
      <div className={cn(
        "text-xs font-medium mt-1.5",
        dark ? "text-white/50" : "text-dental-slate-400"
      )}>
        {label}
      </div>
    </div>
  );
}
