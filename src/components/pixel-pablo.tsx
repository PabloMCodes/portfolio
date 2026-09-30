"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { animate } from "motion/mini";
import styles from "@/app/home.module.css";

type Phase = "idle" | "turning" | "presenting";

export function PixelPablo() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("idle");
  const spriteRef = useRef<HTMLAnchorElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const navigating = useRef(false);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  function goToProjects(event: MouseEvent<HTMLAnchorElement>) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    event.preventDefault();
    if (navigating.current) return;
    navigating.current = true;
    setPhase("turning");

    timers.current.push(setTimeout(() => setPhase("presenting"), 340));
    timers.current.push(setTimeout(() => {
      const sprite = spriteRef.current;
      const screen = screenRef.current;
      if (!sprite || !screen) {
        router.push("/projects");
        return;
      }

      const rect = sprite.getBoundingClientRect();
      screen.style.display = "block";
      screen.style.left = `${rect.left + rect.width * 0.50}px`;
      screen.style.top = `${rect.top + rect.height * 0.29}px`;
      screen.style.width = `${rect.width * 0.31}px`;
      screen.style.height = `${rect.height * 0.24}px`;

      animate(screen, {
        left: "0px",
        top: "0px",
        width: `${window.innerWidth}px`,
        height: `${window.innerHeight}px`,
        borderRadius: "0px",
      }, { duration: 0.8, ease: [0.22, 1, 0.36, 1] }).then(() => router.push("/projects"));
    }, 610));
  }

  return <div className={styles.pixelScene} data-phase={phase}>
    <a ref={spriteRef} className={styles.pixelSprite} href="/projects" onClick={goToProjects} aria-label="Watch Pablo turn his laptop around to show his projects">
      <Image className={styles.pixelFrame} src="/images/pablo-pixel-laptop.png" alt="" fill sizes="160px" unoptimized />
      <Image className={`${styles.pixelFrame} ${styles.pixelTyping}`} src="/images/pablo-pixel-typing.png" alt="" fill sizes="160px" unoptimized />
      <Image className={`${styles.pixelFrame} ${styles.pixelTurning}`} src="/images/pablo-pixel-turning.png" alt="" fill sizes="160px" unoptimized />
      <Image className={`${styles.pixelFrame} ${styles.pixelPresenting}`} src="/images/pablo-pixel-presenting.png" alt="" fill sizes="160px" unoptimized />
      <span className={styles.typingSpark} aria-hidden="true" />
    </a>
    <a className={styles.pixelCallout} href="/projects" onClick={goToProjects}>
      <svg aria-hidden="true" viewBox="0 0 54 45" fill="none">
        <path d="M51 3C39 3 39 19 29 22c-7 2-12 0-23 17m0 0 3-12M6 39l13-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span>Click here to see what I’ve worked on!</span>
    </a>
    <div ref={screenRef} className={styles.pixelScreenZoom} aria-hidden="true">
      <div className={styles.pixelScreenContent}>
        <span className={styles.pixelScreenEyebrow}>Pablo Mendoza / Portfolio</span>
        <span className={styles.pixelScreenTitle}>Projects <span>↗</span></span>
        <span className={styles.pixelScreenLine} />
        <span className={styles.pixelScreenLine} />
        <span className={styles.pixelScreenLine} />
      </div>
    </div>
  </div>;
}
