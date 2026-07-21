import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function StepIndicator({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
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
              {i + 1 < current ? (
                <Check className="h-3.5 w-3.5" />
              ) : (
                i + 1
              )}
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
