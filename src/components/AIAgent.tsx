"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const capabilities = [
  "Automatizan tareas repetitivas 24/7",
  "Atienden clientes con inteligencia",
  "Procesan documentos automáticamente",
  "Analizan datos en tiempo real",
  "Interactúan con múltiples sistemas",
  "Integran ERP, CRM, WhatsApp y APIs",
];

const techStack = [
  "OpenAI",
  "Claude",
  "Gemini",
  "Llama",
  "DeepSeek",
  "n8n",
  "LangChain",
  "MCP",
  "RAG",
  "Pinecone",
  "Qdrant",
];

const orbitNodes = [
  { angle: 0, radius: 110, size: 10, delay: 0, color: "#06B6D4" },
  { angle: 60, radius: 110, size: 8, delay: 0.4, color: "#0057D9" },
  { angle: 120, radius: 110, size: 12, delay: 0.8, color: "#8B5CF6" },
  { angle: 180, radius: 110, size: 7, delay: 1.2, color: "#06B6D4" },
  { angle: 240, radius: 110, size: 9, delay: 1.6, color: "#0057D9" },
  { angle: 300, radius: 110, size: 11, delay: 2.0, color: "#8B5CF6" },
];

const innerNodes = [
  { angle: 30, radius: 65, size: 6, delay: 0.2, color: "#06B6D4" },
  { angle: 90, radius: 65, size: 5, delay: 0.6, color: "#0057D9" },
  { angle: 150, radius: 65, size: 7, delay: 1.0, color: "#8B5CF6" },
  { angle: 210, radius: 65, size: 5, delay: 1.4, color: "#06B6D4" },
  { angle: 270, radius: 65, size: 6, delay: 1.8, color: "#0057D9" },
  { angle: 330, radius: 65, size: 5, delay: 2.2, color: "#8B5CF6" },
];

function NeuralVisualization() {
  return (
    <div className="relative flex items-center justify-center w-full aspect-square max-w-[400px] mx-auto">
      {/* Ambient glow */}
      <div className="absolute inset-0 rounded-full bg-[#0057D9]/5 blur-3xl" />
      <div className="absolute inset-8 rounded-full bg-[#06B6D4]/5 blur-2xl" />

      {/* Orbit rings */}
      <div className="absolute w-[220px] h-[220px] md:w-[260px] md:h-[260px] rounded-full border border-[#0057D9]/10" />
      <div className="absolute w-[130px] h-[130px] md:w-[150px] md:h-[150px] rounded-full border border-[#06B6D4]/10" />

      {/* Rotating outer group */}
      <motion.div
        className="absolute w-[220px] h-[220px] md:w-[260px] md:h-[260px]"
        style={{ willChange: "transform" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {orbitNodes.map((node, i) => {
          const rad = (node.angle * Math.PI) / 180;
          const x = Math.cos(rad) * node.radius;
          const y = Math.sin(rad) * node.radius;
          return (
            <motion.div
              key={`outer-${i}`}
              className="absolute rounded-full"
              style={{
                width: node.size,
                height: node.size,
                backgroundColor: node.color,
                left: `calc(50% + ${x}px - ${node.size / 2}px)`,
                top: `calc(50% + ${y}px - ${node.size / 2}px)`,
                boxShadow: `0 0 ${node.size * 2}px ${node.color}80`,
              }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: node.delay,
                ease: [0.77, 0, 0.175, 1],
              }}
            />
          );
        })}
      </motion.div>

      {/* Rotating inner group (opposite direction) */}
      <motion.div
        className="absolute w-[130px] h-[130px] md:w-[150px] md:h-[150px]"
        style={{ willChange: "transform" }}
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {innerNodes.map((node, i) => {
          const rad = (node.angle * Math.PI) / 180;
          const x = Math.cos(rad) * node.radius;
          const y = Math.sin(rad) * node.radius;
          return (
            <motion.div
              key={`inner-${i}`}
              className="absolute rounded-full"
              style={{
                width: node.size,
                height: node.size,
                backgroundColor: node.color,
                left: `calc(50% + ${x}px - ${node.size / 2}px)`,
                top: `calc(50% + ${y}px - ${node.size / 2}px)`,
                boxShadow: `0 0 ${node.size * 2}px ${node.color}80`,
              }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: node.delay,
                ease: [0.77, 0, 0.175, 1],
              }}
            />
          );
        })}
      </motion.div>

      {/* SVG connecting lines */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 400 400"
        fill="none"
      >
        {/* Outer connections */}
        {orbitNodes.map((node, i) => {
          const next = orbitNodes[(i + 1) % orbitNodes.length];
          const rad1 = (node.angle * Math.PI) / 180;
          const rad2 = (next.angle * Math.PI) / 180;
          const cx = 200;
          const cy = 200;
          return (
            <motion.line
              key={`line-outer-${i}`}
              x1={cx + Math.cos(rad1) * node.radius}
              y1={cy + Math.sin(rad1) * node.radius}
              x2={cx + Math.cos(rad2) * next.radius}
              y2={cy + Math.sin(rad2) * next.radius}
              stroke="#0057D9"
              strokeWidth="0.5"
              strokeOpacity="0.2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: i * 0.15 }}
            />
          );
        })}
        {/* Inner connections */}
        {innerNodes.map((node, i) => {
          const next = innerNodes[(i + 1) % innerNodes.length];
          const rad1 = (node.angle * Math.PI) / 180;
          const rad2 = (next.angle * Math.PI) / 180;
          const cx = 200;
          const cy = 200;
          return (
            <motion.line
              key={`line-inner-${i}`}
              x1={cx + Math.cos(rad1) * node.radius}
              y1={cy + Math.sin(rad1) * node.radius}
              x2={cx + Math.cos(rad2) * next.radius}
              y2={cy + Math.sin(rad2) * next.radius}
              stroke="#06B6D4"
              strokeWidth="0.5"
              strokeOpacity="0.2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: i * 0.15 + 0.5 }}
            />
          );
        })}
        {/* Cross connections (outer to inner) */}
        {orbitNodes.map((node, i) => {
          if (i % 2 !== 0) return null;
          const inner = innerNodes[i];
          const rad1 = (node.angle * Math.PI) / 180;
          const rad2 = (inner.angle * Math.PI) / 180;
          const cx = 200;
          const cy = 200;
          return (
            <motion.line
              key={`line-cross-${i}`}
              x1={cx + Math.cos(rad1) * node.radius}
              y1={cy + Math.sin(rad1) * node.radius}
              x2={cx + Math.cos(rad2) * inner.radius}
              y2={cy + Math.sin(rad2) * inner.radius}
              stroke="#8B5CF6"
              strokeWidth="0.5"
              strokeOpacity="0.15"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: i * 0.2 + 1 }}
            />
          );
        })}
      </svg>

      {/* Center core */}
      <div className="relative z-10 flex items-center justify-center">
        <motion.div
          className="absolute w-20 h-20 rounded-full bg-[#0057D9]/10 blur-xl"
          style={{ willChange: "transform, opacity" }}
          animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: [0.77, 0, 0.175, 1] }}
        />
        <motion.div
          className="absolute w-14 h-14 rounded-full bg-[#0057D9]/15 blur-md"
          style={{ willChange: "transform" }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: [0.77, 0, 0.175, 1] }}
        />
        <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-[#0057D9] to-[#06B6D4] flex items-center justify-center shadow-lg shadow-[#0057D9]/30">
          <span className="text-xs font-bold text-white tracking-wide">
            IA
          </span>
        </div>
      </div>

      {/* Label */}
      <motion.div
        className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: [0.77, 0, 0.175, 1] }}
      >
        <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#06B6D4]/70">
          IA Engine
        </span>
      </motion.div>
    </div>
  );
}

