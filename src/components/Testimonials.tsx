"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "../config/testimonials";

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const prefersReduced = useReducedMotion();

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [paused, next]);

  return (
    <section id="testimonios" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <motion.p
            initial={{ opacity: 0, y: prefersReduced ? 0 : 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand"
          >
            Testimonios
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: prefersReduced ? 0 : 0.1 }}
            className="text-3xl font-bold tracking-tight text-navy sm:text-4xl lg:text-5xl"
          >
            Lo que dicen nuestros{" "}
            <span className="gradient-text">clientes</span>
          </motion.h2>
        </div>

        <div
          className="relative mx-auto max-w-3xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative min-h-[320px] sm:min-h-[280px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: prefersReduced ? 0 : 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: prefersReduced ? 0 : -40 }}
                transition={{ duration: prefersReduced ? 0.1 : 0.4, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <div className="glass-card rounded-2xl p-8 sm:p-10 card-premium">
                  <Quote className="mb-6 h-8 w-8 text-brand/20" />
                  <p className="mb-8 text-lg leading-relaxed text-slate-600 sm:text-xl">
                    &ldquo;{testimonials[current].text}&rdquo;
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand to-cyan text-sm font-bold text-white">
                      {testimonials[current].initials}
                    </div>
                    <div>
                      <p className="font-semibold text-navy">
                        {testimonials[current].name}
                      </p>
                      <p className="text-sm text-slate-500">
                        {testimonials[current].role},{" "}
                        {testimonials[current].company}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={prev}
            className="absolute -left-4 top-1/2 hidden -translate-y-1/2 rounded-full border border-slate-200 bg-white p-2 text-slate-400 shadow-md transition-colors hover:border-brand hover:text-brand sm:block"
            aria-label="Testimonio anterior"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={next}
            className="absolute -right-4 top-1/2 hidden -translate-y-1/2 rounded-full border border-slate-200 bg-white p-2 text-slate-400 shadow-md transition-colors hover:border-brand hover:text-brand sm:block"
            aria-label="Testimonio siguiente"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-10 flex items-center justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Testimonio ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current
                  ? "w-8 bg-brand"
                  : "w-2 bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
