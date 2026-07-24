"use client";

import { useRef, useEffect, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

const PARTICLE_COLORS = [
  "rgba(37, 99, 235, 0.8)",
  "rgba(6, 182, 212, 0.7)",
  "rgba(139, 92, 246, 0.6)",
  "rgba(37, 99, 235, 0.5)",
  "rgba(6, 182, 212, 0.5)",
];

const CONNECTION_DISTANCE = 150;

function createNodes(width: number, height: number, count: number): Node[] {
  const nodes: Node[] = [];
  for (let i = 0; i < count; i++) {
    nodes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 2.5 + 0.8,
      color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
    });
  }
  return nodes;
}

export default function Hero() {
  const prefersReduced = useReducedMotion();

  const stagger = {
    hidden: {},
    visible: prefersReduced
      ? { transition: { delayChildren: 0.1 } }
      : { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReduced ? 0.1 : 0.7, ease: [0.23, 1, 0.32, 1] as const },
    },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.92 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: prefersReduced ? 0.1 : 0.8, ease: [0.23, 1, 0.32, 1] as const },
    },
  };

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const rafRef = useRef<number>(0);

  const getParticleCount = useCallback((width: number) => {
    if (width < 640) return 40;
    if (width < 1024) return 65;
    return 100;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);

      const count = getParticleCount(rect.width);
      if (nodesRef.current.length !== count) {
        nodesRef.current = createNodes(rect.width, rect.height, count);
      }
    };

    resize();

    if (prefersReduced) {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        const w = rect.width;
        const h = rect.height;
        ctx.clearRect(0, 0, w, h);

        for (const node of nodesRef.current) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
          ctx.fillStyle = node.color;
          ctx.fill();
        }

        for (let i = 0; i < nodesRef.current.length; i++) {
          for (let j = i + 1; j < nodesRef.current.length; j++) {
            const a = nodesRef.current[i];
            const b = nodesRef.current[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < CONNECTION_DISTANCE) {
              const opacity = 1 - dist / CONNECTION_DISTANCE;
              ctx.strokeStyle = `rgba(37, 99, 235, ${0.18 * opacity})`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }
      }

      return () => {
        window.removeEventListener("resize", resize);
      };
    }

    const animate = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }
      const w = rect.width;
      const h = rect.height;

      ctx.clearRect(0, 0, w, h);

      for (const node of nodesRef.current) {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > w) node.vx *= -1;
        if (node.y < 0 || node.y > h) node.vy *= -1;

        node.x = Math.max(0, Math.min(w, node.x));
        node.y = Math.max(0, Math.min(h, node.y));
      }

      ctx.lineWidth = 1;
      for (let i = 0; i < nodesRef.current.length; i++) {
        for (let j = i + 1; j < nodesRef.current.length; j++) {
          const a = nodesRef.current[i];
          const b = nodesRef.current[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DISTANCE) {
            const opacity = 1 - dist / CONNECTION_DISTANCE;
            ctx.strokeStyle = `rgba(37, 99, 235, ${0.18 * opacity})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const node of nodesRef.current) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [getParticleCount, prefersReduced]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="inicio"
      className="relative flex min-h-[100dvh] items-center overflow-hidden bg-surface-dark"
    >
      {/* Aurora gradient blobs */}
      <div className="aurora-blob absolute top-[-10%] left-[10%] h-[500px] w-[500px] bg-brand/25" style={{ animationDelay: "0s" }} />
      <div className="aurora-blob absolute bottom-[-5%] right-[5%] h-[400px] w-[400px] bg-cyan/20" style={{ animationDelay: "-7s" }} />
      <div className="aurora-blob absolute top-[30%] right-[20%] h-[300px] w-[300px] bg-violet/15" style={{ animationDelay: "-14s" }} />

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-pattern opacity-40" />

      {/* Canvas particles */}
      <div className="absolute inset-0">
        <canvas ref={canvasRef} className="h-full w-full" />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-surface-dark/90 via-surface-dark/50 to-surface-dark/80" />
      <div className="absolute inset-0 bg-gradient-to-b from-surface-dark/40 via-transparent to-surface-dark" />

      {/* Vignette */}
      <div className="hero-vignette" />

      {/* Scan line */}
      <div className="hero-scan-line" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-32">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          {/* Badge */}
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse-glow" />
              Inteligencia Artificial + Desarrollo
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={fadeUp}
            className="mt-8 text-4xl font-bold leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl md:text-6xl lg:text-[4.5rem]"
          >
            Transformamos Empresas{" "}
            <br className="hidden sm:block" />
            mediante{" "}
            <span className="gradient-text">Inteligencia Artificial</span>
            <br className="hidden md:block" />
            <span className="text-slate-300">Desarrollo de Software</span>{" "}
            <br className="hidden lg:block" />
            <span className="text-slate-400">e Infraestructura Cloud</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            className="mt-8 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg md:text-xl"
          >
            Creamos páginas web profesionales, desarrollamos sistemas
            empresariales, implementamos agentes de IA, automatizamos procesos
            y diseñamos infraestructura segura.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUp}
            className="mt-12 flex flex-col gap-4 sm:flex-row"
          >
            <a
              href="#contacto"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("contacto");
              }}
              aria-label="Solicitar una demo"
              className="group btn-glow inline-flex items-center justify-center gap-3 rounded-full bg-brand px-8 py-4 text-sm font-semibold text-white transition-all duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-brand-dark hover:shadow-lg hover:shadow-brand/25 active:scale-[0.97]"
            >
              Solicitar una Demo
              <span className="arrow-bounce flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </a>
            <a
              href="https://wa.me/593999999999"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Hablar por WhatsApp"
              className="whatsapp-pulse inline-flex items-center justify-center gap-3 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-8 py-4 text-sm font-semibold text-emerald-400 backdrop-blur-sm transition-all duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-emerald-500/50 hover:bg-emerald-500/20 hover:text-emerald-300 active:scale-[0.97]"
            >
              <MessageCircle className="h-4 w-4" />
              Hablar por WhatsApp
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeUp}
            className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-slate-500"
          >
            <span className="flex items-center gap-2">
              <span className="text-brand">✓</span> +180 proyectos entregados
            </span>
            <span className="flex items-center gap-2">
              <span className="text-brand">✓</span> +65 empresas confían en nosotros
            </span>
            <span className="flex items-center gap-2">
              <span className="text-brand">✓</span> Soporte 24/7 dedicado
            </span>
          </motion.div>
        </motion.div>

        {/* Right visual — tech composite */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          animate="visible"
          className="pointer-events-none absolute right-0 top-1/2 hidden -translate-y-1/2 lg:block"
        >
          <div className="relative h-[420px] w-[420px]">
            {/* Glow backdrop */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-brand/20 via-cyan/10 to-violet/15 blur-3xl" />

            {/* Glass panel */}
            <div className="liquid-glass-dark absolute inset-4 rounded-2xl p-6">
              {/* Dashboard mockup */}
              <div className="mb-4 flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-400/60" />
                <span className="ml-2 text-[10px] font-medium text-slate-500">dashboard.tsx</span>
              </div>

              {/* Chart bars */}
              <div className="mb-6 flex items-end gap-2 h-20">
                {[40, 65, 45, 80, 55, 90, 70, 95, 60, 85, 75, 100].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t bg-gradient-to-t from-brand/60 to-cyan/40"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>

              {/* Code snippet */}
              <div className="space-y-1.5 font-mono text-[10px] leading-relaxed">
                <div className="text-slate-500">
                  <span className="text-violet">const</span>{" "}
                  <span className="text-cyan">agent</span>{" "}
                  <span className="text-slate-600">=</span>{" "}
                  <span className="text-brand">createAgent</span>
                  <span className="text-slate-600">({"{"}</span>
                </div>
                <div className="pl-4 text-slate-500">
                  <span className="text-emerald">model</span>
                  <span className="text-slate-600">: </span>
                  <span className="text-amber">"gpt-4o"</span>
                  <span className="text-slate-600">,</span>
                </div>
                <div className="pl-4 text-slate-500">
                  <span className="text-emerald">tools</span>
                  <span className="text-slate-600">: [</span>
                  <span className="text-amber">"search"</span>
                  <span className="text-slate-600">,</span>{" "}
                  <span className="text-amber">"code"</span>
                  <span className="text-slate-600">],</span>
                </div>
                <div className="text-slate-600">{"});"}</div>
              </div>

              {/* Status indicators */}
              <div className="mt-5 flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald animate-pulse-glow" />
                  <span className="text-[10px] text-slate-500">AI Online</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse-glow" />
                  <span className="text-[10px] text-slate-500">API Active</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse-glow" />
                  <span className="text-[10px] text-slate-500">Cloud OK</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
