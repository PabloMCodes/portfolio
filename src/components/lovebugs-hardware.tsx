"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import styles from "./lovebugs-hardware.module.css";

const parts = {
  esp: { title: "ESP32-CAM", spec: "AI Thinker · OV2640", text: "Runs the embedded firmware that connects navigation decisions to motor control. Includes an OV2640 camera; overhead OpenCV/ArUco localization is a separate part of the system.", flow: "Navigation → ESP32 firmware → motor driver" },
  driver: { title: "Motor driver", spec: "DRV8833 dual H-bridge", text: "Drives the two motors from firmware control signals. AIN1 = GPIO 13, AIN2 = 14, BIN1 = 15, BIN2 = 2.", flow: "ESP32 control signals → DRV8833 → motors" },
  motors: { title: "Drive assembly", spec: "2 × TT motors · 65mm wheels", text: "Two 3–6V gear motors, approximately 200 RPM, provide differential drive. A supporting caster balances the chassis.", flow: "Motor outputs → wheel movement" },
  battery: { title: "Battery", spec: "1S LiPo · 3.7V · 800mAh", text: "The onboard energy source. Power distribution and a common ground connect the embedded electronics and motor system.", flow: "Battery → power distribution" },
  boost: { title: "Boost converter", spec: "TPS61023 · approximately 5V", text: "Raises the battery voltage to approximately 5V for the ESP32-CAM supply.", flow: "3.7V battery → boost converter → ESP32-CAM" },
  chassis: { title: "Chassis & wiring", spec: "Custom 3D-printed PLA", text: "The custom chassis supports the electronics, two drive wheels, and caster. Lines illustrate power and motor wiring with a common ground, not an exact wiring schematic.", flow: "Mechanical support + electrical connections" },
} as const;
type Part = keyof typeof parts;
type Mesh = THREE.Mesh<THREE.BufferGeometry, THREE.MeshStandardMaterial>;
type SceneAPI = { select: (part: Part) => void; explode: (value: boolean) => void; view: (action: string) => void };

