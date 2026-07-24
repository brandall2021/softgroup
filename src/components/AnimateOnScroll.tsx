"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { type ReactNode } from "react";

type AnimationType = "fadeUp" | "fadeDown" | "fadeLeft" | "fadeRight" | "zoomIn" | "zoomOut" | "flipUp";

interface AnimateOnScrollProps {
  children: ReactNode;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  margin?: string;
}

const animationVariants: Record<AnimationType, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  fadeDown: {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0 },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
  zoomIn: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  },
  zoomOut: {
    hidden: { opacity: 0, scale: 1.1 },
    visible: { opacity: 1, scale: 1 },
  },
  flipUp: {
    hidden: { opacity: 0, rotateX: -15, y: 30 },
    visible: { opacity: 1, rotateX: 0, y: 0 },
  },
};

export default function AnimateOnScroll({
  children,
  animation = "fadeUp",
  delay = 0,
  duration = 0.6,
  className = "",
  once = true,
  margin = "-80px",
}: AnimateOnScrollProps) {
  const prefersReduced = useReducedMotion();

  const variants = animationVariants[animation];

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin }}
      transition={{
        duration: prefersReduced ? 0.1 : duration,
        delay: prefersReduced ? 0 : delay,
        ease: [0.23, 1, 0.32, 1],
      }}
      className={className}
      style={{ perspective: animation === "flipUp" ? 1000 : undefined }}
    >
      {children}
    </motion.div>
  );
}
