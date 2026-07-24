"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";
import { articles } from "../config/blog";

export default function Blog() {
  const prefersReduced = useReducedMotion();

  return (
    <section id="blog" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <motion.p
            initial={{ opacity: 0, y: prefersReduced ? 0 : 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand"
          >
            Blog
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: prefersReduced ? 0 : 0.1 }}
            className="text-3xl font-bold tracking-tight text-navy sm:text-4xl lg:text-5xl"
          >
            Últimas noticias e{" "}
            <span className="gradient-text">innovación</span>
          </motion.h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.slice(0, 3).map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: prefersReduced ? 0 : 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: prefersReduced ? 0 : i * 0.12 }}
              className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-200 safe-hover:-translate-y-1 safe-hover:shadow-xl safe-hover:shadow-slate-200/60"
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

                <h3 className="mb-3 text-lg font-bold leading-snug text-navy transition-all duration-200 group-safe-hover:text-brand">
                  {post.title}
                </h3>
                <p className="mb-5 text-sm leading-relaxed text-slate-500">
                  {post.excerpt}
                </p>

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition-all duration-200 safe-hover:text-brand-dark"
                >
                  Leer más
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-safe-hover:translate-x-0.5" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
