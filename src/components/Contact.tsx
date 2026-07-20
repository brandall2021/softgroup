"use client";

import { useState, useCallback, useRef } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Check,
  type LucideIcon,
} from "lucide-react";

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 100-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 11-2.882 0 1.441 1.441 0 012.882 0z" />
    </svg>
  );
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function Spinner() {
  return (
    <svg
      className="h-4 w-4 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

const services = [
  "Desarrollo Web",
  "Sistemas Informáticos",
  "Inteligencia Artificial",
  "Automatización",
  "Networking",
  "Cloud & Seguridad",
  "Consultoría",
];

type FormErrors = {
  nombre?: string;
  email?: string;
  servicio?: string;
  mensaje?: string;
};

interface ContactInfoItem {
  icon: LucideIcon;
  label: string;
  value: string;
  href: string | null;
}

const contactInfo: ContactInfoItem[] = [
  {
    icon: Mail,
    label: "Email",
    value: "info@softgroup.com",
    href: "mailto:info@softgroup.com",
  },
  {
    icon: Phone,
    label: "Teléfono",
    value: "+51 999 888 777",
    href: "tel:+51999888777",
  },
  {
    icon: MapPin,
    label: "Dirección",
    value: "Lima, Perú",
    href: null,
  },
  {
    icon: Clock,
    label: "Horario",
    value: "Lun - Vie, 9:00 AM - 6:00 PM",
    href: null,
  },
];

const customEasing: [number, number, number, number] = [0.23, 1, 0.32, 1];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const formRef = useRef<HTMLFormElement>(null);
  const prefersReduced = useReducedMotion();

  const validate = useCallback(
    (name: string, value: string): string | undefined => {
      switch (name) {
        case "nombre":
          if (!value.trim()) return "Por favor ingresa tu nombre";
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
    if (touched[name]) {
      const error = validate(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const newErrors: FormErrors = {};
    for (const key of ["nombre", "email", "servicio", "mensaje"] as const) {
      const err = validate(key, String(formData.get(key) || ""));
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
    setSubmitting(false);
    setSubmitted(true);
  };

  const inputClasses =
    "w-full border-b border-slate-200 bg-transparent py-3 text-sm text-navy outline-none transition-colors placeholder:text-slate-400 focus:border-brand";

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
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: customEasing }}
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
              ) : (
                <motion.form
                  key="form"
                  ref={formRef}
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ ease: customEasing }}
                  className="rounded-2xl border border-slate-100 bg-white p-8 shadow-xl shadow-slate-200/50 sm:p-10"
                >
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="nombre"
                        className="mb-1.5 block text-sm font-medium text-slate-700"
                      >
                        Nombre
                      </label>
                      <input
                        id="nombre"
                        name="nombre"
                        type="text"
                        required
                        autoComplete="name"
                        placeholder="Tu nombre completo"
                        aria-invalid={!!errors.nombre}
                        aria-describedby={
                          errors.nombre ? "nombre-error" : undefined
                        }
                        onBlur={handleBlur}
                        onChange={handleChange}
                        className={inputClasses}
                      />
                      {errors.nombre && touched.nombre && (
                        <p
                          id="nombre-error"
                          className="mt-1.5 text-xs text-red-500"
                          role="alert"
                        >
                          {errors.nombre}
                        </p>
                      )}
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="empresa"
                        className="mb-1.5 block text-sm font-medium text-slate-700"
                      >
                        Empresa
                      </label>
                      <input
                        id="empresa"
                        name="empresa"
                        type="text"
                        placeholder="Nombre de tu empresa"
                        className={inputClasses}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="mb-1.5 block text-sm font-medium text-slate-700"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="correo@empresa.com"
                        aria-invalid={!!errors.email}
                        aria-describedby={
                          errors.email
                            ? "email-error"
                            : "email-helper"
                        }
                        onBlur={handleBlur}
                        onChange={handleChange}
                        className={inputClasses}
                      />
                      {errors.email && touched.email ? (
                        <p
                          id="email-error"
                          className="mt-1.5 text-xs text-red-500"
                          role="alert"
                        >
                          {errors.email}
                        </p>
                      ) : (
                        <p
                          id="email-helper"
                          className="mt-1.5 text-xs text-slate-400"
                        >
                          Te contactaremos en menos de 24 horas
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="telefono"
                        className="mb-1.5 block text-sm font-medium text-slate-700"
                      >
                        Teléfono
                      </label>
                      <input
                        id="telefono"
                        name="telefono"
                        type="tel"
                        autoComplete="tel"
                        placeholder="+51 999 000 000"
                        className={inputClasses}
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="servicio"
                        className="mb-1.5 block text-sm font-medium text-slate-700"
                      >
                        Servicio requerido
                      </label>
                      <select
                        id="servicio"
                        name="servicio"
                        required
                        defaultValue=""
                        aria-invalid={!!errors.servicio}
                        aria-describedby={
                          errors.servicio ? "servicio-error" : undefined
                        }
                        onBlur={handleBlur}
                        onChange={handleChange}
                        className={inputClasses}
                      >
                        <option value="" disabled>
                          Selecciona un servicio
                        </option>
                        {services.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                      {errors.servicio && touched.servicio && (
                        <p
                          id="servicio-error"
                          className="mt-1.5 text-xs text-red-500"
                          role="alert"
                        >
                          {errors.servicio}
                        </p>
                      )}
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="mensaje"
                        className="mb-1.5 block text-sm font-medium text-slate-700"
                      >
                        Mensaje
                      </label>
                      <textarea
                        id="mensaje"
                        name="mensaje"
                        required
                        rows={4}
                        placeholder="Cuéntanos sobre tu proyecto..."
                        aria-invalid={!!errors.mensaje}
                        aria-describedby={
                          errors.mensaje ? "mensaje-error" : undefined
                        }
                        onBlur={handleBlur}
                        onChange={handleChange}
                        className={`${inputClasses} resize-none`}
                      />
                      {errors.mensaje && touched.mensaje && (
                        <p
                          id="mensaje-error"
                          className="mt-1.5 text-xs text-red-500"
                          role="alert"
                        >
                          {errors.mensaje}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-8">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-8 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-brand-dark hover:shadow-lg hover:shadow-brand/25 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-70 sm:w-auto"
                    >
                      {submitting ? (
                        <>
                          <Spinner />
                          Enviando...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Enviar solicitud — te respondemos en 24h
                        </>
                      )}
                    </button>
                    <p className="mt-3 text-xs text-slate-400 text-center sm:text-left">
                      ✓ Sin compromiso · Respuesta garantizada en 24 horas
                    </p>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: prefersReduced ? 0 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ ease: customEasing }}
            className="flex flex-col gap-6 lg:col-span-2"
          >
            {contactInfo.map((item) => (
              <div
                key={item.label}
                className="group relative rounded-2xl p-[1px] bg-gradient-to-br from-slate-100 to-slate-50"
              >
                <div className="flex items-start gap-4 rounded-[calc(1rem-1px)] bg-white p-5">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-brand/10 transition-colors duration-200 group-hover:bg-brand/15">
                    <item.icon className="h-5 w-5 text-brand" />
                  </div>
                  <div>
                    <p className="mb-0.5 text-xs font-medium uppercase tracking-wider text-slate-400">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-sm font-medium text-navy transition-colors hover:text-brand"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium text-navy">
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}

            <div className="flex items-center gap-3">
              {[
                { icon: LinkedinIcon, href: "#", label: "LinkedIn" },
                { icon: InstagramIcon, href: "#", label: "Instagram" },
                { icon: GithubIcon, href: "#", label: "GitHub" },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  whileHover={prefersReduced ? undefined : { scale: 1.1 }}
                  whileTap={prefersReduced ? undefined : { scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-400 transition-all duration-200 hover:border-brand hover:bg-brand/10 hover:text-brand"
                >
                  <social.icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>

            <div className="relative flex h-40 items-center justify-center overflow-hidden rounded-xl border border-dashed border-slate-200 bg-slate-50">
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />
              <div className="relative z-10 flex flex-col items-center gap-2 text-slate-400">
                <MapPin className="h-5 w-5" strokeWidth={1.5} />
                <span className="text-sm font-medium">Lima, Perú</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
