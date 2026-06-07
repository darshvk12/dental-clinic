"use client";
import { motion } from "framer-motion";
import { useInView } from "@/hooks";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  tag: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: "left" | "center" | "right";
  dark?: boolean;
  className?: string;
}

export default function SectionHeader({
  tag, title, subtitle, align = "center", dark = false, className = "",
}: SectionHeaderProps) {
  const { ref, inView } = useInView();

  const alignClass = {
    left: "text-left",
    center: "text-center mx-auto",
    right: "text-right ml-auto",
  }[align];

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className={cn("mb-12", className)}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={alignClass}
      >
        <span className={cn(
          "section-tag",
          dark && "text-dental-mint"
        )}>
          {tag}
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        className={alignClass}
      >
        <h2 className={cn(
          "text-display text-display-lg mt-1 mb-2",
          dark ? "text-white" : "text-dental-slate-900",
          alignClass
        )}>
          {title}
        </h2>
        <div className={cn(
          "w-12 h-0.5 rounded-full mt-3 mb-3",
          "bg-gradient-to-r from-dental-mint to-dental-navy-500",
          align === "center" && "mx-auto",
          align === "right" && "ml-auto"
        )} />
      </motion.div>

      {subtitle && (
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className={alignClass}
        >
          <p className={cn(
            "text-base leading-relaxed max-w-[580px]",
            dark ? "text-white/55" : "text-dental-slate-500",
            align === "center" && "mx-auto"
          )}>
            {subtitle}
          </p>
        </motion.div>
      )}
    </div>
  );
}
