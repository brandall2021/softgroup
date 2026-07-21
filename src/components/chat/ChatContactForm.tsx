"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function ChatContactForm() {
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
          ¡Gracias! Un asesor se comunicará contigo a la brevedad.
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
      aria-label="Formulario de contacto para llamada"
      className="space-y-2.5 rounded-xl border border-slate-100 bg-slate-50 p-3"
    >
      <label htmlFor="contact-name" className="sr-only">
        Nombre
      </label>
      <input
        id="contact-name"
        type="text"
        required
        placeholder="Tu nombre"
        aria-label="Tu nombre"
        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700 placeholder:text-slate-400 outline-none focus:border-brand"
      />
      <label htmlFor="contact-phone" className="sr-only">
        Teléfono
      </label>
      <input
        id="contact-phone"
        type="tel"
        required
        placeholder="Tu número de teléfono"
        aria-label="Tu número de teléfono"
        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700 placeholder:text-slate-400 outline-none focus:border-brand"
      />
      <button
        type="submit"
        aria-label="Solicitar llamada"
        className="w-full rounded-lg bg-brand px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-brand-dark"
      >
        Solicitar llamada
      </button>
    </motion.form>
  );
}
