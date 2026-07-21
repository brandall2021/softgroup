"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { stats, type Stat } from "../config/stats";

function formatNumber(n: number): string {
  if (n >= 1000) {
    return n.toLocaleString("en-US");
  }
  return n.toString();
}

function useCountUp(target: number, inView: boolean, duration = 2000) {
  const [count, setCount] = useState(0);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!inView) return;

    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      }
    }

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [inView, target, duration]);

  return count;
}

function StatCard({
  stat,
  index,
  inView,
  prefersReduced,
}: {
  stat: Stat;
  index: number;
  inView: boolean;
  prefersReduced: boolean;
}) {
  const count = useCountUp(stat.value, inView);
  const Icon = stat.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReduced ? 0 : 30 }}
      animate={inView ? { opacity: 1, y: prefersReduced ? 0 : 0 } : {}}
      transition={{ duration: prefersReduced ? 0.1 : 0.5, delay: prefersReduced ? 0 : index * 0.12 }}
      className="relative group text-center p-8 glass-card-dark rounded-2xl card-premium"
    >
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 text-brand mb-5 group-hover:bg-white/15 transition-colors">
        <Icon className={stat.iconClassName ?? "w-7 h-7"} />
      </div>

      <div className="text-4xl md:text-5xl font-bold mb-3 gradient-text-animated">
        {stat.prefix}
        {formatNumber(count)}
        {stat.suffix}
      </div>

      <p className="text-slate-400 text-sm font-medium tracking-wide uppercase">
        {stat.label}
      </p>
    </motion.div>
  );
}

export default function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-navy py-24 md:py-28 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand/5 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} inView={inView} prefersReduced={!!prefersReduced} />
          ))}
        </div>
      </div>
    </section>
  );
}
