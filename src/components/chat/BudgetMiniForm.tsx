"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const serviceOptions = [
  "Desarrollo Web",
  "Sistemas Informáticos",
  "Inteligencia Artificial",
  "Automatización",
  "Networking e Infraestructura",
  "Cloud & Ciberseguridad",
];

export default function BudgetMiniForm() {
  const [submitted, setSubmitted] = useState(false);
  const prefersReduced = useReducedMotion();

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: prefersReduced ? 0 : 4 }}
        animate={{ opacity: 1, y: 0 }}
        role="status"
        aria-live="polite"
        className="rounded-xl bg-emerald-50 p-3"
      >
        <p className="text-xs font-medium text-emerald-700">
          ¡Recibido! Nos pondremos en contacto contigo pronto.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: prefersReduced ? 0 : 4 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      aria-label="Formulario de solicitud de presupuesto"
      className="space-y-2.5 rounded-xl border border-slate-100 bg-slate-50 p-3"
    >
      <label htmlFor="budget-name" className="sr-only">
        Nombre
      </label>
      <input
        id="budget-name"
        type="text"
        required
        placeholder="Tu nombre"
        aria-label="Tu nombre"
        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700 placeholder:text-slate-400 outline-none focus:border-brand"
      />
      <label htmlFor="budget-email" className="sr-only">
        Email
      </label>
      <input
        id="budget-email"
        type="email"
        required
        placeholder="Tu email"
        aria-label="Tu email"
        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700 placeholder:text-slate-400 outline-none focus:border-brand"
      />
      <label htmlFor="budget-service" className="sr-only">
        Servicio
      </label>
      <select
        id="budget-service"
        required
        defaultValue=""
        aria-label="Selecciona un servicio"
        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700 outline-none focus:border-brand"
      >
        <option value="" disabled>
          Selecciona un servicio
        </option>
        {serviceOptions.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
      <button
        type="submit"
        aria-label="Enviar solicitud de presupuesto"
        className="w-full rounded-lg bg-brand px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-brand-dark"
      >
        Enviar solicitud
      </button>
    </motion.form>
  );
}
