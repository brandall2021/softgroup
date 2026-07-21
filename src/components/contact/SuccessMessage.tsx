import { motion } from "framer-motion";
import { Check } from "lucide-react";

const customEasing: [number, number, number, number] = [0.23, 1, 0.32, 1];

export default function SuccessMessage() {
  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: customEasing }}
      role="status"
      aria-live="polite"
      className="flex min-h-[500px] flex-col items-center justify-center rounded-2xl border border-slate-100 bg-white p-10 text-center shadow-xl shadow-slate-200/50"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 15,
          delay: 0.2,
        }}
        className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50"
      >
        <Check className="h-7 w-7 text-emerald-500" strokeWidth={2.5} />
      </motion.div>
      <h3 className="mb-2 text-xl font-bold text-navy">
        ¡Mensaje enviado!
      </h3>
      <p className="text-slate-500">
        Te contactaremos en menos de 24 horas.
      </p>
    </motion.div>
  );
}
