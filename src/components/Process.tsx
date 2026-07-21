"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { steps, type Step } from "../config/process";

function StepCard({
  step,
  index,
  prefersReduced,
}: {
  step: Step;
  index: number;
  prefersReduced: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const Icon = step.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: prefersReduced ? 0 : 40 }}
      animate={inView ? { opacity: 1, y: prefersReduced ? 0 : 0 } : {}}
      transition={{ duration: prefersReduced ? 0.1 : 0.5, delay: prefersReduced ? 0 : index * 0.15 }}
      className="relative flex flex-col items-center text-center group"
    >
      <div className="relative z-10 w-20 h-20 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white group-hover:border-brand transition-all duration-300 group-hover:shadow-lg group-hover:shadow-brand/20">
        <Icon className={step.iconClassName ?? "w-6 h-6"} />
      </div>

      <span className="mt-4 text-xs font-bold tracking-widest text-brand/60 uppercase">
        Paso {step.number}
      </span>

      <h3 className="mt-2 text-lg font-bold text-navy">
        {step.title}
      </h3>

      <p className="mt-2 text-sm text-slate-500 max-w-[200px] leading-relaxed">
        {step.description}
      </p>
    </motion.div>
  );
}

export default function Process() {
  const prefersReduced = useReducedMotion();

  return (
    <section id="proceso" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: prefersReduced ? 0.1 : 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-block text-sm font-semibold tracking-widest uppercase text-brand mb-4">
            Proceso
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6">
            Nuestro Proceso
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            De la idea a la implementación
          </p>
        </motion.div>

        {/* Desktop: horizontal timeline */}
        <div className="hidden lg:block relative">
          {/* Connecting line */}
          <div className="absolute top-10 left-[calc(10%+40px)] right-[calc(10%+40px)] h-px bg-slate-200">
            <motion.div
              initial={{ scaleX: prefersReduced ? 1 : 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: prefersReduced ? 0.1 : 0.6, ease: [0.77, 0, 0.175, 1] }}
              className="h-full bg-gradient-to-r from-brand via-cyan to-violet origin-left"
            />
          </div>

          <div className="grid grid-cols-6 gap-4 relative">
            {steps.map((step, i) => (
              <div key={step.number} className="relative">
                {/* Animated dot */}
                <motion.div
                  initial={{ scale: prefersReduced ? 1 : 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: prefersReduced ? 0.1 : 0.3, delay: prefersReduced ? 0 : i * 0.15 + 0.5 }}
                  className="absolute top-[36px] left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-brand border-4 border-white shadow-sm z-10"
                />
                <StepCard step={step} index={i} prefersReduced={!!prefersReduced} />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile & Tablet: vertical timeline */}
        <div className="lg:hidden relative">
          {/* Vertical line */}
          <div className="absolute top-0 bottom-0 left-10 w-px bg-slate-200">
            <motion.div
              initial={{ scaleY: prefersReduced ? 1 : 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: prefersReduced ? 0.1 : 0.6, ease: [0.77, 0, 0.175, 1] }}
              className="h-full bg-gradient-to-b from-brand via-cyan to-violet origin-top"
            />
          </div>

          <div className="space-y-12">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: prefersReduced ? 0 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: prefersReduced ? 0.1 : 0.4, delay: prefersReduced ? 0 : i * 0.1 }}
                className="flex items-start gap-6 pl-0"
              >
                <div className="relative z-10 flex-shrink-0 w-20 h-20 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white transition-all duration-300">
                  <step.icon className={step.iconClassName ?? "w-6 h-6"} />
                </div>
                <div className="pt-2">
                  <span className="text-xs font-bold tracking-widest text-brand/60 uppercase">
                    Paso {step.number}
                  </span>
                  <h3 className="text-lg font-bold text-navy mt-1">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
