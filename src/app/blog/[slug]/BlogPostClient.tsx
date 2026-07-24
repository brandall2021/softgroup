"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import Link from "next/link";
import type { Article } from "@/config/blog";

interface Props {
  article: Article;
}

export default function BlogPostClient({ article }: Props) {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] as const },
    },
  };

  return (
    <article className="min-h-screen bg-surface-dark">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${article.gradient} opacity-10`} />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 pt-24 pb-16 sm:pt-32 sm:pb-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            <Link
              href="/#blog"
              className="inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver al blog
            </Link>

            <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${article.categoryColor}`}>
              {article.category}
            </span>

            <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
              {article.title}
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-400">
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4" />
                {article.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {article.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {article.readingTime}
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-16"
      >
        <div className="prose prose-lg prose-invert prose-headings:text-white prose-p:text-slate-300 prose-li:text-slate-300 prose-strong:text-white prose-a:text-brand hover:prose-a:text-brand-light">
          {article.content.split("\n").map((line, i) => {
            if (line.startsWith("## ")) {
              return (
                <h2 key={i} className="mt-12 mb-4 text-2xl font-bold">
                  {line.replace("## ", "")}
                </h2>
              );
            }
            if (line.startsWith("### ")) {
              return (
                <h3 key={i} className="mt-8 mb-3 text-xl font-semibold">
                  {line.replace("### ", "")}
                </h3>
              );
            }
            if (line.startsWith("- ")) {
              return (
                <li key={i} className="ml-4">
                  {line.replace("- ", "")}
                </li>
              );
            }
            if (line.match(/^\d+\./)) {
              return (
                <li key={i} className="ml-4">
                  {line.replace(/^\d+\.\s*/, "")}
                </li>
              );
            }
            if (line.trim() === "") {
              return <br key={i} />;
            }
            return <p key={i}>{line}</p>;
          })}
        </div>
      </motion.div>

      {/* CTA */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 pb-16 sm:pb-20">
        <div className="glass-card-dark rounded-2xl p-8 text-center">
          <h3 className="text-xl font-semibold text-white">
            ¿Necesitas implementar estas soluciones en tu empresa?
          </h3>
          <p className="mt-2 text-slate-400">
            Contacta con nuestro equipo para una consultoría personalizada.
          </p>
          <a
            href="/#contacto"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-brand-dark hover:shadow-lg hover:shadow-brand/25"
          >
            Contactar ahora
          </a>
        </div>
      </div>
    </article>
  );
}
