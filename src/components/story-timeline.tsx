"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion, useScroll, useSpring } from "motion/react";
import styles from "./personal-story.module.css";

export function StoryTimeline({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 70%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });

  return <div ref={ref} className={styles.timeline}>
    <span className={styles.track} aria-hidden="true">
      <motion.span className={styles.progress} style={{ scaleY: reducedMotion ? 1 : progress }} />
    </span>
    <ol className={styles.chapters} role="list">{children}</ol>
  </div>;
}

export function StoryChapter({ id, children }: { id: string; children: ReactNode }) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const reducedMotion = useReducedMotion();
  // Keep server-rendered content readable; motion only adds a small lift on entry.
  const waiting = reducedMotion === false && !inView;

  return <li ref={ref} className={styles.chapter} aria-labelledby={id}>
    <span className={styles.marker} aria-hidden="true" />
    <motion.div
      className={styles.chapterLayout}
      initial={false}
      animate={{ opacity: waiting ? 0.75 : 1, y: waiting ? 12 : 0 }}
      transition={{ duration: reducedMotion ? 0 : 0.45, ease: "easeOut" }}
    >{children}</motion.div>
  </li>;
}
