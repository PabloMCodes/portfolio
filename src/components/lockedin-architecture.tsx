"use client";

import { useId, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import styles from "./lockedin-architecture.module.css";

const stages = [
  { title: "Webcam", subtitle: "Session input", tech: "Camera-based focus tracking", description: "A webcam provides visual input during a study session, adding context beyond a countdown timer.", input: "Study-session camera input", output: "Visual activity for detection" },
  { title: "Computer vision", subtitle: "Interpret activity", tech: "YOLOv8 · MediaPipe · TensorFlow.js", description: "Vision functionality identifies potential distractions such as phone use, looking away, and drowsiness. The project combined a Python inference pipeline with browser-based vision functionality.", input: "Visual activity", output: "Focus and potential-distraction information" },
  { title: "FastAPI", subtitle: "Backend integration", tech: "Python · FastAPI", description: "Backend functionality connects detection with focus-session information, activity metrics, and analytics APIs.", input: "Detection and session information", output: "Activity updates and session metrics" },
  { title: "WebSockets", subtitle: "Live communication", tech: "Real-time event updates", description: "WebSocket communication carries live activity information between the detection system and frontend so the interface can respond as focus state changes.", input: "Activity updates", output: "Live dashboard feedback" },
  { title: "Dashboard", subtitle: "Feedback & insights", tech: "Next.js · React · TypeScript · Tailwind CSS", description: "The dashboard brings together live focus visualizations, focus scores, distraction events, and session statistics to help users understand their concentration patterns.", input: "Live updates and session information", output: "Feedback, statistics, and timelines" },
];

export function LockedInArchitecture() {
  const [selected, setSelected] = useState(0);
  const reducedMotion = useReducedMotion();
  const panelId = useId();
  const stage = stages[selected];

  return <div className={styles.architecture}>
    <div className={styles.heading}><span>From camera input to focus insights</span><span>Select a step to explore</span></div>
    <ol className={styles.pipeline} aria-label="Conceptual information flow">
      {stages.map((item, index) => <li key={item.title}>
        <button type="button" aria-pressed={selected === index} aria-controls={panelId} onClick={() => setSelected(index)} onFocus={() => setSelected(index)}>
          <span className={styles.number}>0{index + 1}</span>
          <strong>{item.title}</strong><span className={styles.subtitle}>{item.subtitle}</span>
          <motion.span className={styles.indicator} aria-hidden="true" initial={false} animate={{ opacity: selected === index ? 1 : 0, scaleX: selected === index ? 1 : 0 }} transition={{ duration: reducedMotion ? 0 : 0.2 }} />
        </button>
      </li>)}
    </ol>
    <div className={styles.inspector} id={panelId} role="region" aria-label="Selected architecture step">
      <div><p className={styles.tech}>{stage.tech}</p><h3>{stage.title}</h3><p className={styles.description}>{stage.description}</p></div>
      <dl className={styles.exchange}><div><dt>Input</dt><dd>{stage.input}</dd></div><div><dt>Output</dt><dd>{stage.output}</dd></div></dl>
    </div>
    <div className={styles.features}>
      <div><h4>Session analytics</h4><p>Focus scores, distraction events, and timelines.</p></div>
      <div><h4>Social accountability</h4><p>Friends and leaderboards for shared motivation.</p></div>
      <div><h4>Personal sessions</h4><p>NextAuth accounts and Prisma-backed application data.</p></div>
    </div>
    <p className={styles.note}>Conceptual information flow, not a deployment diagram. Vision tools are grouped without assigning individual models to execution environments.</p>
  </div>;
}
