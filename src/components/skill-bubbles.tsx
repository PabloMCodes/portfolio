"use client";

import { useAnimationFrame, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import styles from "./skill-bubbles.module.css";

type Group = { title: string; items: string[] };
type Bubble = { x: number; y: number; vx: number; vy: number; radius: number };
const GAP = 8;
const clamp = (value: number, low: number, high: number) => Math.max(low, Math.min(high, value));

function BubbleGroup({ title, items, paused }: Group & { paused: boolean }) {
  const arena = useRef<HTMLUListElement>(null);
  const nodes = useRef<(HTMLButtonElement | null)[]>([]);
  const bodies = useRef<Bubble[]>([]);
  const bounds = useRef({ width: 0, height: 0 });
  const visible = useRef(false);
  const drag = useRef<{ index: number; x: number; y: number } | null>(null);

  function paint() {
    bodies.current.forEach((body, index) => {
      const node = nodes.current[index];
      if (node) node.style.transform = `translate3d(${body.x - body.radius}px, ${body.y - body.radius}px, 0)`;
    });
  }

  useEffect(() => {
    const element = arena.current;
    if (!element) return;
    const resize = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width;
      if (!width || Math.abs(width - bounds.current.width) < 1) return;
      const columns = Math.max(1, Math.floor(width / 132));
      const rows = Math.ceil(items.length / columns);
      const height = Math.max(360, rows * 132 + 24);
      bounds.current = { width, height };
      element.style.height = `${height}px`;
      drag.current = null;
      bodies.current = items.map((item, index) => {
        const radius = item.length > 16 ? 58 : item.length > 9 ? 51 : 42;
        const angle = index * 2.4 + 0.7;
        const node = nodes.current[index];
        if (node) { node.style.width = `${radius * 2}px`; node.style.height = `${radius * 2}px`; }
        return {
          radius, x: (index % columns + 0.5) * (width / columns),
          y: (Math.floor(index / columns) + 0.5) * (height / rows),
          vx: Math.cos(angle) * 12, vy: Math.sin(angle) * 12,
        };
      });
      paint();
      element.dataset.ready = "true";
    });
    const observer = new IntersectionObserver(([entry]) => { visible.current = entry.isIntersecting; });
    resize.observe(element);
    observer.observe(element);
    return () => { resize.disconnect(); observer.disconnect(); };
  }, [items]);

  useAnimationFrame((_, delta) => {
    if (paused || !visible.current || document.hidden) return;
    const dt = Math.min(delta / 1000, 1 / 30);
    const { width, height } = bounds.current;
    const bubbles = bodies.current;
    const held = drag.current;
    const contain = (b: Bubble) => {
      const x = clamp(b.x, b.radius + GAP, width - b.radius - GAP);
      const y = clamp(b.y, b.radius + GAP, height - b.radius - GAP);
      if (x !== b.x) b.vx *= -0.85;
      if (y !== b.y) b.vy *= -0.85;
      b.x = x; b.y = y;
    };
    bubbles.forEach((b, index) => {
      if (held?.index === index) {
        const dx = clamp(held.x - b.x, -10, 10);
        const dy = clamp(held.y - b.y, -10, 10);
        b.x += dx; b.y += dy;
        b.vx = dx / Math.max(dt, 0.001); b.vy = dy / Math.max(dt, 0.001);
      } else {
        const speed = Math.hypot(b.vx, b.vy);
        const nextSpeed = clamp(speed * Math.exp(-0.7 * dt), 10, 140);
        if (speed > 0) { b.vx *= nextSpeed / speed; b.vy *= nextSpeed / speed; }
        b.x += b.vx * dt; b.y += b.vy * dt;
      }
      contain(b);
    });
    // Resolve circles repeatedly so a dragged bubble can push an entire cluster.
    for (let pass = 0; pass < 10; pass++) {
      for (let i = 0; i < bubbles.length; i++) {
        for (let j = i + 1; j < bubbles.length; j++) {
          const a = bubbles[i], b = bubbles[j];
          const dx = b.x - a.x, dy = b.y - a.y;
          const distance = Math.hypot(dx, dy);
          const minimum = a.radius + b.radius + GAP;
          if (distance >= minimum) continue;
          const nx = distance > 0 ? dx / distance : 1;
          const ny = distance > 0 ? dy / distance : 0;
          const correction = (minimum - distance) / 2;
          a.x -= nx * correction; a.y -= ny * correction;
          b.x += nx * correction; b.y += ny * correction;
          const approach = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny;
          if (approach < 0) {
            const impulse = approach * 0.85;
            a.vx += impulse * nx; a.vy += impulse * ny;
            b.vx -= impulse * nx; b.vy -= impulse * ny;
          }
        }
      }
      bubbles.forEach(contain);
    }
    paint();
  });

  function point(event: PointerEvent<HTMLButtonElement>, index: number) {
    const rect = arena.current?.getBoundingClientRect();
    if (rect) drag.current = { index, x: event.clientX - rect.left, y: event.clientY - rect.top };
  }

  return <section className={styles.group} aria-label={title}>
    <div className={styles.groupHeading}><h2>{title}</h2><span>{items.length} tools</span></div>
    <ul ref={arena} className={styles.arena} data-paused={paused}>
      {items.map((item, index) => <li key={item}>
        <button
          ref={(node) => { nodes.current[index] = node; }}
          className={styles.bubble}
          type="button"
          aria-label={`${item}. Use arrow keys to push this bubble.`}
          onPointerDown={(event) => {
            if (paused || event.button !== 0) return;
            event.currentTarget.setPointerCapture(event.pointerId);
            point(event, index);
          }}
          onPointerMove={(event) => { if (drag.current?.index === index) point(event, index); }}
          onPointerUp={() => { drag.current = null; }}
          onPointerCancel={() => { drag.current = null; }}
          onLostPointerCapture={() => { drag.current = null; }}
          onKeyDown={(event) => {
            if (paused) return;
            const vectors: Record<string, [number, number]> = { ArrowLeft: [-100, 0], ArrowRight: [100, 0], ArrowUp: [0, -100], ArrowDown: [0, 100], " ": [0, -100], Enter: [0, -100] };
            const direction = vectors[event.key];
            const b = bodies.current[index];
            if (direction && b) { event.preventDefault(); b.vx += direction[0]; b.vy += direction[1]; }
          }}
        >{item}</button>
      </li>)}
    </ul>
  </section>;
}

export function SkillBubbles({ groups }: { groups: Group[] }) {
  const reducedMotion = useReducedMotion();
  const [userPaused, setUserPaused] = useState<boolean | null>(null);
  const paused = userPaused ?? Boolean(reducedMotion);
  return <>
    <div className={styles.controls}>
      <p>Grab a bubble and give it a gentle push. Or use Tab and the arrow keys.</p>
      <button type="button" onClick={() => setUserPaused(!paused)} aria-pressed={paused}>{paused ? "Resume motion" : "Pause motion"}</button>
    </div>
    <div className={styles.grid}>{groups.map((group) => <BubbleGroup key={group.title} {...group} paused={paused} />)}</div>
  </>;
}
