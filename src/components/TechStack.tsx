"use client";

import { motion, useReducedMotion } from "framer-motion";

interface TechRow {
  items: string[];
  direction: "left" | "right";
  speed: number;
}

const techRows: TechRow[] = [
  {
    items: ["React", "Angular", "Node.js", "Python", "Java", "TypeScript"],
    direction: "left",
    speed: 30,
  },
  {
    items: ["Docker", "Kubernetes", "PostgreSQL", "MySQL", "MongoDB"],
    direction: "right",
    speed: 35,
  },
  {
    items: ["Linux", "Windows Server", "Nginx", "Traefik"],
    direction: "left",
    speed: 40,
  },
  {
    items: ["OpenAI", "Claude", "Gemini", "n8n", "Qdrant", "Pinecone"],
    direction: "right",
    speed: 28,
  },
  {
    items: ["Mikrotik", "Cisco", "VMware", "Proxmox"],
    direction: "left",
    speed: 38,
  },
];

function MarqueeRow({ row, prefersReduced }: { row: TechRow; prefersReduced: boolean }) {
  const doubled = [...row.items, ...row.items, ...row.items];
  const duration = (row.items.length * row.speed) / 10;

  return (
    <div className="relative overflow-hidden py-3 group">
      <div
        className="flex gap-4 w-max"
        style={
          prefersReduced
            ? { animation: "none" }
            : {
                animation: `${row.direction === "left" ? "marquee-left" : "marquee-right"} ${duration}s linear infinite`,
              }
        }
      >
        {doubled.map((tech, i) => (
          <div
            key={`${tech}-${i}`}
            className="flex-shrink-0 px-6 py-3 rounded-full border border-slate-200/60 bg-white/70 backdrop-blur-sm text-sm font-medium text-navy hover:border-brand/40 hover:bg-brand/5 hover:text-brand transition-all duration-300 cursor-default select-none"
          >
            {tech}
          </div>
        ))}
      </div>

      {/* Hover pause: override animation */}
      <style>{`
        .group:hover > div {
          animation-play-state: paused !important;
        }
      `}</style>
    </div>
  );
}

export default function TechStack() {
  const prefersReduced = useReducedMotion();

  return (
    <section id="tecnologias" className="py-24 md:py-32 bg-surface overflow-hidden">
      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-33.333%); }
          100% { transform: translateX(0); }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: prefersReduced ? 0.1 : 0.6 }}
          className="text-center"
        >
          <span className="inline-block text-sm font-semibold tracking-widest uppercase text-brand mb-4">
            Tecnologías
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6">
            Stack tecnológico de vanguardia
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Utilizamos las mejores herramientas del mercado para entregar soluciones robustas y escalables
          </p>
        </motion.div>
      </div>

      <div className="max-w-5xl mx-auto space-y-1">
        {techRows.map((row, i) => (
          <MarqueeRow key={i} row={row} prefersReduced={!!prefersReduced} />
        ))}
      </div>

      <div className="max-w-5xl mx-auto mt-16">
        <motion.div
          initial={{ opacity: prefersReduced ? 1 : 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReduced ? 0.1 : 0.6, delay: prefersReduced ? 0 : 0.3 }}
          className="flex flex-wrap justify-center gap-4 text-sm text-slate-400"
        >
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand" />
            Frontend
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan" />
            Backend & Bases de Datos
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Infraestructura
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-violet" />
            Inteligencia Artificial
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            Networking
          </span>
        </motion.div>
      </div>
    </section>
  );
}
