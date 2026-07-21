"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Globe, Monitor, ShoppingCart, Code2, Smartphone, Brain } from "lucide-react";
import type { ProjectType, Feature } from "../types/budget";
import StepIndicator from "./budget/StepIndicator";
import ProjectTypeStep from "./budget/ProjectTypeStep";
import FeaturesStep from "./budget/FeaturesStep";
import BudgetSummary from "./budget/BudgetSummary";

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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="gradient-border rounded-3xl bg-white p-6 sm:p-8 shadow-xl shadow-black/5"
        >
          <div className="mb-8 flex justify-center">
            <StepIndicator current={step} total={3} />
          </div>

          <div className="relative min-h-[340px] overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              {step === 1 && (
                <ProjectTypeStep
                  projectTypes={projectTypes}
                  selectedType={selectedType}
                  onSelect={setSelectedType}
                />
              )}

              {step === 2 && (
                <FeaturesStep
                  features={features}
                  selectedFeatures={selectedFeatures}
                  onToggle={toggleFeature}
                />
              )}

              {step === 3 && (
                <BudgetSummary
                  selectedProject={selectedProject}
                  selectedFeatures={selectedFeatures}
                  features={features}
                  totalMin={totalMin}
                  totalMax={totalMax}
                />
              )}
            </AnimatePresence>
          </div>

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
