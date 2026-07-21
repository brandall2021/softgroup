import type { LucideIcon } from "lucide-react";

export interface ProjectType {
  id: string;
  label: string;
  icon: LucideIcon;
  min: number;
  max: number;
}

export interface Feature {
  id: string;
  label: string;
  price: number;
}
