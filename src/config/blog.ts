export interface Article {
  title: string;
  category: string;
  categoryColor: string;
  date: string;
  excerpt: string;
  gradient: string;
}

export const articles: Article[] = [
  {
    title: "Cómo los Agentes IA están revolucionando la atención al cliente",
    category: "Inteligencia Artificial",
    categoryColor: "bg-violet/10 text-violet",
    date: "15 Jul 2026",
    excerpt:
      "Descubre cómo los agentes inteligentes están transformando la forma en que las empresas interactúan con sus clientes.",
    gradient: "from-brand via-brand-light to-cyan",
  },
  {
    title: "Guía completa de ciberseguridad empresarial en 2026",
    category: "Ciberseguridad",
    categoryColor: "bg-cyan/10 text-cyan",
    date: "10 Jul 2026",
    excerpt:
      "Las amenazas evolucionan constantemente. Conoce las mejores prácticas para proteger tu empresa.",
    gradient: "from-cyan via-brand to-violet",
  },
  {
    title: "Cloud Computing: Migración exitosa paso a paso",
    category: "Cloud",
    categoryColor: "bg-brand/10 text-brand",
    date: "5 Jul 2026",
    excerpt:
      "Planifica y ejecuta la migración de tu infraestructura a la nube con esta guía práctica.",
    gradient: "from-violet via-brand to-cyan",
  },
];