export default function AIAgent() {
  return (
    <section
      id="agentes-ia"
      className="relative py-24 md:py-32 bg-[#0F172A] overflow-hidden"
    >
      {/* Background gradient effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-[#0057D9]/5 blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-[#06B6D4]/5 blur-[100px]" />
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full bg-[#8B5CF6]/3 blur-[80px]" />

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Neural visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="order-2 lg:order-1"
          >
            <NeuralVisualization />
          </motion.div>

          {/* Right: Content */}
          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold tracking-wider uppercase rounded-full bg-[#06B6D4]/15 text-[#06B6D4] border border-[#06B6D4]/20 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] animate-pulse" />
                Inteligencia Artificial
              </span>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.1]">
                Agentes IA que{" "}
                <span className="bg-gradient-to-r from-[#0057D9] via-[#06B6D4] to-[#8B5CF6] bg-clip-text text-transparent">
                  transforman
                </span>{" "}
                tu negocio
              </h2>

              <p className="mt-6 text-lg text-slate-400 leading-relaxed max-w-xl">
                Desplegamos agentes de inteligencia artificial capaces de
                comprender, razonar y actuar de forma autónoma. Se integran con
                tus sistemas existentes para automatizar procesos complejos,
                atender clientes y liberar a tu equipo de tareas repetitivas.
              </p>
            </motion.div>

            {/* Capabilities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.6,
                delay: 0.2,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="mt-8 space-y-3"
            >
              {capabilities.map((capability, i) => (
                <motion.div
                  key={capability}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: 0.3 + i * 0.07,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                  className="flex items-center gap-3"
                >
                  <div className="flex items-center justify-center w-5 h-5 rounded-full bg-[#0057D9]/20 shrink-0">
                    <Check
                      className="w-3 h-3 text-[#06B6D4]"
                      strokeWidth={3}
                    />
                  </div>
                  <span className="text-sm md:text-base text-slate-300">
                    {capability}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Tech stack badges */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.5,
                delay: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="mt-10"
            >
              <p className="text-xs font-semibold tracking-widest uppercase text-slate-500 mb-3">
                Stack tecnológico
              </p>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-white/5 text-slate-400 border border-white/[0.06] transition-colors duration-200 hover:bg-[#0057D9]/10 hover:text-[#06B6D4] hover:border-[#06B6D4]/20 cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
