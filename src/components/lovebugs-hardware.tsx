"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
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
    catch {
      // Report initialization failure after the effect finishes, and cancel on unmount.
      const frame = requestAnimationFrame(() => setUnavailable(true));
      return () => cancelAnimationFrame(frame);
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    const canvas = renderer.domElement;
    canvas.setAttribute("aria-label", "Two conceptual robots. Drag to rotate, pinch to zoom, or use the controls below. Select components using the buttons alongside the model.");
    canvas.setAttribute("role", "img");
    element.appendChild(canvas);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(7.5, 7.5, 12);
    const controls = new OrbitControls(camera, canvas);
    controls.target.set(0, 1.8, 0);
    controls.minDistance = 7;
    controls.maxDistance = 22;
    controls.maxPolarAngle = Math.PI * 0.48;
    controls.enablePan = false;
    controls.update();
    controls.saveState();
    scene.add(new THREE.HemisphereLight(0xfff2dd, 0x405067, 3));
    const key = new THREE.DirectionalLight(0xffffff, 4);
    key.position.set(3, 8, 5); scene.add(key);
    const textures: THREE.CanvasTexture[] = [];
    const texture = (draw: (ctx: CanvasRenderingContext2D) => void) => {
      const surface = document.createElement("canvas"); surface.width = 512; surface.height = 512;
      const context = surface.getContext("2d")!; draw(context);
      const map = new THREE.CanvasTexture(surface); map.colorSpace = THREE.SRGBColorSpace; textures.push(map); return map;
    };
    const breadboardMap = texture((ctx) => {
      ctx.fillStyle = "#e8e5db"; ctx.fillRect(0, 0, 512, 512);
      for (const y of [35, 477]) { ctx.fillStyle = "#b85150"; ctx.fillRect(18, y, 476, 3); ctx.fillStyle = "#4c91b7"; ctx.fillRect(18, y + 12, 476, 3); }
      ctx.fillStyle = "#b7b5ac"; ctx.fillRect(15, 249, 482, 14);
      for (let x = 25; x < 500; x += 17) for (const y of [65, 85, 120, 145, 170, 195, 220, 290, 315, 340, 365, 390, 430, 450]) {
        ctx.fillStyle = "#454545"; ctx.fillRect(x, y, 6, 8);
      }
    });
    const faceMaps = [0, 1].map((variant) => texture((ctx) => {
      ctx.fillStyle = "#f3f1e9"; ctx.fillRect(0, 0, 512, 512);
      ctx.strokeStyle = "#202226"; ctx.fillStyle = "#202226"; ctx.lineWidth = 5;
      if (variant === 0) {
        for (const x of [144, 358]) {
          ctx.beginPath(); ctx.ellipse(x, 242, 92, 66, x < 200 ? -0.2 : 0.2, 0, Math.PI * 2); ctx.stroke();
          ctx.beginPath(); ctx.ellipse(x, 240, 43, 49, -0.2, 0, Math.PI * 2); ctx.fill();
          for (const d of [-1, 1]) { ctx.beginPath(); ctx.arc(x + d * 61, 258 + d * 22, 5, 0, Math.PI * 2); ctx.fill(); }
        }
      } else {
        ctx.beginPath(); ctx.ellipse(256, 211, 187, 105, -0.04, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = "#368ace"; ctx.lineWidth = 24; ctx.lineCap = "round";
        for (const x of [177, 331]) { ctx.beginPath(); ctx.moveTo(x - 38, 220); ctx.quadraticCurveTo(x, 178, x + 38, 213); ctx.stroke(); }
      }
    }));
    const markerMaps = [0, 1].map((variant) => texture((ctx) => {
      ctx.fillStyle = "#f6f5ef"; ctx.fillRect(0, 0, 512, 512); ctx.fillStyle = "#17191b"; ctx.fillRect(60, 60, 392, 392);
      const cells = variant === 0 ? [[1,1],[2,1],[2,2],[1,3],[3,3]] : [[1,1],[3,1],[1,2],[2,2],[3,2]];
      ctx.fillStyle = "#f6f5ef"; for (const [x,y] of cells) ctx.fillRect(60 + x * 78, 60 + y * 78, 78, 78);
    }));
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
      const surface = (group: THREE.Group, width: number, height: number, map: THREE.CanvasTexture, position: [number, number, number], flat = false) => {
        const mesh = add(group, new THREE.PlaneGeometry(width, height), 0xffffff, position);
        mesh.material.map = map; mesh.material.roughness = 0.9;
        if (flat) mesh.rotation.x = -Math.PI / 2;
        return mesh;
      };
      const mergedBoxes = (group: THREE.Group, boxes: {size: [number, number, number]; position: [number, number, number]; rotation?: number}[], color: number) => {
        const geometries = boxes.map(({size, position, rotation = 0}) => { const geometry = new THREE.BoxGeometry(...size); geometry.rotateX(rotation); geometry.translate(...position); return geometry; });
        const geometry = mergeGeometries(geometries); geometries.forEach((item) => item.dispose()); return add(group, geometry, color, [0,0,0]);
      };
      const chassis = createPart("chassis", [0, 0, 0]);
      box(chassis, [2.65, 0.14, 3.1], 0xe7e5dc, [0, 0.95, 0]);
      // Upright faces and raised paper markers follow the hackathon photos.
      const shell = createPart("chassis", [0, 1.1, 2]);
      box(shell, [1.85, 2.35, 0.07], 0xeeeae1, [0, 2.18, 1.22]);
      surface(shell, 1.83, 2.32, faceMaps[origin < 0 ? 0 : 1], [0, 2.18, 1.26]);
      const canopy = createPart("chassis", [0, 2.3, -0.8]);
      for (const x of [-0.95, 0.95]) box(canopy, [0.1, 1.9, 0.1], 0xe7e5dc, [x, 2.0, -1.15]);
      box(canopy, [2.25, 0.04, 1.65], 0xece9e0, [0, 3.0, -0.75]);
      surface(canopy, 2.4, 1.8, markerMaps[origin < 0 ? 0 : 1], [0, 3.025, -0.75], true);
      // Flat printed board texture avoids hundreds of individual breadboard sockets.
      box(chassis, [2.05, 0.18, 1.6], 0xe0ded5, [0, 1.14, -0.08]);
      surface(chassis, 2.05, 1.6, breadboardMap, [0, 1.235, -0.08], true);
      for (const x of [-1.12, 1.12]) for (const z of [-1.3, 1.3]) {
        const screw = add(chassis, new THREE.CylinderGeometry(0.055, 0.055, 0.03, 8), 0x44464a, [x, 1.035, z]); screw.material.metalness = 0.65;
      }
      const motors = createPart("motors", [0, -0.05, 1]);
      for (const x of [-1, 1]) {
        box(motors, [0.52, 0.48, 1.05], 0xf0c513, [x * 0.92, 0.62, 0.5]);
        const can = add(motors, new THREE.CylinderGeometry(0.24, 0.24, 0.48, 20), 0xa2a5a6, [x * 0.92, 0.62, 1.15]); can.rotation.x = Math.PI / 2; can.material.metalness = 0.8;
        const cap = add(motors, new THREE.CylinderGeometry(0.19, 0.19, 0.08, 16), 0x222528, [x * 0.92, 0.62, 1.42]); cap.rotation.x = Math.PI / 2;
        const axle = add(motors, new THREE.CylinderGeometry(0.045, 0.045, 0.1, 10), 0xb5b6ae, [x * 0.92, 0.62, 1.48]); axle.rotation.x = Math.PI / 2;
        const wheel = add(motors, new THREE.CylinderGeometry(0.73, 0.73, 0.43, 36), 0x222426, [x * 1.55, 0.76, 0.28]); wheel.rotation.z = Math.PI / 2; wheel.material.roughness = 0.98; wheel.material.metalness = 0;
        const treads = Array.from({length: 28}, (_, i) => { const angle = i * Math.PI / 14; return {size: [0.45,0.06,0.12] as [number,number,number], position: [x*1.55,0.76+Math.cos(angle)*0.73,0.28+Math.sin(angle)*0.73] as [number,number,number], rotation: angle}; });
        mergedBoxes(motors, treads, 0x2b2c2d);
        const hub = add(motors, new THREE.CylinderGeometry(0.55, 0.55, 0.45, 32), 0xeac615, [x * 1.55, 0.76, 0.28]); hub.rotation.z = Math.PI / 2;
        const inset = add(motors, new THREE.CylinderGeometry(0.44, 0.44, 0.012, 32), 0x555124, [x * 1.78, 0.76, 0.28]); inset.rotation.z = Math.PI / 2;
        const spokes = Array.from({length: 5}, (_, i) => { const angle = i * Math.PI * 2 / 5; return {size: [0.04,0.48,0.1] as [number,number,number], position: [x*1.79,0.76+Math.cos(angle)*0.22,0.28+Math.sin(angle)*0.22] as [number,number,number], rotation: angle}; });
        mergedBoxes(motors, spokes, 0xf0d027);
        const center = add(motors, new THREE.CylinderGeometry(0.13, 0.13, 0.48, 16), 0xe9c21c, [x * 1.55, 0.76, 0.28]); center.rotation.z = Math.PI / 2;
      }
      add(motors, new THREE.SphereGeometry(0.22, 16, 10), 0xaeb9c6, [0, 0.3, -1.1]);
      const battery = createPart("battery", [0, 0.8, -1.7]);
      box(battery, [1.2, 0.23, 0.7], 0xc2c6c3, [0, 1.15, -1.13]);
      box(battery, [0.22, 0.25, 0.72], 0x292c2c, [0.35, 1.15, -1.13]);
      const driver = createPart("driver", [0, 1.5, 0.1]);
      box(driver, [0.52, 0.065, 0.67], 0xb72826, [0, 1.36, 0]);
      box(driver, [0.2, 0.07, 0.3], 0x252626, [0, 1.43, 0]);
      const boost = createPart("boost", [-0.7, 1.8, -0.1]);
      box(boost, [0.42, 0.06, 0.65], 0x272b2a, [-0.7, 1.36, 0]);
      const inductor = add(boost, new THREE.CylinderGeometry(0.1, 0.1, 0.1, 12), 0x6c7370, [-0.7, 1.44, 0.08]); inductor.material.metalness = 0.5;
      const esp = createPart("esp", [0.8, 2.2, 0.2]);
      box(esp, [0.68, 0.065, 1.0], 0x24282a, [0.68, 1.38, -0.08]);
      box(esp, [0.48, 0.08, 0.4], 0xb3b5b1, [0.68, 1.46, -0.32]);
      box(esp, [0.23, 0.025, 0.28], 0xa5692d, [0.68, 1.45, 0.1]);
      box(esp, [0.26, 0.1, 0.24], 0x202327, [0.68, 1.51, 0.21]);
      const lens = add(esp, new THREE.CylinderGeometry(0.085, 0.1, 0.1, 20), 0x102231, [0.68, 1.6, 0.21]); lens.material.metalness = 0.7; lens.material.roughness = 0.15;
      box(esp, [0.08, 0.05, 0.08], 0xf4eaa7, [0.92, 1.44, -0.4]);
      for (const [group, centerX, width, depth, count] of [[esp,0.68,0.62,0.8,8], [driver,0,0.45,0.5,6], [boost,-0.7,0.36,0.45,4]] as const) {
        for (const side of [-1,1]) for (let pin=0; pin<count; pin++) {
          box(group, [0.045,0.12,0.045], 0xbcb8a1, [centerX + side*width/2, 1.42, -depth/2+pin*depth/(count-1)]);
        }
      }
      const wireGroup = new THREE.Group(); wireGroup.userData.part = "chassis"; robot.add(wireGroup); wires.push(wireGroup);
      for (const [x,z] of [[-0.8,0.65],[0.7,-0.65]]) {
        add(wireGroup, new THREE.CylinderGeometry(0.11,0.11,0.32,16), 0x202329, [x,1.45,z]);
        add(wireGroup, new THREE.CylinderGeometry(0.095,0.095,0.01,16), 0xbabdb6, [x,1.615,z]);
        box(wireGroup, [0.14,0.012,0.008], 0x656767, [x,1.625,z]);
      }
      const routes: {color: number; points: [number,number,number][]}[] = [
        {color:0xc62d2f,points:[[-0.8,1.27,0.6],[-1.1,2.1,0.2],[0.2,2.0,-0.4],[0.68,1.52,0.1]]},
        {color:0x252729,points:[[-0.6,1.3,0.5],[-0.9,1.9,0.1],[-0.5,2,-0.5],[0.68,1.5,-0.2]]},
        {color:0xc62d2f,points:[[0,1.45,0],[0.2,1.9,0.9],[1.35,1.3,1.25],[0.92,0.6,1.2]]},
        {color:0x252729,points:[[0.1,1.45,0.1],[0.35,1.75,0.85],[-1.25,1.35,1.1],[-0.92,0.6,1.2]]},
        {color:0xe5be25,points:[[0,1.45,0.25],[0.4,1.72,0.3],[0.75,1.7,0.4],[0.93,1.45,0.1]]},
        {color:0x2d629e,points:[[0.1,1.45,0.3],[0.35,1.8,0.45],[0.9,1.8,0.25],[0.93,1.45,-0.1]]},
        {color:0xe5be25,points:[[-0.1,1.45,0.2],[0.25,1.7,0.65],[0.9,1.65,0.5],[0.93,1.45,0.25]]},
        {color:0xcc722e,points:[[-0.7,1.45,-0.1],[-0.5,2.05,-0.6],[0.4,2.15,-0.45],[0.7,1.45,-0.3]]},
        {color:0x252729,points:[[0,1.25,-1.2],[-1.25,1.5,-0.8],[-1.35,1.7,0.1],[-0.7,1.45,0.25]]},
      ];
      for (const {color,points} of routes) {
        const curve = new THREE.CatmullRomCurve3(points.map((point) => new THREE.Vector3(...point)));
        add(wireGroup,new THREE.TubeGeometry(curve,20,0.022,6,false),color,[0,0,0]);
      }
      for (const x of [-0.72,0.75]) { const tape = box(wireGroup,[0.45,0.1,0.23],0x202224,[x,1.76,0.15]); tape.rotation.z = x < 0 ? 0.2 : -0.25; }

    }
    const grid = new THREE.GridHelper(12, 12, 0x526377, 0x344356); scene.add(grid);
    const select = (part: Part) => { for (const mesh of meshes) { mesh.material.emissive.setHex(mesh.userData.part === part ? 0xb86f2e : 0); mesh.material.emissiveIntensity = 0.18; } render(); };
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
      meshes.forEach((mesh) => { mesh.geometry.dispose(); mesh.material.dispose(); }); grid.geometry.dispose(); textures.forEach((map) => map.dispose());
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
    <p className={styles.caption}>Photo-informed hardware visualization. Visible layout follows the hackathon photos; hidden placement, scale, marker patterns, and wire routes remain illustrative.</p>
  </div>;
}
