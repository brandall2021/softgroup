"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";

interface BlogPost {
  title: string;
  category: string;
  categoryColor: string;
  date: string;
  excerpt: string;
  gradient: string;
}

const posts: BlogPost[] = [
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

export default function Blog() {
  return (
    <section id="blog" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand"
          >
            Blog
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-bold tracking-tight text-navy sm:text-4xl lg:text-5xl"
          >
            Últimas noticias e{" "}
            <span className="gradient-text">innovación</span>
          </motion.h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60"
            >
              <div
                className={`relative h-48 bg-gradient-to-br ${post.gradient}`}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.15),transparent)]" />
              </div>

              <div className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${post.categoryColor}`}
                  >
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-slate-400">
                    <Calendar className="h-3 w-3" />
                    {post.date}
                  </span>
                </div>

                <h3 className="mb-3 text-lg font-bold leading-snug text-navy transition-colors group-hover:text-brand">
                  {post.title}
                </h3>
                <p className="mb-5 text-sm leading-relaxed text-slate-500">
                  {post.excerpt}
                </p>

                <a
                  href="#"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition-colors hover:text-brand-dark"
                >
                  Leer más
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-14 text-center">
          <motion.a
            href="#"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-8 py-3 text-sm font-semibold text-navy transition-all duration-200 hover:border-brand hover:bg-brand hover:text-white hover:shadow-lg hover:shadow-brand/20"
          >
            Ver todos los artículos
            <ArrowRight className="h-4 w-4" />
          </motion.a>
        </div>
      </div>
    </section>
  );
}
