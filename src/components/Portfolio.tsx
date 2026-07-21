"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { categories, projects, type Category } from "../config/portfolio";

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState<Category>("Todos");

  const filteredProjects =
    activeFilter === "Todos"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="portfolio" className="py-24 md:py-32 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-semibold tracking-widest uppercase text-brand mb-4">
            Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6">
            Nuestro Portfolio
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Proyectos que transforman negocios
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              aria-pressed={activeFilter === cat}
              aria-label={`Filtrar por ${cat}`}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                activeFilter === cat
                  ? "bg-brand text-white shadow-lg shadow-brand/25"
                  : "bg-white text-slate-600 safe-hover:bg-brand/10 safe-hover:text-brand border border-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm safe-hover:shadow-xl transition-all duration-200 safe-hover:-translate-y-1 border border-slate-100"
              >
                <div
                  className={`relative h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.15),transparent)]" />
                  <div className="relative z-10 w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <project.icon className={project.iconClassName ?? "w-8 h-8 text-white"} />
                  </div>
                  <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-sm text-white">
                    {project.category}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-navy mb-3 group-safe-hover:text-brand transition-all duration-200">
                    {project.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-5">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <a
                    href="#"
                    aria-label={`Ver proyecto: ${project.title}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-brand safe-hover:text-brand-dark transition-all duration-200"
                  >
                    Ver proyecto
                    <ArrowRight className="w-4 h-4 group-safe-hover:translate-x-1 transition-transform duration-200" />
                  </a>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
