"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import type { FormErrors } from "../types/contact";
import ContactForm from "./contact/ContactForm";
import ContactInfo from "./contact/ContactInfo";
import SuccessMessage from "./contact/SuccessMessage";

const customEasing: [number, number, number, number] = [0.23, 1, 0.32, 1];

const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 60_000;

function sanitizeInput(value: string): string {
  let sanitized = value.trim();
  sanitized = sanitized.replace(/<[^>]*>/g, "");
  sanitized = sanitized
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
  return sanitized;
}

export default function Contact() {
  const [csrfToken] = useState(() => crypto.randomUUID());
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submissionTimestamps, setSubmissionTimestamps] = useState<number[]>([]);
  const [cooldownRemaining, setCooldownRemaining] = useState(0);
  const [mensajeLength, setMensajeLength] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (cooldownRemaining <= 0) return;
    const timer = setInterval(() => {
      setCooldownRemaining((prev) => {
        const next = prev - 1000;
        return next > 0 ? next : 0;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldownRemaining]);

  const isRateLimited = useCallback(() => {
    const now = Date.now();
    const recent = submissionTimestamps.filter(
      (ts) => now - ts < RATE_LIMIT_WINDOW_MS
    );
    return recent.length >= RATE_LIMIT_MAX;
  }, [submissionTimestamps]);

  const cooldownSeconds = Math.ceil(cooldownRemaining / 1000);

  const validate = useCallback(
    (name: string, value: string): string | undefined => {
      switch (name) {
        case "nombre":
          if (!value.trim()) return "Por favor ingresa tu nombre";
          if (value.trim().length < 2)
            return "El nombre debe tener al menos 2 caracteres";
          return undefined;
        case "email":
          if (!value.trim()) return "Por favor ingresa tu email";
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
            return "Ingresa un email válido";
          return undefined;
        case "servicio":
          if (!value) return "Selecciona un servicio";
          return undefined;
        case "mensaje":
          if (!value.trim()) return "Por favor cuéntanos sobre tu proyecto";
          if (value.trim().length < 10)
            return "El mensaje debe tener al menos 10 caracteres";
          return undefined;
        default:
          return undefined;
      }
    },
    []
  );

  const handleBlur = (
    e: React.FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validate(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (name === "mensaje") {
      setMensajeLength(value.length);
    }
    if (touched[name]) {
      const error = validate(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    if (formData.get("website")) return;

    if (isRateLimited()) return;

    const sanitizedData: Record<string, string> = {};
    for (const key of ["nombre", "email", "servicio", "mensaje"] as const) {
      sanitizedData[key] = sanitizeInput(String(formData.get(key) || ""));
    }

    const newErrors: FormErrors = {};
    for (const key of ["nombre", "email", "servicio", "mensaje"] as const) {
      const err = validate(key, sanitizedData[key]);
      if (err) newErrors[key] = err;
    }

    setTouched({
      nombre: true,
      email: true,
      servicio: true,
      mensaje: true,
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setSubmissionTimestamps((prev) => {
      const now = Date.now();
      const recent = prev.filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);
      const updated = [...recent, now];
      if (updated.length >= RATE_LIMIT_MAX) {
        const oldest = Math.min(...updated);
        setCooldownRemaining(RATE_LIMIT_WINDOW_MS - (now - oldest));
      }
      return updated;
    });
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <section id="contacto" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <motion.p
            initial={{ opacity: 0, y: prefersReduced ? 0 : 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ease: customEasing }}
            className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand"
          >
            Contacto
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, ease: customEasing }}
            className="text-3xl font-bold tracking-tight text-navy sm:text-4xl lg:text-5xl"
          >
            ¿Tienes un proyecto en mente?{" "}
            <span className="gradient-text">Hablemos</span>
          </motion.h2>
        </div>

        <div className="grid gap-12 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, x: prefersReduced ? 0 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ ease: customEasing }}
            className="lg:col-span-3"
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <SuccessMessage />
              ) : (
                <ContactForm
                  errors={errors}
                  touched={touched}
                  mensajeLength={mensajeLength}
                  submitting={submitting}
                  cooldownRemaining={cooldownRemaining}
                  cooldownSeconds={cooldownSeconds}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  onSubmit={handleSubmit}
                  formRef={formRef}
                  csrfToken={csrfToken}
                />
              )}
            </AnimatePresence>
          </motion.div>

          <ContactInfo />
        </div>
      </div>
    </section>
  );
}
