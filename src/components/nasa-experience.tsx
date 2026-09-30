"use client";

import Image from "next/image";
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
        <span className={styles.launchRocket}>
          <svg viewBox="0 0 34 34">
            <path d="M17 3c4 3 6 8 6 14l-3 5h-6l-3-5c0-6 2-11 6-14Z" />
            <path d="m11 15-5 5v5l7-3m10-7 5 5v5l-7-3M15 25l2 6 2-6" />
            <circle cx="17" cy="12" r="2.5" />
          </svg>
        </span>
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
