"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "@/app/home.module.css";

const stages = [
  { name: "Input", detail: "Structured analysis inputs enter the workflow." },
  { name: "API", detail: "FastAPI validates requests and creates persistent jobs." },
  { name: "Worker", detail: "Background execution handles long-running analysis and progress." },
  { name: "Result", detail: "Persisted results and status updates return to the React interface." },
];

export function NasaExperience() {
  const articleRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    const article = articleRef.current;
    if (!article) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const frame = window.requestAnimationFrame(() => {
        setIsVisible(true);
        setActiveStage(stages.length - 1);
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

  useEffect(() => {
    if (!isVisible || activeStage >= stages.length - 1) return;
    const timer = window.setTimeout(() => setActiveStage((stage) => stage + 1), 650);
    return () => window.clearTimeout(timer);
  }, [activeStage, isVisible]);

  return (
    <article
      ref={articleRef}
      className={`${styles.project} ${styles.nasaProject} ${isVisible ? styles.nasaVisible : ""}`}
    >
      <figure className={styles.nasaPhoto}>
        <div className={styles.nasaImageFrame}>
          <Image
            src="/images/nasa-group.png"
            alt="Pablo posing with three people in blue flight suits in front of a NASA backdrop."
            width={1936}
            height={1458}
            sizes="(max-width: 900px) 92vw, (max-width: 1440px) 46vw, 640px"
          />
          <span className={styles.scanStatus} aria-hidden="true">IMAGE LINK / KSC</span>
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
      <div className={styles.nasaPipeline}>
        <div className={styles.pipelineHeading}>
          <span className={styles.label}>Operations analysis orbit</span>
          <span aria-live="polite">0{activeStage + 1} / 0{stages.length}</span>
        </div>
        <div className={styles.orbitSystem} data-active={activeStage}>
          <div className={styles.orbitRing} aria-hidden="true" />
          <div className={styles.orbitCore} aria-hidden="true">
            <span>KSC</span>
            <small>Analysis system</small>
          </div>
          <div className={styles.orbitCraft} aria-hidden="true">
            <svg viewBox="0 0 34 34">
              <path d="M17 3c4 3 6 8 6 14l-3 5h-6l-3-5c0-6 2-11 6-14Z" />
              <path d="m11 15-5 5v5l7-3m10-7 5 5v5l-7-3M15 25l2 6 2-6" />
              <circle cx="17" cy="12" r="2.5" />
            </svg>
          </div>
          <ol className={styles.orbitNodes}>
            {stages.map((stage, index) => (
              <li key={stage.name}>
                <button
                  type="button"
                  className={index === activeStage ? styles.orbitNodeActive : ""}
                  aria-pressed={index === activeStage}
                  onClick={() => setActiveStage(index)}
                >
                  <span>0{index + 1}</span>
                  {stage.name}
                </button>
              </li>
            ))}
          </ol>
        </div>
        <p className={styles.pipelineDetail}>{stages[activeStage].detail}</p>
      </div>
    </article>
  );
}
