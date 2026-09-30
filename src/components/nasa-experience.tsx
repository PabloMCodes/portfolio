"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import styles from "@/app/home.module.css";

export function NasaExperience() {
  const articleRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const article = articleRef.current;
    if (!article) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const frame = window.requestAnimationFrame(() => {
        setIsVisible(true);
      });
      return () => window.cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(article);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={articleRef}
      className={`${styles.project} ${styles.nasaProject} ${isVisible ? styles.nasaVisible : ""}`}
    >
      <div className={styles.nasaLaunchPath} aria-hidden="true">
        <motion.span
          className={styles.launchRocket}
          initial={{ bottom: "0%", opacity: 0 }}
          animate={isVisible ? { bottom: ["0%", "12%", "112%"], opacity: [0, 1, 1, 0] } : undefined}
          transition={{
            bottom: { duration: 4, times: [0, 0.625, 1], ease: ["linear", [0.65, 0, 1, 1]] },
            opacity: { duration: 4, times: [0, 0.04, 0.94, 1] },
          }}
        >
          <svg viewBox="0 0 40 80" shapeRendering="crispEdges" fill="none">
            <g className={styles.rocketFlame}>
              <path fill="#e95a28" d="M10 54h20v8h-4v8h-4v8h-4v-8h-4v-8h-4Z" />
              <path fill="#ffb640" d="M14 54h12v8h-4v10h-4V62h-4Z" />
              <path fill="#fff1b5" d="M18 54h4v10h-4Z" />
            </g>
            <path fill="#17263c" d="M18 2h4v4h4v8h2v12h4v6h2v12h4v14H2V44h4V32h2v-6h4V14h2V6h4Z" />
            <path fill="#e8e5d9" d="M14 16h12v34H14ZM8 32h4v20H8Zm20 0h4v20h-4Z" />
            <path fill="#fff8e9" d="M14 16h6v32h-6Z" />
            <path fill="#c7cbd0" d="M24 16h2v34h-2ZM10 34h2v16h-2Zm20 0h2v18h-2Z" />
            <path fill="#d94e36" d="M18 6h4v4h2v6h-8v-6h2ZM6 46h6v8H4v-4h2Zm22 0h6v4h2v4h-8Z" />
            <path fill="#e87850" d="M18 10h2v6h-4v-4h2Z" />
            <path fill="#254b77" d="M14 20h12v8H14Z" />
            <path fill="#85c8e5" d="M16 22h6v4h-6Z" />
            <path fill="#fff8e9" d="M16 22h2v2h-2Z" />
            <path fill="#254b77" d="M18 32h2v10h-2Zm4 0h2v10h-2Zm-2 2h2v4h-2Z" />
            <path fill="#d94e36" d="M14 46h12v4H14Z" />
            <path fill="#667487" d="M14 52h12v4H14Z" />
          </svg>
        </motion.span>
      </div>
      <figure className={styles.nasaPhoto}>
        <div className={styles.nasaImageFrame}>
          <Image
            src="/images/nasa-group.png"
            alt="Pablo posing with three people in blue flight suits in front of a NASA backdrop."
            width={1936}
            height={1458}
            sizes="(max-width: 900px) 92vw, (max-width: 1440px) 46vw, 640px"
          />
          <span className={styles.scanStatus} aria-hidden="true">KSC / SUMMER 2026</span>
        </div>
        <figcaption>A moment beyond the code / NASA</figcaption>
      </figure>
      <div className={styles.projectCopy}>
        <p className={styles.label}>Summer 2026</p>
        <h3>NASA Kennedy Space Center</h3>
        <p className={styles.role}>Software Engineering Intern</p>
        <p>
          Built an internal full-stack platform supporting payload and science
          experiment processing analysis during my summer 2026 internship.
        </p>
        <ul className={styles.detailList}>
          <li>Designed REST APIs and asynchronous jobs with persistent state, progress tracking, and error handling.</li>
          <li>Connected an AI-assisted workflow to structured inputs, persisted results, and frontend status updates.</li>
          <li>Built for fully local operation while keeping a path open to hosted deployment and role-based access.</li>
          <li>Nominated for NASA’s Shining Star recognition.</li>
        </ul>
        <ul className={styles.tags} aria-label="NASA technologies">
          <li>Python / FastAPI</li><li>React</li><li>Background workers</li>
        </ul>
      </div>
    </article>
  );
}
