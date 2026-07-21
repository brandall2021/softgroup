export interface Testimonial {
  text: string;
  name: string;
  role: string;
  company: string;
  initials: string;
}

export const testimonials: Testimonial[] = [
  {
    text: "SoftGroup transformó completamente nuestra operación. El sistema ERP que desarrollaron nos permitió reducir costos un 40%.",
    name: "María García",
    role: "Directora de Operaciones",
    company: "TechCorp",
    initials: "MG",
  },
  {
    text: "El agente de IA que implementaron para atención al cliente ha reducido nuestra carga de trabajo un 60%.",
    name: "Carlos Mendoza",
    role: "CEO",
    company: "InnovaSoft",
    initials: "CM",
  },
  {
    text: "Su expertise en redes y ciberseguridad nos dio la confianza para migrar toda nuestra infraestructura a la nube.",
    name: "Ana López",
    role: "CTO",
    company: "DataSecure",
    initials: "AL",
  },
  {
    text: "La automatización de procesos con n8n nos ahorró más de 200 horas mensuales.",
    name: "Roberto Sánchez",
    role: "Gerente de TI",
    company: "GrupoMax",
    initials: "RS",
  },
  {
    text: "Profesionales excepcionales. Entregaron el proyecto antes del plazo y con una calidad impresionante.",
    name: "Laura Martínez",
    role: "Fundadora",
    company: "StartupHub",
    initials: "LM",
  },
];
