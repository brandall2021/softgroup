import { Mail, Phone, MapPin, Clock, type LucideIcon } from "lucide-react";

export interface ContactInfoItem {
  icon: LucideIcon;
  label: string;
  value: string;
  href: string | null;
}

export const contactInfo: ContactInfoItem[] = [
  {
    icon: Mail,
    label: "Email",
    value: "info@softgroup.com",
    href: "mailto:info@softgroup.com",
  },
  {
    icon: Phone,
    label: "Teléfono",
    value: "+51 999 888 777",
    href: "tel:+51999888777",
  },
  {
    icon: MapPin,
    label: "Dirección",
    value: "Lima, Perú",
    href: null,
  },
  {
    icon: Clock,
    label: "Horario",
    value: "Lun - Vie, 9:00 AM - 6:00 PM",
    href: null,
  },
];

export const services = [
  "Desarrollo Web",
  "Sistemas Informáticos",
  "Inteligencia Artificial",
  "Automatización",
  "Networking",
  "Cloud & Seguridad",
  "Consultoría",
];
