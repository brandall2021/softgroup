"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Server,
  Brain,
  Network,
  Zap,
  ArrowRight,
} from "lucide-react";

type Category = "Todos" | "Web" | "Sistemas" | "IA" | "Networking" | "Automatización";

interface Project {
  id: number;
  title: string;
  category: Category;
  description: string;
  tech: string[];
  gradient: string;
  icon: React.ReactNode;
}

const categories: Category[] = [
  "Todos",
  "Web",
  "Sistemas",
  "IA",
  "Networking",
  "Automatización",
];

const projects: Project[] = [
  {
    id: 1,
    title: "Sistema ERP Integral",
    category: "Web",
    description:
      "Plataforma ERP completa para gestión empresarial con módulos de inventario, contabilidad y RRHH",
    tech: ["React", "Node.js", "PostgreSQL", "Docker"],
    gradient: "from-brand to-cyan",
    icon: <Server className="w-8 h-8 text-white" />,
  },
  {
    id: 2,
    title: "Chatbot IA Atención al Cliente",
    category: "IA",
    description:
      "Agente IA conversacional con RAG para atención al cliente 24/7 integrado con WhatsApp",
    tech: ["OpenAI", "LangChain", "Pinecone", "n8n"],
    gradient: "from-cyan to-violet",
    icon: <Brain className="w-8 h-8 text-white" />,
  },
  {
    id: 3,
    title: "Red Corporativa Segura",
    category: "Networking",
    description:
      "Diseño e implementación de infraestructura de red con Mikrotik, VPN y monitoreo Zabbix",
    tech: ["Mikrotik", "Zabbix", "Proxmox", "Linux"],
    gradient: "from-emerald-500 to-teal-400",
    icon: <Network className="w-8 h-8 text-white" />,
  },
  {
    id: 4,
    title: "Portal E-commerce",
    category: "Web",
    description:
      "Tienda en línea con pasarela de pago, gestión de inventario y panel administrativo",
    tech: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
    gradient: "from-violet to-brand",
    icon: <Globe className="w-8 h-8 text-white" />,
  },
  {
    id: 5,
    title: "Automatización de Procesos",
    category: "Automatización",
    description:
      "Workflow automatizado con n8n integrando CRM, email, WhatsApp y sistema contable",
    tech: ["n8n", "Webhooks", "API REST", "OCR"],
    gradient: "from-amber-500 to-orange-400",
    icon: <Zap className="w-8 h-8 text-white" />,
  },
  {
    id: 6,
    title: "Cloud Migration",
    category: "Sistemas",
    description:
      "Migración de infraestructura on-premise a AWS con Docker y Kubernetes",
    tech: ["AWS", "Docker", "Kubernetes", "Traefik"],
    gradient: "from-brand to-violet",
    icon: <Server className="w-8 h-8 text-white" />,
  },
];

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState<Category>("Todos");

  const filteredProjects =
    activeFilter === "Todos"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="portfolio" className="py-24 md:py-32 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-semibold tracking-widest uppercase text-brand mb-4">
            Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6">
            Nuestro Portfolio
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Proyectos que transforman negocios
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === cat
                  ? "bg-brand text-white shadow-lg shadow-brand/25"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-slate-100"
              >
                <div
                  className={`relative h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.15),transparent)]" />
                  <div className="relative z-10 w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    {project.icon}
                  </div>
                  <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-sm text-white">
                    {project.category}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-navy mb-3 group-hover:text-brand transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-5">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <a
                    href="#"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-brand-dark transition-colors"
                  >
                    Ver proyecto
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
