export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

export interface FooterLinkGroup {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Agentes IA", href: "#agentes-ia" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Blog", href: "#blog" },
  { label: "Contacto", href: "#contacto" },
];

export const footerLinks = {
  services: [
    "Desarrollo Web",
    "Desarrollo Móvil",
    "Agentes de IA",
    "Ciberseguridad",
    "Cloud Computing",
    "Redes e Infraestructura",
    "Consultoría Tecnológica",
    "Automatización",
  ],
  company: [
    { label: "Nosotros", href: "#nosotros" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Blog", href: "#blog" },
    { label: "Contacto", href: "#contacto" },
    { label: "Carreras", href: "#carreras" },
  ] as FooterLinkGroup[],
};

export const socialLinks: SocialLink[] = [
  { label: "LinkedIn", href: "https://linkedin.com/company/softgroup" },
  { label: "Instagram", href: "https://instagram.com/softgroup" },
  { label: "GitHub", href: "https://github.com/softgroup" },
  { label: "Facebook", href: "https://facebook.com/softgroup" },
];
