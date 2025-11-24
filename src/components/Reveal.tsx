"use client";
import { motion, useReducedMotion, cubicBezier } from "framer-motion";
import React from "react";
import type { JSX } from "react";


type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;      // seconds
  y?: number;          // px translate on enter
  once?: boolean;      // only animate first time
  as?: keyof JSX.IntrinsicElements; // optional tag
};

export default function Reveal({
  children,
  className,
  delay = 0,
  y = 16,
  once = true,
  as: Tag = "div",
}: Props) {
  const prefersReduced = useReducedMotion();
  const variants = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : y },
    show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: cubicBezier(0.22, 1, 0.36, 1), delay } },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-10% 0px -10% 0px" }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
