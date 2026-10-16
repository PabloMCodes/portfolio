"use client";

import dynamic from "next/dynamic";
import { useId, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import styles from "./lovebugs-architecture.module.css";

const Hardware = dynamic(() => import("./lovebugs-hardware"), { ssr: false, loading: () => <p className={styles.scope}>Loading hardware explorer…</p> });

const components = [
  { id: "agents", title: "AI agents", tech: "Google ADK · Gemini", layer: "Simulation", description: "Agents reason about tasks, communicate, manage resources, and coordinate within a shared Stardew Valley-inspired environment.", contribution: "My focus: AI agent orchestration." },
  { id: "frontend", title: "Live interface", tech: "React · TypeScript", layer: "Visualization", description: "The frontend visualizes agent activity and interactions in real time, using WebSockets to connect with the backend.", contribution: "Built collaboratively with the team." },
  { id: "backend", title: "Shared world", tech: "Python · FastAPI", layer: "Backend", description: "The backend maintains shared world state, tasks, and communication so the agents and interface can work with a common environment.", contribution: "Built collaboratively with the team." },
  { id: "vision", title: "Overhead vision", tech: "OpenCV · ArUco", layer: "Physical integration", description: "An overhead camera and ArUco markers provide robot localization. This gives movement planning a view of where the physical robots are.", contribution: "Built collaboratively with the team." },
  { id: "navigation", title: "Movement planning", tech: "Centralized navigation", layer: "Physical integration", description: "Centralized planning and movement control connect high-level agent objectives to physical robot actions. This hardware path is distinct from actions in the simulation.", contribution: "My focus: integrating agent decisions with robot control." },
  { id: "robots", title: "Two custom robots", tech: "ESP32-CAM · DRV8833", layer: "Embedded systems", description: "Custom chassis and differential-drive motors connect to ESP32-CAM firmware and DRV8833 drivers. Hardware debugging included motor noise, suppression capacitors, and power handling.", contribution: "My focus: embedded firmware." },
] as const;

type ComponentId = typeof components[number]["id"];
const connections: { from: ComponentId; to: ComponentId; path: string; label: string; observation?: boolean }[] = [
  { from: "agents", to: "backend", path: "M25 27 V39", label: "Agent coordination ↔ shared world state" },
  { from: "backend", to: "frontend", path: "M36 39 L64 27", label: "Backend ↔ live interface via WebSockets" },
  { from: "backend", to: "navigation", path: "M25 61 V73", label: "Shared tasks → movement planning" },
  { from: "vision", to: "navigation", path: "M64 61 L36 73", label: "Robot localization → movement planning" },
  { from: "navigation", to: "robots", path: "M45 84 H55", label: "Movement control → robot firmware" },
  { from: "robots", to: "vision", path: "M75 73 V61", label: "Physical robots → overhead camera observation", observation: true },
];

function RobotPair() {
  return <svg className={styles.robots} viewBox="0 0 130 54" aria-hidden="true">
    {[0, 64].map((x) => <g key={x} transform={`translate(${x} 0)`} stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round">
      <path d="M8 29v13l8 5V33zm39-8v14l8-4V17z" fill="var(--sketch-background)" />
      <path d="M12 24 35 11 54 22 31 36Z" fill="var(--sketch-background)" />
      <path d="M12 24v12l19 11V36Zm19 12 23-14v12L31 47Z" fill="var(--project-background)" />
      <path d="m26 22 9-5 8 5-9 5Z" fill="currentColor" />
      <circle cx="20" cy="33" r="1.5" fill="currentColor" /><circle cx="26" cy="36" r="1.5" fill="currentColor" />
    </g>)}
  </svg>;
}

export function LovebugsArchitecture() {
  const [view, setView] = useState<"system" | "hardware">("system");
  const [selected, setSelected] = useState<ComponentId>("agents");
  const [hovered, setHovered] = useState<ComponentId | null>(null);
  const reducedMotion = useReducedMotion();
  const panelId = useId();
  const active = hovered ?? selected;
  const component = components.find((item) => item.id === active)!;
  const flows = connections.filter((edge) => edge.from === active || edge.to === active);

  return <div className={styles.architecture}>
    <div className={styles.viewControls} aria-label="Architecture view">
      <button type="button" aria-pressed={view === "system"} onClick={() => setView("system")}>System map</button>
      <button type="button" aria-pressed={view === "hardware"} onClick={() => setView("hardware")}>Explore hardware · 3D</button>
    </div>
    {view === "hardware" ? <Hardware /> : <div className={styles.layout}>
      <div className={styles.map}>
        <div className={styles.mapHeading}><span>System map</span><span>Hover or select a component</span></div>
        <div className={styles.diagram} role="group" aria-label="Explore the Love Bugs architecture">
          <svg className={styles.connections} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            {connections.map((edge) => <motion.path
              key={`${edge.from}-${edge.to}`}
              d={edge.path}
              fill="none"
              stroke="currentColor"
              vectorEffect="non-scaling-stroke"
              strokeWidth={edge.from === active || edge.to === active ? 2.5 : 1.5}
              strokeDasharray={edge.observation ? "4 4" : undefined}
              initial={false}
              animate={{ opacity: edge.from === active || edge.to === active ? 1 : 0.22 }}
              transition={{ duration: reducedMotion ? 0 : 0.18 }}
            />)}
          </svg>
          {components.map((item) => <button
            key={item.id}
            type="button"
            className={styles.node}
            data-active={active === item.id}
            aria-pressed={selected === item.id}
            aria-controls={panelId}
            onPointerEnter={(event) => { if (event.pointerType !== "touch") setHovered(item.id); }}
            onPointerLeave={() => setHovered(null)}
            onFocus={() => { setHovered(null); setSelected(item.id); }}
            onClick={() => { setHovered(null); setSelected(item.id); }}
          >
            {item.id === "robots" && <RobotPair />}
            <strong>{item.title}</strong><span>{item.tech}</span>
          </button>)}
        </div>
        <p className={styles.legend}>Highlighted lines show related flows · Dashed line: camera observation</p>
      </div>
      <div id={panelId} className={styles.inspector} role="region" aria-label="Selected component details">
        <p className={styles.layer}>{component.layer}</p>
        <h3>{component.title}</h3>
        <p className={styles.description}>{component.description}</p>
        <ul className={styles.flows} aria-label="Related information flows">{flows.map((edge) => <li key={edge.label}>{edge.label}</li>)}</ul>
        <p className={styles.contribution}>{component.contribution}</p>
      </div>
    </div>}
    <p className={styles.pipeline}>Gemini / ADK → FastAPI → navigation & control → ESP32 firmware → motors</p>
    <p className={styles.feedback}>OpenCV / ArUco → position feedback · React / WebSockets → shared environment & agent activity</p>
    <p className={styles.scope}><strong>Simulation ≠ hardware demo.</strong> Multi-agent coordination worked in the shared simulation. The physical integration connected vision, navigation, and embedded control; not every simulated action was demonstrated on the robots.</p>
  </div>;
}
