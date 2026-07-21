import {
  Send,
  AlertTriangle,
} from "lucide-react";
import { motion } from "framer-motion";
import type { ContactFormProps } from "../../types/contact";
import { services } from "../../config/contact";

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


const inputClasses =
  "w-full border-b border-slate-200 bg-transparent py-3 text-sm text-navy outline-none transition-colors placeholder:text-slate-400 focus:border-brand";

export default function ContactForm({
  errors,
  touched,
  mensajeLength,
  submitting,
  cooldownRemaining,
  cooldownSeconds,
  onBlur,
  onChange,
  onSubmit,
  formRef,
  csrfToken,
}: ContactFormProps) {
  return (
    <motion.form
      ref={formRef}
      onSubmit={onSubmit}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: [0.23, 1, 0.32, 1] }}
      aria-label="Formulario de contacto"
      className="rounded-2xl border border-slate-100 bg-white p-8 shadow-xl shadow-slate-200/50 sm:p-10"
    >
      <input type="hidden" name="csrf_token" value={csrfToken} />

      <div
        style={{
          position: "absolute",
          left: "-9999px",
          opacity: 0,
          height: 0,
          width: 0,
          overflow: "hidden",
        }}
        aria-hidden="true"
      >
        <label htmlFor="website">Leave this empty</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
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
            aria-describedby={errors.nombre ? "nombre-error" : undefined}
            onBlur={onBlur}
            onChange={onChange}
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
              errors.email ? "email-error" : "email-helper"
            }
            onBlur={onBlur}
            onChange={onChange}
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
            onBlur={onBlur}
            onChange={onChange}
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
            onBlur={onBlur}
            onChange={onChange}
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
          <p className="mt-1.5 text-xs text-slate-400 text-right">
            {mensajeLength} caracteres
          </p>
        </div>
      </div>

      <div className="mt-8">
        {cooldownRemaining > 0 && (
          <div
            className="mb-4 flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-700"
            role="alert"
          >
            <AlertTriangle className="h-4 w-4 flex-shrink-0" />
            <span>
              Demasiadas solicitudes. Intenta en{" "}
              <strong>{cooldownSeconds}s</strong>.
            </span>
          </div>
        )}
        <button
          type="submit"
          disabled={submitting || cooldownRemaining > 0}
          aria-label="Enviar solicitud de contacto"
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
  );
}
