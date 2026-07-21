import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { formatCurrency } from "./AnimatedPrice";
import type { Feature } from "../../types/budget";

interface FeaturesStepProps {
  features: Feature[];
  selectedFeatures: string[];
  onToggle: (id: string) => void;
}

export default function FeaturesStep({
  features,
  selectedFeatures,
  onToggle,
}: FeaturesStepProps) {
  return (
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
              onClick={() => onToggle(feature.id)}
              className={`flex w-full items-center justify-between rounded-xl border-2 p-4 text-left transition-all duration-200 ${
                isSelected
                  ? "border-brand bg-brand/5"
                  : "border-slate-100 bg-white hover:border-brand/30 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-5 w-5 items-center justify-center rounded-md border-2 transition-all duration-200 ${
                    isSelected ? "border-brand bg-brand" : "border-slate-300"
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    >
                      <Check
                        className="h-3 w-3 text-white"
                        strokeWidth={3}
                      />
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
  );
}
