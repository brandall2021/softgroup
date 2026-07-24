"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  MessageSquare,
  Brain,
  FileSearch,
  Workflow,
  ScanText,
  Eye,
  FileText,
  Database,
  LayoutDashboard,
  ArrowDown,
} from "lucide-react";
import AnimateOnScroll from "./AnimateOnScroll";

const capabilities = [
  {
    icon: MessageSquare,
    title: "Chatbots Inteligentes",
    description: "Asistentes conversacionales que resuelven consultas 24/7 con contexto de tu negocio.",
    color: "text-brand",
    bg: "bg-brand/10",
  },
  {
    icon: Brain,
    title: "WhatsApp IA",
    description: "Agentes automatizados para WhatsApp Business que gestionan ventas y soporte.",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
  },
  {
    icon: FileSearch,
    title: "RAG",
    description: "Retrieval-Augmented Generation para respuestas precisas basadas en tus documentos.",
    color: "text-violet",
    bg: "bg-violet/10",
  },
  {
    icon: Workflow,
    title: "Automatización",
    description: "Workflows inteligentes con n8n que conectan tus sistemas automáticamente.",
    color: "text-cyan",
    bg: "bg-cyan/10",
  },
  {
    icon: ScanText,
    title: "OCR",
    description: "Extracción automática de datos de facturas, contratos y documentos.",
    color: "text-amber-400",
    bg: "bg-amber-400/10",
  },
  {
    icon: Eye,
    title: "Visión Artificial",
    description: "Análisis de imágenes y video para control de calidad y monitoreo.",
    color: "text-rose-400",
    bg: "bg-rose-400/10",
  },
  {
    icon: FileText,
    title: "Procesamiento Documental",
    description: "Clasificación, resumen y análisis automático de documentos a escala.",
    color: "text-brand-light",
    bg: "bg-brand-light/10",
  },
];

const flowSteps = [
  {
    icon: MessageSquare,
    label: "Cliente",
    sublabel: "WhatsApp / Web / Email",
    color: "from-brand to-brand-dark",
  },
  {
    icon: Brain,
    label: "IA",
    sublabel: "Procesamiento Inteligente",
    color: "from-cyan to-brand",
  },
  {
    icon: Workflow,
    label: "Automatización",
    sublabel: "n8n / Workflows",
    color: "from-violet to-brand",
  },
  {
    icon: Database,
    label: "Base de Datos",
    sublabel: "PostgreSQL / MongoDB / Qdrant",
    color: "from-brand-dark to-navy",
  },
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    sublabel: "Métricas en Tiempo Real",
    color: "from-cyan to-violet",
  },
];

const techStack = [
  "OpenAI", "Claude", "Gemini", "n8n", "LangChain",
  "MCP", "RAG", "Pinecone", "Qdrant", "DeepSeek", "Llama",
];

