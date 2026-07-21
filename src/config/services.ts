import {
  Globe,
  Monitor,
  Brain,
  Workflow,
  Server,
  Shield,
  type LucideIcon,
} from "lucide-react";

export interface ServiceSubcategory {
  label: string;
}

export interface ServiceCard {
  title: string;
  icon: LucideIcon;
  subcategories: ServiceSubcategory[];
  featured?: boolean;
}

export const services: ServiceCard[] = [
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
