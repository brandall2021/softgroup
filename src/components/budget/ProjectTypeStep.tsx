import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { formatCurrency } from "./AnimatedPrice";
import type { ProjectType } from "../../types/budget";

interface ProjectTypeStepProps {
  projectTypes: ProjectType[];
  selectedType: string | null;
  onSelect: (id: string) => void;
}

export default function ProjectTypeStep({
  projectTypes,
  selectedType,
  onSelect,
}: ProjectTypeStepProps) {
  return (
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
              onClick={() => onSelect(project.id)}
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
                    isSelected
                      ? "text-brand"
                      : "text-slate-400 group-hover:text-brand"
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
  );
}
