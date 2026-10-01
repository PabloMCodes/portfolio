"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import styles from "@/app/home.module.css";

export function CreditKarmaExperience() {
  const articleRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const article = articleRef.current;
    if (!article) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const frame = window.requestAnimationFrame(() => setIsVisible(true));
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

  return <article
    ref={articleRef}
    className={`${styles.project} ${styles.productionProject} ${styles.creditProject} ${isVisible ? styles.creditVisible : ""}`}
  >
    <div className={styles.creditScanPath} aria-hidden="true">
      <motion.span
        className={styles.creditIdentityCard}
        initial={{ left: "2%", opacity: 0 }}
        animate={isVisible ? { left: ["2%", "58%", "98%"], opacity: [0, 1, 1, 0] } : undefined}
        transition={{
          left: { duration: 3.6, times: [0, 0.72, 1], ease: ["easeInOut", [0.55, 0, 1, 1]] },
          opacity: { duration: 3.6, times: [0, 0.06, 0.92, 1] },
        }}
      >
        <svg viewBox="0 0 64 42" shapeRendering="crispEdges">
          <path fill="#15263a" d="M0 4h4V0h52v4h4v4h4v26h-4v4h-4v4H4v-4H0Z" />
          <path fill="#daf2df" d="M4 8h56v26H4Z" />
          <path fill="#30a566" d="M8 12h16v16H8Z" />
          <path fill="#f5eee2" d="M13 15h6v6h-6Zm-2 7h10v4H11Z" />
          <path fill="#557466" d="M29 13h19v3H29Zm0 7h14v3H29Zm0 7h9v3h-9Z" />
          <g className={styles.creditCheck}>
            <path fill="#f1a44e" d="M44 23h4v4h-4Zm4 4h4v4h-4Zm4-8h4v8h-4Z" />
          </g>
        </svg>
      </motion.span>
    </div>
    <figure className={styles.creditPhoto}>
      <div className={styles.creditImageFrame}>
        <Image src="/images/credit-karma-team.png" alt="Pablo with the Credit Karma internship cohort in front of a colorful Credit Karma mural." width={1628} height={1098} sizes="(max-width: 900px) 92vw, (max-width: 1440px) 46vw, 640px" />
        <span className={styles.verifyStatus} aria-hidden="true">IDENTITY / VERIFIED</span>
      </div>
      <figcaption>Summer with the team / Credit Karma</figcaption>
    </figure>
    <div className={styles.projectCopy}>
      <p className={styles.label}>Summer 2025</p><h3>Credit Karma / Intuit</h3><p className={styles.role}>Software Engineering Intern · User Management</p>
      <p>Software engineering experience on the User Management team, spanning frontend development, service infrastructure, and testing.</p>
      <ul className={styles.detailList}><li>Shipped security-settings upgrades for a platform serving more than 120 million users.</li><li>Migrated authentication functionality from a legacy monorepo into Scala microservices.</li><li>Added schema validation, unit and integration coverage, and monitored staged Kubernetes rollouts.</li></ul>
      <ul className={styles.tags} aria-label="Credit Karma technologies"><li>React / TypeScript</li><li>Vite</li><li>GraphQL</li><li>Scala</li></ul>
    </div>
  </article>;
}
