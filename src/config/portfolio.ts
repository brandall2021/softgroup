import {
  Globe,
  Server,
  Brain,
  Network,
  Zap,
  type LucideIcon,
} from "lucide-react";

export type Category =
  | "Todos"
  | "Web"
  | "Sistemas"
  | "IA"
  | "Networking"
  | "Automatización";

export interface Project {
  id: number;
  title: string;
  category: Category;
  description: string;
  tech: string[];
  gradient: string;
  icon: LucideIcon;
  iconClassName?: string;
}

export const categories: Category[] = [
  "Todos",
  "Web",
  "Sistemas",
  "IA",
  "Networking",
  "Automatización",
];

export const projects: Project[] = [
  {
    id: 1,
    title: "Sistema ERP Integral",
    category: "Web",
    description:
      "Plataforma ERP completa para gestión empresarial con módulos de inventario, contabilidad y RRHH",
    tech: ["React", "Node.js", "PostgreSQL", "Docker"],
    gradient: "from-brand to-cyan",
    icon: Server,
    iconClassName: "w-8 h-8 text-white",
  },
  {
    id: 2,
    title: "Chatbot IA Atención al Cliente",
    category: "IA",
    description:
      "Agente IA conversacional con RAG para atención al cliente 24/7 integrado con WhatsApp",
    tech: ["OpenAI", "LangChain", "Pinecone", "n8n"],
    gradient: "from-cyan to-violet",
    icon: Brain,
    iconClassName: "w-8 h-8 text-white",
  },
  {
    id: 3,
    title: "Red Corporativa Segura",
    category: "Networking",
    description:
      "Diseño e implementación de infraestructura de red con Mikrotik, VPN y monitoreo Zabbix",
    tech: ["Mikrotik", "Zabbix", "Proxmox", "Linux"],
    gradient: "from-emerald-500 to-teal-400",
    icon: Network,
    iconClassName: "w-8 h-8 text-white",
  },
  {
    id: 4,
    title: "Portal E-commerce",
    category: "Web",
    description:
      "Tienda en línea con pasarela de pago, gestión de inventario y panel administrativo",
    tech: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
    gradient: "from-violet to-brand",
    icon: Globe,
    iconClassName: "w-8 h-8 text-white",
  },
  {
    id: 5,
    title: "Automatización de Procesos",
    category: "Automatización",
    description:
      "Workflow automatizado con n8n integrando CRM, email, WhatsApp y sistema contable",
    tech: ["n8n", "Webhooks", "API REST", "OCR"],
    gradient: "from-amber-500 to-orange-400",
    icon: Zap,
    iconClassName: "w-8 h-8 text-white",
  },
  {
    id: 6,
    title: "Cloud Migration",
    category: "Sistemas",
    description:
      "Migración de infraestructura on-premise a AWS con Docker y Kubernetes",
    tech: ["AWS", "Docker", "Kubernetes", "Traefik"],
    gradient: "from-brand to-violet",
    icon: Server,
    iconClassName: "w-8 h-8 text-white",
  },
];
