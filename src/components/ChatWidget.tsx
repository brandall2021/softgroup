"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  type?: "text" | "services" | "form" | "contact";
}

interface QuickReply {
  label: string;
  value: string;
}

const quickReplies: QuickReply[] = [
  { label: "Ver servicios", value: "services" },
  { label: "Solicitar presupuesto", value: "budget" },
  { label: "Hablar con un asesor", value: "advisor" },
];

const serviceOptions = [
  "Desarrollo Web",
  "Sistemas Informáticos",
  "Inteligencia Artificial",
  "Automatización",
  "Networking e Infraestructura",
  "Cloud & Ciberseguridad",
];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const hasGreetedRef = useRef(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const toggleChat = () => {
    if (!isOpen && !hasGreetedRef.current) {
      hasGreetedRef.current = true;
      setMessages([
        {
          id: crypto.randomUUID(),
          sender: "bot",
          text: "¡Hola! Soy el asistente virtual de SoftGroup. ¿En qué puedo ayudarte?",
          type: "text",
        },
      ]);
    }
    setIsOpen(!isOpen);
  };

  const addBotMessage = (text: string, type: ChatMessage["type"] = "text") => {
    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), sender: "bot", text, type },
    ]);
  };

  const handleQuickReply = (value: string) => {
    if (value === "services") {
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), sender: "user", text: "Ver servicios" },
        {
          id: crypto.randomUUID(),
          sender: "bot",
          text: "Nuestros servicios principales son:",
          type: "services",
        },
      ]);
    } else if (value === "budget") {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          sender: "user",
          text: "Solicitar presupuesto",
        },
        {
          id: crypto.randomUUID(),
          sender: "bot",
          text: "Cuéntanos sobre tu proyecto y te prepararemos una cotización.",
          type: "form",
        },
      ]);
    } else if (value === "advisor") {
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), sender: "user", text: "Hablar con un asesor" },
        {
          id: crypto.randomUUID(),
          sender: "bot",
          text: "Te conectaremos con un asesor especializado. Déjanos tu número y te contactaremos pronto.",
          type: "contact",
        },
      ]);
    }
  };

  const handleSendText = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), sender: "user", text: trimmed },
    ]);
    setInputValue("");

    setTimeout(() => {
      addBotMessage(
        "Gracias por tu mensaje. Un asesor revisará tu consulta y te responderá pronto. ¿Hay algo más en lo que pueda ayudarte?"
      );
    }, 600);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: prefersReduced ? 1 : 0.9, y: prefersReduced ? 0 : 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: prefersReduced ? 1 : 0.9, y: prefersReduced ? 0 : 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-4 z-50 flex w-[calc(100vw-2rem)] max-w-[380px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-black/15 sm:right-6"
            style={{ maxHeight: "500px" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-[#0F172A] px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand/20">
                  <MessageCircle className="h-4.5 w-4.5 text-brand" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">SoftGroup IA</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs text-slate-400">En línea</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Cerrar chat"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ minHeight: "300px" }} aria-live="polite" aria-label="Mensajes del chat">
              {messages.map((msg) => (
                <div key={msg.id}>
                  {msg.sender === "bot" ? (
                    <div className="flex gap-2.5">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand/10 mt-0.5">
                        <MessageCircle className="h-3.5 w-3.5 text-brand" />
                      </div>
                      <div className="max-w-[80%] space-y-2.5">
                        <p className="text-sm leading-relaxed text-slate-700">
                          {msg.text}
                        </p>

                        {msg.type === "services" && (
                          <div className="flex flex-wrap gap-1.5">
                            {serviceOptions.map((s) => (
                              <span
                                key={s}
                                className="inline-flex items-center rounded-full bg-brand/5 px-3 py-1 text-xs font-medium text-brand"
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                        )}

                        {msg.type === "form" && <BudgetMiniForm />}

                        {msg.type === "contact" && <ContactForm />}

                        {msg.type === "text" &&
                          messages.indexOf(msg) === messages.length - 1 &&
                          messages.length <= 2 && (
                            <div className="flex flex-wrap gap-2 pt-1">
                              {quickReplies.map((qr) => (
                                <button
                                  key={qr.value}
                                  onClick={() => handleQuickReply(qr.value)}
                                  aria-label={qr.label}
                                  className="rounded-full border border-brand/20 bg-brand/5 px-3.5 py-1.5 text-xs font-semibold text-brand transition-all hover:bg-brand hover:text-white"
                                >
                                  {qr.label}
                                </button>
                              ))}
                            </div>
                          )}
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-end">
                      <div className="max-w-[80%] rounded-2xl rounded-br-md bg-brand px-4 py-2.5">
                        <p className="text-sm leading-relaxed text-white">{msg.text}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-slate-100 px-4 py-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendText();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Escribe un mensaje..."
                  aria-label="Escribe un mensaje"
                  className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/10"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand text-white transition-all hover:bg-brand-dark disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label="Enviar mensaje"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        onClick={toggleChat}
        whileHover={prefersReduced ? undefined : { scale: 1.05 }}
        whileTap={prefersReduced ? undefined : { scale: 0.95 }}
        className="fixed bottom-6 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white shadow-lg shadow-brand/30 transition-colors hover:bg-brand-dark sm:right-6"
        aria-label={isOpen ? "Cerrar chat" : "Abrir chat"}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: prefersReduced ? 0 : -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: prefersReduced ? 0 : 90, opacity: 0 }}
              transition={{ duration: prefersReduced ? 0.1 : 0.15 }}
            >
              <X className="h-5.5 w-5.5" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: prefersReduced ? 0 : 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: prefersReduced ? 0 : -90, opacity: 0 }}
              transition={{ duration: prefersReduced ? 0.1 : 0.15 }}
            >
              <MessageCircle className="h-5.5 w-5.5" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}

/* ── Inline sub-components ──────────────────────────────────── */

function BudgetMiniForm() {
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
      <label htmlFor="budget-name" className="sr-only">Nombre</label>
      <input
        id="budget-name"
        type="text"
        required
        placeholder="Tu nombre"
        aria-label="Tu nombre"
        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700 placeholder:text-slate-400 outline-none focus:border-brand"
      />
      <label htmlFor="budget-email" className="sr-only">Email</label>
      <input
        id="budget-email"
        type="email"
        required
        placeholder="Tu email"
        aria-label="Tu email"
        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700 placeholder:text-slate-400 outline-none focus:border-brand"
      />
      <label htmlFor="budget-service" className="sr-only">Servicio</label>
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

function ContactForm() {
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
      <label htmlFor="contact-name" className="sr-only">Nombre</label>
      <input
        id="contact-name"
        type="text"
        required
        placeholder="Tu nombre"
        aria-label="Tu nombre"
        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700 placeholder:text-slate-400 outline-none focus:border-brand"
      />
      <label htmlFor="contact-phone" className="sr-only">Teléfono</label>
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
