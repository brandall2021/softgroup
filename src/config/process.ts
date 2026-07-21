import {
  MessageSquare,
  Search,
  Palette,
  Code,
  Rocket,
  Headphones,
  type LucideIcon,
} from "lucide-react";

export interface Step {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
  iconClassName?: string;
}

export const steps: Step[] = [
  {
    number: "01",
    title: "Reunión",
    description: "Entendemos tus necesidades y objetivos",
    icon: MessageSquare,
    iconClassName: "w-6 h-6",
  },
  {
    number: "02",
    title: "Análisis",
    description: "Evaluamos los requerimientos técnicos",
    icon: Search,
    iconClassName: "w-6 h-6",
  },
  {
    number: "03",
    title: "Diseño",
    description: "Creamos la arquitectura y diseño",
    icon: Palette,
    iconClassName: "w-6 h-6",
  },
  {
    number: "04",
    title: "Desarrollo",
    description: "Construimos la solución paso a paso",
    icon: Code,
    iconClassName: "w-6 h-6",
  },
  {
    number: "05",
    title: "Implementación",
    description: "Desplegamos y configuramos",
    icon: Rocket,
    iconClassName: "w-6 h-6",
  },
  {
    number: "06",
    title: "Soporte",
    description: "Acompañamiento continuo",
    icon: Headphones,
    iconClassName: "w-6 h-6",
  },
];
