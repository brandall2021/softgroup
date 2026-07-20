"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Globe,
  Monitor,
  Brain,
  Workflow,
  Server,
  Shield,
  type LucideIcon,
} from "lucide-react";

interface ServiceSubcategory {
  label: string;
}

interface ServiceCard {
  title: string;
  icon: LucideIcon;
  subcategories: ServiceSubcategory[];
  featured?: boolean;
}

const services: ServiceCard[] = [
  {
    title: "Desarrollo Web",
    icon: Globe,
    subcategories: [
      { label: "Landing Pages" },
      { label: "Sitios corporativos" },
      { label: "E-commerce" },
      { label: "Portales institucionales" },
      { label: "Aplicaciones web" },
    ],
  },
  {
    title: "Sistemas Informáticos",
    icon: Monitor,
    subcategories: [
      { label: "ERP" },
      { label: "CRM" },
      { label: "Sistemas académicos" },
      { label: "Sistemas médicos" },
      { label: "Gestión documental" },
      { label: "Paneles administrativos" },
    ],
  },
  {
    title: "Inteligencia Artificial",
    icon: Brain,
    featured: true,
    subcategories: [
      { label: "Agentes IA" },
      { label: "Chatbots" },
      { label: "RAG" },
      { label: "Automatización" },
      { label: "LLMs" },
      { label: "Asistentes inteligentes" },
    ],
  },
  {
    title: "Automatización",
    icon: Workflow,
    subcategories: [
      { label: "n8n" },
      { label: "Workflows" },
      { label: "Integración de sistemas" },
      { label: "Webhooks" },
      { label: "APIs" },
      { label: "OCR" },
    ],
  },
  {
    title: "Networking e Infraestructura",
    icon: Server,
    subcategories: [
      { label: "Cableado estructurado" },
      { label: "Mikrotik" },
      { label: "Cisco" },
      { label: "VPN" },
      { label: "Firewall" },
      { label: "WiFi Empresarial" },
    ],
  },
  {
    title: "Cloud & Ciberseguridad",
    icon: Shield,
    subcategories: [
      { label: "AWS" },
      { label: "Azure" },
      { label: "Google Cloud" },
      { label: "Docker" },
      { label: "Kubernetes" },
      { label: "Auditorías de seguridad" },
    ],
  },
];

const customEasing: [number, number, number, number] = [0.23, 1, 0.32, 1];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: customEasing,
    },
  },
};

export default function Services() {
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="servicios"
      className="relative py-24 md:py-32 bg-white grid-pattern"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: customEasing }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="inline-flex items-center rounded-full bg-[#0057D9]/8 px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-[#0057D9] mb-5 border border-[#0057D9]/10">
            Nuestros Servicios
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#0F172A]">
            Soluciones que impulsan tu negocio
          </h2>
          <p className="mt-5 text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Desarrollo web, inteligencia artificial, automatización y más — todo
            lo que necesitas bajo un mismo techo
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                variants={cardVariants}
                whileHover={
                  prefersReduced
                    ? undefined
                    : { scale: 1.015, y: -2 }
                }
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className={`group relative rounded-[1.5rem] p-[1px] bg-gradient-to-br from-slate-200/50 to-slate-100/30 cursor-default active:scale-[0.98] transition-shadow duration-300 ${
                  service.featured ? "lg:col-span-2" : ""
                }`}
              >
                <div
                  className={`rounded-[calc(1.5rem-1px)] bg-white p-7 h-full transition-shadow duration-300 ${
                    service.featured ? "md:p-9" : ""
                  } group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_4px_20px_-4px_rgba(0,87,217,0.1)]`}
                >
                  <div
                    className={`flex items-center gap-4 mb-5 ${
                      service.featured ? "mb-7" : ""
                    }`}
                  >
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#0057D9]/10 transition-colors duration-300 group-hover:bg-[#0057D9]/15">
                      <Icon
                        className="w-6 h-6 text-[#0057D9]"
                        strokeWidth={1.5}
                      />
                    </div>
                    <h3
                      className={`font-bold text-[#0F172A] tracking-tight ${
                        service.featured
                          ? "text-xl md:text-2xl"
                          : "text-lg"
                      }`}
                    >
                      {service.title}
                    </h3>
                  </div>

                  {service.featured && (
                    <p className="text-sm text-slate-400 mb-5 -mt-2 leading-relaxed">
                      Potenciamos tus procesos con soluciones de IA a medida —
                      desde agentes autónomos hasta integración con LLMs
                    </p>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {service.subcategories.map((sub) => (
                      <span
                        key={sub.label}
                        className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-600 transition-all duration-200 group-hover:bg-[#0057D9]/5 group-hover:text-[#0057D9] group-hover:brightness-110"
                      >
                        {sub.label}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