function NeuralVisualization() {
  const prefersReduced = useReducedMotion();

  const orbitAnimation = (duration: number, reverse = false) => ({
    rotate: reverse ? [360, 0] : [0, 360],
    transition: {
      duration,
      repeat: Infinity,
      ease: "linear" as const,
    },
  });

  const nodes = [
    { angle: 0, radius: 100, size: 7, delay: 0, color: "#06B6D4" },
    { angle: 60, radius: 100, size: 8, delay: 0.3, color: "#2563EB" },
    { angle: 120, radius: 100, size: 6, delay: 0.6, color: "#8B5CF6" },
    { angle: 180, radius: 100, size: 7, delay: 0.9, color: "#06B6D4" },
    { angle: 240, radius: 100, size: 8, delay: 1.2, color: "#2563EB" },
    { angle: 300, radius: 100, size: 6, delay: 1.5, color: "#8B5CF6" },
  ];

  const innerNodes = [
    { angle: 30, radius: 55, size: 4, delay: 0.2, color: "#06B6D4" },
    { angle: 90, radius: 55, size: 5, delay: 0.5, color: "#2563EB" },
    { angle: 150, radius: 55, size: 4, delay: 0.8, color: "#8B5CF6" },
    { angle: 210, radius: 55, size: 5, delay: 1.1, color: "#06B6D4" },
    { angle: 270, radius: 55, size: 4, delay: 1.4, color: "#2563EB" },
    { angle: 330, radius: 55, size: 5, delay: 1.7, color: "#8B5CF6" },
  ];

  return (
    <div className="relative mx-auto h-[320px] w-[320px] md:h-[380px] md:w-[380px]">
      {/* Background glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-brand/15 via-cyan/10 to-violet/10 blur-3xl" />

      {/* Outer orbit ring */}
      <div className="absolute left-1/2 top-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand/10 md:h-[260px] md:w-[260px]" />

      {/* Inner orbit ring */}
      <div className="absolute left-1/2 top-1/2 h-[110px] w-[110px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan/10 md:h-[130px] md:w-[130px]" />

      {/* Outer orbit nodes */}
      <motion.div
        animate={orbitAnimation(30)}
        className="absolute inset-0"
      >
        {nodes.map((node, i) => {
          const rad = (node.angle * Math.PI) / 180;
          const x = Math.cos(rad) * node.radius;
          const y = Math.sin(rad) * node.radius;
          return (
            <motion.div
              key={i}
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: [0.9, 1.1, 0.9],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: node.delay,
              }}
              className="absolute left-1/2 top-1/2"
              style={{
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
              }}
            >
              <div
                className="rounded-full"
                style={{
                  width: node.size * 2,
                  height: node.size * 2,
                  backgroundColor: node.color,
                  boxShadow: `0 0 ${node.size * 3}px ${node.color}`,
                }}
              />
            </motion.div>
          );
        })}
      </motion.div>

      {/* Inner orbit nodes */}
      <motion.div
        animate={orbitAnimation(20, true)}
        className="absolute inset-0"
      >
        {innerNodes.map((node, i) => {
          const rad = (node.angle * Math.PI) / 180;
          const x = Math.cos(rad) * node.radius;
          const y = Math.sin(rad) * node.radius;
          return (
            <motion.div
              key={i}
              animate={{
                opacity: [0.4, 0.9, 0.4],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: node.delay,
              }}
              className="absolute left-1/2 top-1/2"
              style={{
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
              }}
            >
              <div
                className="rounded-full"
                style={{
                  width: node.size * 2,
                  height: node.size * 2,
                  backgroundColor: node.color,
                  boxShadow: `0 0 ${node.size * 2}px ${node.color}`,
                }}
              />
            </motion.div>
          );
        })}
      </motion.div>

      {/* SVG connecting lines */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 380 380">
        {/* Outer connections */}
        {nodes.map((node, i) => {
          const next = nodes[(i + 1) % nodes.length];
          const rad1 = (node.angle * Math.PI) / 180;
          const rad2 = (next.angle * Math.PI) / 180;
          const x1 = 190 + Math.cos(rad1) * node.radius;
          const y1 = 190 + Math.sin(rad1) * node.radius;
          const x2 = 190 + Math.cos(rad2) * next.radius;
          const y2 = 190 + Math.sin(rad2) * next.radius;
          return (
            <motion.line
              key={`outer-${i}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="rgba(37, 99, 235, 0.15)"
              strokeWidth={1}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: i * 0.2 }}
            />
          );
        })}

        {/* Cross connections */}
        {[0, 2, 4].map((i) => {
          const outer = nodes[i];
          const inner = innerNodes[i + 1] || innerNodes[0];
          const radO = (outer.angle * Math.PI) / 180;
          const radI = (inner.angle * Math.PI) / 180;
          const x1 = 190 + Math.cos(radO) * outer.radius;
          const y1 = 190 + Math.sin(radO) * outer.radius;
          const x2 = 190 + Math.cos(radI) * inner.radius;
          const y2 = 190 + Math.sin(radI) * inner.radius;
          return (
            <motion.line
              key={`cross-${i}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="rgba(6, 182, 212, 0.1)"
              strokeWidth={1}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 1 + i * 0.15 }}
            />
          );
        })}
      </svg>

      {/* Center core */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          animate={{
            boxShadow: [
              "0 0 20px rgba(37, 99, 235, 0.3)",
              "0 0 40px rgba(37, 99, 235, 0.5)",
              "0 0 20px rgba(37, 99, 235, 0.3)",
            ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-brand to-cyan md:h-20 md:w-20"
        >
          <span className="text-lg font-bold text-white md:text-xl">IA</span>
        </motion.div>
      </div>

      {/* Label */}
      <motion.p
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs font-medium tracking-widest text-slate-500 uppercase"
      >
        IA Engine
      </motion.p>
    </div>
  );
}

function FlowDiagram() {
  const prefersReduced = useReducedMotion();

  return (
    <div className="flex flex-col items-center gap-0">
      {flowSteps.map((step, i) => {
        const Icon = step.icon;
        const isLast = i === flowSteps.length - 1;

        return (
          <div key={i} className="flex flex-col items-center">
            <AnimateOnScroll
              animation="zoomIn"
              delay={i * 0.15}
              className="w-full"
            >
              <div className="glass-card-dark hover-glow group mx-auto flex max-w-sm items-center gap-4 rounded-2xl p-5 transition-all duration-300">
                <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${step.color} shadow-lg shadow-brand/20`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">{step.label}</h4>
                  <p className="text-sm text-slate-400">{step.sublabel}</p>
                </div>
              </div>
            </AnimateOnScroll>

            {!isLast && (
              <AnimateOnScroll animation="fadeUp" delay={i * 0.15 + 0.1}>
                <motion.div
                  animate={prefersReduced ? {} : { y: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowDown className="my-1 h-5 w-5 text-brand/40" />
                </motion.div>
              </AnimateOnScroll>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function AIAgent() {
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="agentes-ia"
      className="relative overflow-hidden bg-surface-dark py-24 md:py-32"
    >
      {/* Background effects */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-brand/5 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <AnimateOnScroll animation="fadeUp">
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan/20 bg-cyan/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse-glow" />
              Inteligencia Artificial
            </span>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fadeUp" delay={0.1}>
            <h2 className="mt-8 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
              Agentes IA que{" "}
              <span className="gradient-text">transforman</span>{" "}
              tu negocio
            </h2>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fadeUp" delay={0.2}>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
              Desarrollamos agentes de inteligencia artificial que se integran
              con tus sistemas existentes para automatizar procesos, mejorar la
              atención al cliente y generar insights accionables.
            </p>
          </AnimateOnScroll>
        </div>

        {/* Main content: Visualization + Flow */}
        <div className="mt-20 grid items-start gap-16 lg:grid-cols-2">
          {/* Left: Neural Visualization */}
          <AnimateOnScroll animation="zoomIn" className="flex justify-center">
            <NeuralVisualization />
          </AnimateOnScroll>

          {/* Right: Flow Diagram */}
          <AnimateOnScroll animation="fadeRight" delay={0.2}>
            <h3 className="mb-8 text-center text-xl font-semibold text-white lg:text-left">
              Flujo de Procesamiento
            </h3>
            <FlowDiagram />
          </AnimateOnScroll>
        </div>

        {/* Capabilities grid */}
        <div className="mt-24">
          <AnimateOnScroll animation="fadeUp">
            <h3 className="mb-12 text-center text-xl font-semibold text-white">
              Capacidades
            </h3>
          </AnimateOnScroll>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {capabilities.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <AnimateOnScroll
                  key={i}
                  animation="fadeUp"
                  delay={i * 0.08}
                >
                  <div className="glass-card-dark hover-glow group rounded-2xl p-6 transition-all duration-300">
                    <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${cap.bg} transition-transform duration-300 group-hover:scale-110`}>
                      <Icon className={`h-6 w-6 ${cap.color}`} />
                    </div>
                    <h4 className="font-semibold text-white">{cap.title}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">
                      {cap.description}
                    </p>
                  </div>
                </AnimateOnScroll>
              );
            })}
          </div>
        </div>

        {/* Tech stack */}
        <AnimateOnScroll animation="fadeUp" delay={0.2}>
          <div className="mt-20 flex flex-wrap items-center justify-center gap-3">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/[0.06] bg-white/5 px-4 py-2 text-sm font-medium text-slate-400 transition-all duration-200 hover:border-brand/30 hover:bg-brand/10 hover:text-brand"
              >
                {tech}
              </span>
            ))}
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
