"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  ChevronRight,
  ChevronLeft,
  Globe,
  Monitor,
  ShoppingCart,
  Code2,
  Smartphone,
  Brain,
  ArrowRight,
  Calendar,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* ── Types ─────────────────────────────────────────────────── */

interface ProjectType {
  id: string;
  label: string;
  icon: LucideIcon;
  min: number;
  max: number;
}

interface Feature {
  id: string;
  label: string;
  price: number;
}

/* ── Data ──────────────────────────────────────────────────── */

const projectTypes: ProjectType[] = [
  { id: "landing", label: "Landing Page", icon: Globe, min: 500, max: 1500 },
  { id: "corporate", label: "Sitio Corporativo", icon: Monitor, min: 1500, max: 5000 },
  { id: "ecommerce", label: "E-commerce", icon: ShoppingCart, min: 3000, max: 10000 },
  { id: "custom", label: "Sistema a medida", icon: Code2, min: 5000, max: 25000 },
  { id: "mobile", label: "App Móvil", icon: Smartphone, min: 4000, max: 15000 },
  { id: "ai", label: "Agente IA", icon: Brain, min: 2000, max: 10000 },
];

const features: Feature[] = [
  { id: "admin", label: "Panel administrativo", price: 1500 },
  { id: "api", label: "Integración con API", price: 1000 },
  { id: "users", label: "Sistema de usuarios", price: 800 },
  { id: "payment", label: "Pasarela de pago", price: 1200 },
  { id: "i18n", label: "Multiidioma", price: 600 },
  { id: "seo", label: "SEO avanzado", price: 500 },
];

/* ── Helpers ───────────────────────────────────────────────── */

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

