"use client";

import { useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

const PARTICLE_COLORS = [
  "rgba(0, 87, 217, 0.7)",
  "rgba(6, 182, 212, 0.6)",
  "rgba(139, 92, 246, 0.5)",
  "rgba(0, 87, 217, 0.4)",
  "rgba(6, 182, 212, 0.4)",
];

const CONNECTION_DISTANCE = 160;

function createNodes(width: number, height: number, count: number): Node[] {
  const nodes: Node[] = [];
  for (let i = 0; i < count; i++) {
    nodes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      radius: Math.random() * 2.2 + 1,
      color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
    });
  }
  return nodes;
}

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.23, 1, 0.32, 1] as const },
  },
};

const fade = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.9, ease: "easeOut" as const },
  },
};

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const rafRef = useRef<number>(0);

  const getParticleCount = useCallback((width: number) => {
    if (width < 640) return 35;
    if (width < 1024) return 55;
    return 90;
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
            ctx.strokeStyle = `rgba(0, 87, 217, ${0.14 * opacity})`;
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
  }, [getParticleCount]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="inicio"
      className="relative flex min-h-[100dvh] items-center overflow-hidden bg-navy"
    >
      <div className="absolute inset-0">
        <canvas ref={canvasRef} className="h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/40 to-navy/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/30 via-transparent to-navy" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-32">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="max-w-2xl"
        >
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse-glow" />
              Inteligencia Artificial + Desarrollo
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-8 text-5xl font-bold leading-[1.05] tracking-[-0.03em] text-white md:text-6xl lg:text-[4.5rem]"
          >
            Transformamos ideas en{" "}
            <span className="gradient-text">soluciones digitales</span>{" "}
            inteligentes
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-lg leading-relaxed text-slate-400/80 md:text-xl"
          >
            Desarrollamos software, agentes de Inteligencia Artificial,
            infraestructura tecnológica y soluciones empresariales de alto
            rendimiento.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <a
              href="#contacto"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("contacto");
              }}
              className="group btn-glow inline-flex items-center justify-center gap-3 rounded-full bg-brand px-8 py-3.5 text-sm font-semibold text-white transition-all duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-brand-dark hover:shadow-lg hover:shadow-brand/25 active:scale-[0.97]"
            >
              Solicitar presupuesto
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 transition-transform duration-200 group-hover:translate-x-0.5">
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </a>
            <a
              href="#servicios"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("servicios");
              }}
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-white/20 hover:bg-white/10 active:scale-[0.97]"
            >
              Conocer nuestros servicios
            </a>
          </motion.div>

          <motion.div
            variants={fade}
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
      </div>
    </section>
  );
}
