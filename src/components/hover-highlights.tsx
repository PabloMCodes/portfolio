"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import styles from "@/app/home.module.css";

export function NavigationLink({ href, current, children }: {
  href: string;
  current: boolean;
  children: ReactNode;
}) {
  const reducedMotion = useReducedMotion();

  return <motion.a
    href={href}
    aria-current={current ? "page" : undefined}
    initial="rest"
    animate="rest"
    whileHover="highlight"
    whileFocus="highlight"
    variants={{ rest: { y: 0 }, highlight: { y: reducedMotion ? 0 : -2 } }}
    transition={{ duration: reducedMotion ? 0 : 0.2 }}
  >
    <motion.span
      aria-hidden="true"
      className={styles.navigationHighlight}
      variants={{ rest: { opacity: 0 }, highlight: { opacity: 1 } }}
      transition={{ duration: reducedMotion ? 0 : 0.2 }}
    />
    {children}
  </motion.a>;
}

export function ProjectCard({ className, children }: { className: string; children: ReactNode }) {
  const reducedMotion = useReducedMotion();

  return <motion.article
    className={className}
    initial={false}
    whileHover={{ y: reducedMotion ? 0 : -5, boxShadow: "0 12px 28px rgba(0, 0, 0, 0.12)" }}
    transition={{ duration: reducedMotion ? 0 : 0.22, ease: "easeOut" }}
  >{children}</motion.article>;
}