/* ── Step indicator ────────────────────────────────────────── */

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-3">
      {Array.from({ length: total }, (_, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all duration-300 ${
                i + 1 <= current
                  ? "bg-brand text-white"
                  : "bg-slate-100 text-slate-400"
              }`}
            >
              {i + 1 < current ? <Check className="h-3.5 w-3.5" /> : i + 1}
            </div>
            <span
              className={`hidden text-xs font-medium sm:inline ${
                i + 1 <= current ? "text-brand" : "text-slate-400"
              }`}
            >
              {i === 0 ? "Tipo" : i === 1 ? "Extras" : "Resultado"}
            </span>
          </div>
          {i < total - 1 && (
            <div
              className={`h-px w-6 transition-colors duration-300 sm:w-12 ${
                i + 1 < current ? "bg-brand" : "bg-slate-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

/* ── Animated price ────────────────────────────────────────── */

function AnimatedPrice({ value }: { value: number }) {
  return (
    <motion.span
      key={value}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl"
    >
      {formatCurrency(value)}
    </motion.span>
  );
}

/* ── Main component ────────────────────────────────────────── */

export default function BudgetCalculator() {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const toggleFeature = useCallback((id: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  }, []);

  const selectedProject = projectTypes.find((p) => p.id === selectedType);

  const totalMin = selectedProject
    ? selectedProject.min +
      selectedFeatures.reduce((sum, fid) => {
        const f = features.find((feat) => feat.id === fid);
        return sum + (f?.price ?? 0);
      }, 0)
    : 0;

  const totalMax = selectedProject
    ? selectedProject.max +
      selectedFeatures.reduce((sum, fid) => {
        const f = features.find((feat) => feat.id === fid);
        return sum + (f?.price ?? 0);
      }, 0)
    : 0;

  const canNext = step === 1 ? selectedType !== null : true;

  return (
    <section
      id="calculadora"
      className="relative py-24 md:py-32 bg-white grid-pattern"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block text-sm font-semibold tracking-widest uppercase text-brand mb-4">
            Cotización
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#0F172A]">
            Calcula tu presupuesto
          </h2>
          <p className="mt-5 text-lg md:text-xl text-slate-500 max-w-xl mx-auto leading-relaxed">
            Obtén una estimación instantánea de tu proyecto
          </p>
        </motion.div>

        {/* Calculator card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="gradient-border rounded-3xl bg-white p-6 sm:p-8 shadow-xl shadow-black/5"
        >
          {/* Step indicator */}
          <div className="mb-8 flex justify-center">
            <StepIndicator current={step} total={3} />
          </div>

          {/* Steps */}
          <div className="relative min-h-[340px] overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <h3 className="mb-1 text-lg font-bold text-[#0F172A]">
                    Selecciona el tipo de proyecto
                  </h3>
                  <p className="mb-6 text-sm text-slate-500">
                    Elige la opción que mejor se adapte a lo que necesitas
                  </p>

                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {projectTypes.map((project) => {
                      const Icon = project.icon;
                      const isSelected = selectedType === project.id;
                      return (
                        <button
                          key={project.id}
                          onClick={() => setSelectedType(project.id)}
                          className={`group relative flex flex-col items-center gap-3 rounded-2xl border-2 p-5 text-center transition-all duration-200 ${
                            isSelected
                              ? "border-brand bg-brand/5 shadow-md shadow-brand/10"
                              : "border-slate-100 bg-white hover:border-brand/30 hover:bg-slate-50"
                          }`}
                        >
                          <div
                            className={`flex h-11 w-11 items-center justify-center rounded-xl transition-colors duration-200 ${
                              isSelected
                                ? "bg-brand/10"
                                : "bg-slate-100 group-hover:bg-brand/5"
                            }`}
                          >
                            <Icon
                              className={`h-5 w-5 transition-colors duration-200 ${
                                isSelected ? "text-brand" : "text-slate-400 group-hover:text-brand"
                              }`}
                              strokeWidth={1.8}
                            />
                          </div>
                          <span
                            className={`text-sm font-semibold transition-colors ${
                              isSelected ? "text-brand" : "text-[#0F172A]"
                            }`}
                          >
                            {project.label}
                          </span>
                          <span className="text-xs text-slate-400">
                            {formatCurrency(project.min)} – {formatCurrency(project.max)}
                          </span>
                          {isSelected && (
                            <motion.div
                              layoutId="type-check"
                              className="absolute right-2.5 top-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand"
                            >
                              <Check className="h-3 w-3 text-white" />
                            </motion.div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <h3 className="mb-1 text-lg font-bold text-[#0F172A]">
                    Añade funcionalidades extra
                  </h3>
                  <p className="mb-6 text-sm text-slate-500">
                    Selecciona las características que tu proyecto necesita
                  </p>

                  <div className="space-y-3">
                    {features.map((feature) => {
                      const isSelected = selectedFeatures.includes(feature.id);
                      return (
                        <button
                          key={feature.id}
                          onClick={() => toggleFeature(feature.id)}
                          className={`flex w-full items-center justify-between rounded-xl border-2 p-4 text-left transition-all duration-200 ${
                            isSelected
                              ? "border-brand bg-brand/5"
                              : "border-slate-100 bg-white hover:border-brand/30 hover:bg-slate-50"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`flex h-5 w-5 items-center justify-center rounded-md border-2 transition-all duration-200 ${
                                isSelected
                                  ? "border-brand bg-brand"
                                  : "border-slate-300"
                              }`}
                            >
                              {isSelected && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                >
                                  <Check className="h-3 w-3 text-white" strokeWidth={3} />
                                </motion.div>
                              )}
                            </div>
                            <span className="text-sm font-medium text-[#0F172A]">
                              {feature.label}
                            </span>
                          </div>
                          <span
                            className={`text-sm font-bold ${
                              isSelected ? "text-brand" : "text-slate-400"
                            }`}
                          >
                            +{formatCurrency(feature.price)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="flex flex-col items-center text-center"
                >
                  <h3 className="mb-2 text-lg font-bold text-[#0F172A]">
                    Estimación de tu proyecto
                  </h3>
                  <p className="mb-8 text-sm text-slate-500">
                    Basado en{" "}
                    <span className="font-semibold text-brand">
                      {selectedProject?.label}
                    </span>
                    {selectedFeatures.length > 0 && (
                      <>
                        {" "}
                        y{" "}
                        <span className="font-semibold text-brand">
                          {selectedFeatures.length} extra
                          {selectedFeatures.length > 1 ? "s" : ""}
                        </span>
                      </>
                    )}
                  </p>

                  {/* Price display */}
                  <div className="mb-3 flex items-baseline gap-2">
                    <AnimatedPrice value={totalMin} />
                    <span className="text-lg text-slate-400">–</span>
                    <AnimatedPrice value={totalMax} />
                  </div>
                  <p className="mb-10 text-xs text-slate-400">
                    Precio estimado según alcance y complejidad
                  </p>

                  {/* Summary */}
                  <div className="mb-8 w-full rounded-xl bg-slate-50 p-4 text-left">
                    <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                      Resumen
                    </h4>
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">{selectedProject?.label}</span>
                        <span className="font-medium text-[#0F172A]">
                          {formatCurrency(selectedProject?.min ?? 0)} –{" "}
                          {formatCurrency(selectedProject?.max ?? 0)}
                        </span>
                      </div>
                      {selectedFeatures.map((fid) => {
                        const f = features.find((feat) => feat.id === fid);
                        if (!f) return null;
                        return (
                          <div key={fid} className="flex justify-between text-sm">
                            <span className="text-slate-600">{f.label}</span>
                            <span className="font-medium text-[#0F172A]">
                              +{formatCurrency(f.price)}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="flex w-full flex-col gap-3 sm:flex-row">
                    <a
                      href="#contacto"
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-brand-dark hover:shadow-lg hover:shadow-brand/25"
                    >
                      Solicitar presupuesto exacto
                      <ArrowRight className="h-4 w-4" />
                    </a>
                    <a
                      href="#contacto"
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-slate-200 px-6 py-3.5 text-sm font-semibold text-[#0F172A] transition-all hover:border-brand/30 hover:bg-slate-50"
                    >
                      <Calendar className="h-4 w-4" />
                      Agendar reunión gratuita
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation */}
          {step < 3 && (
            <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-5">
              <button
                onClick={() => setStep((s) => Math.max(1, s - 1))}
                disabled={step === 1}
                className="flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-500 transition-colors hover:text-[#0F172A] disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-4 w-4" />
                Atrás
              </button>
              <button
                onClick={() => setStep((s) => Math.min(3, s + 1))}
                disabled={!canNext}
                className="flex items-center gap-1.5 rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-brand-dark disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {step === 2 ? "Ver estimación" : "Siguiente"}
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="mt-5 flex justify-center border-t border-slate-100 pt-5">
              <button
                onClick={() => {
                  setStep(1);
                  setSelectedType(null);
                  setSelectedFeatures([]);
                }}
                className="text-sm font-medium text-slate-400 transition-colors hover:text-brand"
              >
                Calcular otro proyecto
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