export default function LovebugsHardware() {
  const host = useRef<HTMLDivElement>(null);
  const api = useRef<SceneAPI | null>(null);
  const [selected, setSelected] = useState<Part>("esp");
  const [exploded, setExploded] = useState(false);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" }); }
    catch { setUnavailable(true); return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    const canvas = renderer.domElement;
    canvas.setAttribute("aria-label", "Two conceptual robots. Drag to rotate, pinch to zoom, or use the controls below. Select components using the buttons alongside the model.");
    canvas.setAttribute("role", "img");
    element.appendChild(canvas);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(8, 7, 11);
    const controls = new OrbitControls(camera, canvas);
    controls.target.set(0, 1.2, 0);
    controls.minDistance = 7;
    controls.maxDistance = 22;
    controls.maxPolarAngle = Math.PI * 0.48;
    controls.enablePan = false;
    controls.update();
    controls.saveState();
    scene.add(new THREE.HemisphereLight(0xfff2dd, 0x405067, 3));
    const key = new THREE.DirectionalLight(0xffffff, 4);
    key.position.set(3, 8, 5); scene.add(key);
    const meshes: Mesh[] = [];
    const groups: { group: THREE.Group; offset: THREE.Vector3 }[] = [];
    const wires: THREE.Group[] = [];
    const render = () => renderer.render(scene, camera);

    for (const origin of [-2.2, 2.2]) {
      const robot = new THREE.Group(); robot.position.x = origin; scene.add(robot);
      const createPart = (id: Part, offset: [number, number, number]) => {
        const group = new THREE.Group(); group.userData.part = id; robot.add(group);
        groups.push({ group, offset: new THREE.Vector3(...offset) }); return group;
      };
      const add = (group: THREE.Group, geometry: THREE.BufferGeometry, color: number, position: [number, number, number]) => {
        const material = new THREE.MeshStandardMaterial({ color, roughness: 0.6, metalness: 0.15 });
        const mesh = new THREE.Mesh(geometry, material); mesh.position.set(...position); mesh.userData.part = group.userData.part;
        group.add(mesh); meshes.push(mesh); return mesh;
      };
      const box = (group: THREE.Group, size: [number, number, number], color: number, position: [number, number, number]) => add(group, new THREE.BoxGeometry(...size), color, position);
      const chassis = createPart("chassis", [0, 0, 0]);
      box(chassis, [2.4, 0.22, 2.8], origin < 0 ? 0xc4a47e : 0x8ba5ad, [0, 0.75, 0]);
      for (const x of [-0.95, 0.95]) box(chassis, [0.12, 0.25, 2.5], 0x607584, [x, 0.95, 0]);
      const motors = createPart("motors", [0, -0.15, 0.85]);
      for (const x of [-1, 1]) {
        box(motors, [0.45, 0.4, 0.85], 0xeab94e, [x * 0.8, 0.45, 0.2]);
        const wheel = add(motors, new THREE.CylinderGeometry(0.62, 0.62, 0.28, 24), 0x243142, [x * 1.35, 0.62, 0.2]); wheel.rotation.z = Math.PI / 2;
        const hub = add(motors, new THREE.CylinderGeometry(0.24, 0.24, 0.3, 16), 0xdbb87c, [x * 1.35, 0.62, 0.2]); hub.rotation.z = Math.PI / 2;
      }
      add(motors, new THREE.SphereGeometry(0.23, 12, 8), 0xaeb9c6, [0, 0.28, -1]);
      const battery = createPart("battery", [0, 0.8, -0.3]);
      box(battery, [1.3, 0.3, 0.7], 0xb4bcc6, [0, 1.02, -0.65]);
      box(battery, [0.35, 0.31, 0.71], 0x4a596e, [0, 1.02, -0.65]);
      const driver = createPart("driver", [0.9, 1.5, 0.3]);
      box(driver, [0.65, 0.09, 0.65], 0x995dc6, [0.55, 1.02, 0.55]);
      box(driver, [0.27, 0.08, 0.28], 0x253141, [0.55, 1.1, 0.55]);
      const boost = createPart("boost", [-0.8, 1.5, 0]);
      box(boost, [0.55, 0.09, 0.65], 0x479c9e, [-0.55, 1.02, 0.55]);
      box(boost, [0.25, 0.18, 0.25], 0x3e4c5d, [-0.55, 1.15, 0.55]);
      const esp = createPart("esp", [0, 2.7, 0]);
      box(esp, [0.9, 0.1, 1.15], 0x307d62, [0, 1.4, -0.05]);
      box(esp, [0.65, 0.1, 0.4], 0xb1b8bd, [0, 1.51, -0.3]);
      add(esp, new THREE.CylinderGeometry(0.18, 0.18, 0.18, 16), 0x152b41, [0, 1.58, 0.25]);
      for (const x of [-0.43, 0.43]) for (let z = -0.4; z <= 0.4; z += 0.2) box(esp, [0.06, 0.08, 0.06], 0xd8b268, [x, 1.48, z]);
      const wireGroup = new THREE.Group(); wireGroup.userData.part = "chassis"; robot.add(wireGroup); wires.push(wireGroup);
      for (const [x, color] of [[-0.45, 0xe69a57], [0.45, 0x7f9cb4]] as const) {
        const curve = new THREE.CatmullRomCurve3([new THREE.Vector3(0, 1.2, -0.65), new THREE.Vector3(x, 1.3, -0.1), new THREE.Vector3(x, 1.2, 0.6), new THREE.Vector3(x * 2, 0.5, 0.2)]);
        add(wireGroup, new THREE.TubeGeometry(curve, 12, 0.025, 5, false), color, [0, 0, 0]);
      }
    }
    const grid = new THREE.GridHelper(12, 12, 0x526377, 0x344356); scene.add(grid);
    const select = (part: Part) => { for (const mesh of meshes) { mesh.material.emissive.setHex(mesh.userData.part === part ? 0xb86f2e : 0); mesh.material.emissiveIntensity = 0.35; } render(); };
    api.current = {
      select,
      explode: (value) => { groups.forEach(({ group, offset }) => group.position.copy(value ? offset : new THREE.Vector3())); wires.forEach((wire) => { wire.visible = !value; }); render(); },
      view: (action) => {
        if (action === "reset") controls.reset();
        else {
          const offset = camera.position.clone().sub(controls.target);
          if (action === "left" || action === "right") offset.applyAxisAngle(new THREE.Vector3(0, 1, 0), action === "left" ? -0.3 : 0.3);
          else offset.setLength(THREE.MathUtils.clamp(offset.length() * (action === "in" ? 0.85 : 1.15), 7, 22));
          camera.position.copy(controls.target).add(offset); controls.update();
        }
        render();
      },
    };
    const resize = () => { const { width, height } = element.getBoundingClientRect(); if (!width || !height) return; renderer.setSize(width, height); camera.aspect = width / height; camera.zoom = Math.min(1, camera.aspect / 1.25); camera.updateProjectionMatrix(); render(); };
    const observer = new ResizeObserver(resize); observer.observe(element);
    controls.addEventListener("change", render);
    const pointer = new THREE.Vector2(); const ray = new THREE.Raycaster(); let down = { x: 0, y: 0 };
    const pointerDown = (event: PointerEvent) => { down = { x: event.clientX, y: event.clientY }; };
    const pointerUp = (event: PointerEvent) => {
      if (Math.hypot(event.clientX - down.x, event.clientY - down.y) > 5) return;
      const rect = canvas.getBoundingClientRect(); pointer.set((event.clientX - rect.left) / rect.width * 2 - 1, -(event.clientY - rect.top) / rect.height * 2 + 1);
      ray.setFromCamera(pointer, camera); const hit = ray.intersectObjects(meshes.filter((mesh) => mesh.visible && mesh.parent?.visible))[0]; if (hit && hit.object.visible && hit.object.parent?.visible) setSelected(hit.object.userData.part as Part);
    };
    const lost = (event: Event) => { event.preventDefault(); setUnavailable(true); };
    canvas.addEventListener("pointerdown", pointerDown); canvas.addEventListener("pointerup", pointerUp); canvas.addEventListener("webglcontextlost", lost);
    resize(); select("esp");
    return () => {
      api.current = null; observer.disconnect(); controls.removeEventListener("change", render); controls.dispose();
      canvas.removeEventListener("pointerdown", pointerDown); canvas.removeEventListener("pointerup", pointerUp); canvas.removeEventListener("webglcontextlost", lost);
      meshes.forEach((mesh) => { mesh.geometry.dispose(); mesh.material.dispose(); }); grid.geometry.dispose();
      (Array.isArray(grid.material) ? grid.material : [grid.material]).forEach((material) => material.dispose());
      renderer.dispose(); renderer.forceContextLoss(); canvas.remove();
    };
  }, []);

  useEffect(() => { api.current?.select(selected); }, [selected]);
  useEffect(() => { api.current?.explode(exploded); }, [exploded]);
  const part = parts[selected];
  return <div className={styles.hardware}>
    <div className={styles.layout}>
      <div className={styles.stage}>
        <div className={styles.viewport} ref={host} />
        {unavailable && <p className={styles.fallback}>3D is unavailable in this browser. Explore every component using the buttons below.</p>}
        <p className={styles.hint}>Two conceptual robots · Drag to orbit · Pinch or scroll to zoom</p>
        <div className={styles.controls} aria-label="3D view controls">
          <button type="button" aria-pressed={exploded} onClick={() => setExploded(!exploded)}>{exploded ? "Assemble" : "Explode view"}</button>
          <button type="button" aria-label="Rotate left" onClick={() => api.current?.view("left")}>↶</button>
          <button type="button" aria-label="Rotate right" onClick={() => api.current?.view("right")}>↷</button>
          <button type="button" aria-label="Zoom in" onClick={() => api.current?.view("in")}>+</button>
          <button type="button" aria-label="Zoom out" onClick={() => api.current?.view("out")}>−</button>
          <button type="button" onClick={() => api.current?.view("reset")}>Reset view</button>
        </div>
      </div>
      <div className={styles.inspector}>
        <div className={styles.parts} aria-label="Robot components">{(Object.keys(parts) as Part[]).map((id) => <button type="button" key={id} aria-pressed={selected === id} onClick={() => setSelected(id)}>{parts[id].title}</button>)}</div>
        <div className={styles.details} aria-live="polite"><p className={styles.spec}>{part.spec}</p><h3>{part.title}</h3><p>{part.text}</p><p className={styles.flow}>{part.flow}</p></div>
      </div>
    </div>
    <p className={styles.caption}>Conceptual hardware visualization. Placement, scale, and wire routes are illustrative, not an exact replica or circuit diagram.</p>
  </div>;
}
