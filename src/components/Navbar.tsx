"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { navLinks } from "../config/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl rounded-full transition-all duration-300 ${
          scrolled
            ? "bg-navy/70 backdrop-blur-xl border border-white/[0.06] shadow-lg shadow-black/10"
            : "bg-navy/50 backdrop-blur-lg border border-white/[0.04]"
        }`}
      >
        <div className="mx-auto flex h-14 items-center justify-between px-5 lg:h-[3.75rem] lg:px-6">
          <a
            href="#inicio"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("#inicio");
            }}
            className="relative z-10 flex items-center gap-0.5 text-xl font-bold tracking-tighter lg:text-2xl"
          >
            <span className="text-white">Soft</span>
            <span className="text-brand">Group</span>
          </a>

          <div className="hidden items-center gap-0.5 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(link.href);
                }}
                className="group relative rounded-full px-3.5 py-2 text-[13px] font-medium text-slate-300 transition-all duration-200 safe-hover:text-white"
              >
                {link.label}
                <span className="absolute bottom-1.5 left-3.5 h-px w-0 bg-brand transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-safe-hover:w-[calc(100%-1.75rem)]" />
              </a>
            ))}
          </div>

          <div className="hidden lg:block">
            <a
              href="#contacto"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#contacto");
              }}
              aria-label="Solicitar presupuesto"
              className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white transition-all duration-200 safe-hover:bg-brand-dark safe-hover:shadow-lg safe-hover:shadow-brand/25 active:scale-[0.97]"
            >
              Solicitar presupuesto
              <ChevronRight className="h-4 w-4" />
            </a>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full text-white transition-all duration-200 safe-hover:bg-white/10 lg:hidden"
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <span className="relative h-4 w-4">
              <motion.span
                animate={
                  mobileOpen
                    ? { rotate: 45, y: 0 }
                    : { rotate: 0, y: -6 }
                }
                transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                className="absolute left-0 top-0 h-4 w-full origin-center rounded-full bg-white"
              />
              <motion.span
                animate={
                  mobileOpen
                    ? { opacity: 0, scaleX: 0 }
                    : { opacity: 1, scaleX: 1 }
                }
                transition={{ duration: 0.2 }}
                className="absolute left-0 top-1/2 h-4 w-full -translate-y-1/2 rounded-full bg-white"
              />
              <motion.span
                animate={
                  mobileOpen
                    ? { rotate: -45, y: 0 }
                    : { rotate: 0, y: 6 }
                }
                transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                className="absolute left-0 bottom-0 h-4 w-full origin-center rounded-full bg-white"
              />
            </span>
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-3xl lg:hidden"
          >
            <nav
              id="mobile-menu"
              role="dialog"
              aria-label="Menú de navegación móvil"
              className="flex h-full flex-col items-center justify-center"
            >
              <div className="flex flex-col items-center gap-2">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{
                      delay: 0.05 * i,
                      duration: 0.4,
                      ease: [0.23, 1, 0.32, 1],
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(link.href);
                    }}
                    className="text-2xl font-semibold text-white/80 transition-all duration-200 safe-hover:text-white"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.05 * navLinks.length + 0.1,
                  duration: 0.4,
                  ease: [0.23, 1, 0.32, 1],
                }}
                className="mt-10"
              >
                <a
                  href="#contacto"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo("#contacto");
                  }}
                  aria-label="Solicitar presupuesto"
                  className="inline-flex items-center gap-2 rounded-full bg-brand px-8 py-3.5 text-sm font-semibold text-white transition-all duration-200 safe-hover:bg-brand-dark active:scale-[0.97]"
                >
                  Solicitar presupuesto
                  <ChevronRight className="h-4 w-4" />
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
