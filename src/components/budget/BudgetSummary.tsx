import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import AnimatedPrice from "./AnimatedPrice";
import { formatCurrency } from "./AnimatedPrice";
import type { ProjectType, Feature } from "../../types/budget";

interface BudgetSummaryProps {
  selectedProject: ProjectType | undefined;
  selectedFeatures: string[];
  features: Feature[];
  totalMin: number;
  totalMax: number;
}

export default function BudgetSummary({
  selectedProject,
  selectedFeatures,
  features,
  totalMin,
  totalMax,
}: BudgetSummaryProps) {
  return (
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

      <div className="mb-3 flex items-baseline gap-2">
        <AnimatedPrice value={totalMin} />
        <span className="text-lg text-slate-400">–</span>
        <AnimatedPrice value={totalMax} />
      </div>
      <p className="mb-10 text-xs text-slate-400">
        Precio estimado según alcance y complejidad
      </p>

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
  );
}
