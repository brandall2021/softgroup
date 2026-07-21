import {
  FolderCheck,
  Users,
  Calendar,
  Clock,
  Brain,
  type LucideIcon,
} from "lucide-react";

export interface Stat {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  icon: LucideIcon;
  iconClassName?: string;
}

export const stats: Stat[] = [
  {
    value: 150,
    prefix: "+",
    label: "Proyectos Entregados",
    icon: FolderCheck,
    iconClassName: "w-7 h-7",
  },
  {
    value: 50,
    prefix: "+",
    label: "Clientes Satisfechos",
    icon: Users,
    iconClassName: "w-7 h-7",
  },
  {
    value: 5,
    prefix: "+",
    label: "Años de Experiencia",
    icon: Calendar,
    iconClassName: "w-7 h-7",
  },
  {
    value: 10000,
    prefix: "+",
    label: "Horas de Desarrollo",
    icon: Clock,
    iconClassName: "w-7 h-7",
  },
  {
    value: 30,
    prefix: "+",
    label: "Agentes IA Implementados",
    icon: Brain,
    iconClassName: "w-7 h-7",
  },
];
