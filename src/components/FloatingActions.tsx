"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, MessageCircle, Calendar, FileText } from "lucide-react";

const actions = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    href: "https://wa.me/593999999999",
    external: true,
    color: "bg-[#25D366]",
    hoverColor: "hover:bg-[#20BD5A]",
    shadow: "shadow-[#25D366]/30",
    pulse: true,
  },
  {
    icon: Calendar,
    label: "Agenda reunión",
    href: "#contacto",
    external: false,
    color: "bg-brand",
    hoverColor: "hover:bg-brand-dark",
    shadow: "shadow-brand/30",
    pulse: false,
  },
  {
    icon: FileText,
    label: "Solicitar presupuesto",
    href: "#calculadora",
    external: false,
    color: "bg-violet",
    hoverColor: "hover:bg-violet/90",
    shadow: "shadow-violet/30",
    pulse: false,
  },
];

export default function FloatingActions() {
  const [open, setOpen] = useState(false);

  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleClick = (action: (typeof actions)[0]) => {
    setOpen(false);
    if (action.external) return;
    setTimeout(() => scrollTo(action.href), 100);
  };

  return (
    <div className="fixed bottom-24 right-6 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open &&
          actions.map((action, i) => {
            const Icon = action.icon;
            return (
              <motion.a
                key={action.label}
                href={action.href}
                target={action.external ? "_blank" : undefined}
                rel={action.external ? "noopener noreferrer" : undefined}
                onClick={() => handleClick(action)}
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5, y: 20 }}
                transition={{
                  delay: i * 0.08,
                  duration: 0.25,
                  ease: [0.23, 1, 0.32, 1],
                }}
                className={`flex items-center gap-2 rounded-full ${action.color} ${action.hoverColor} ${action.shadow} px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition-colors duration-200`}
                aria-label={action.label}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{action.label}</span>
              </motion.a>
            );
          })}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-300 ${
          open
            ? "bg-slate-800 shadow-black/20"
            : "bg-brand shadow-brand/30"
        }`}
        aria-label={open ? "Cerrar menú" : "Abrir menú de contacto"}
        aria-expanded={open}
      >
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {open ? (
            <X className="h-5 w-5 text-white" />
          ) : (
            <Plus className="h-5 w-5 text-white" />
          )}
        </motion.span>
      </motion.button>
    </div>
  );
}
