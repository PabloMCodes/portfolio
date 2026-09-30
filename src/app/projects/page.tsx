import { SiteShell } from "@/components/site-shell";
import styles from "../home.module.css";

function FleetSketch() {
  return <figure className={styles.sketch}>
    <div className={styles.sketchHeading}><span>Fleet architecture</span><span>Concept sketch</span></div>
    <svg viewBox="0 0 560 310" role="img" aria-labelledby="fleet-title fleet-desc">
      <title id="fleet-title">From perception to physical movement</title><desc id="fleet-desc">A conceptual view of an overhead camera feeding centralized planning, which coordinates robots through Bluetooth. One robot is named WALL-Y.</desc>
      <g fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="190" y="20" width="180" height="48" rx="4" /><path d="M280 68v38" /><rect x="170" y="106" width="220" height="56" rx="4" /><path d="M280 162v54M100 238v-22h360v22M280 216v22" /><rect x="49" y="238" width="102" height="46" rx="4" /><rect x="229" y="238" width="102" height="46" rx="4" /><rect x="409" y="238" width="102" height="46" rx="4" /><circle cx="280" cy="216" r="4" fill="currentColor" /></g>
      <g fill="currentColor" textAnchor="middle" fontSize="12"><text x="280" y="49">OVERHEAD CAMERA</text><text x="280" y="139">CENTRALIZED PLANNING</text><text x="365" y="192" fontSize="10">BLUETOOTH</text><text x="100" y="266">ROBOT</text><text x="280" y="266">WALL-Y</text><text x="460" y="266">ROBOT</text></g>
    </svg><figcaption>Perceive. Plan. Coordinate. Move.</figcaption>
  </figure>;
}

export default function ProjectsPage() {
  return <SiteShell currentPath="/projects"><section className={styles.section} aria-labelledby="projects-title">
    <div className={styles.sectionHeading}><div><p className={styles.label}>Things I’ve built</p><h1 id="projects-title" className={styles.pageTitle}>Projects</h1></div></div>
    <article className={styles.featuredProject}><div className={styles.featuredCopy}><p className={styles.label}>ShellHacks 2026 / Robotics</p><h3>Autonomous<br />Multi-Robot Fleet</h3><p>Physical robots, overhead vision, and centralized planning. My work connected firmware, hardware, communication, autonomous navigation, and agent orchestration into a working system.</p><ul className={styles.tags} aria-label="Fleet technologies"><li>ESP32</li><li>Computer vision</li><li>Agent orchestration</li></ul></div><FleetSketch /></article>
    <div className={styles.fieldNote}><span className={styles.label}>Meet WALL-Y</span><p>One of our robots was named WALL-Y. Getting the fleet running took more than code: motor noise was disconnecting the ESP32s. Investigating power behavior, adding suppression capacitors, and improving power handling helped us get reliable operation.</p></div>
    <div className={styles.projectGrid}>
      <article className={styles.projectCard}><div><p className={styles.label}>AI productivity / Full stack</p><h3>LockedIn</h3><p>A focus platform that uses computer vision to recognize distractions during work sessions, then turns that activity into useful session insights and social leaderboards.</p></div><ul className={styles.detailList}><li>Built a Python inference pipeline and real-time WebSocket updates.</li><li>Designed the Next.js dashboard, authentication, and analytics experience.</li></ul><ul className={styles.tags} aria-label="LockedIn technologies"><li>Next.js</li><li>FastAPI</li><li>YOLOv8</li><li>MediaPipe</li><li>Prisma</li><li>NextAuth</li></ul></article>
      <article className={styles.projectCard}><div><p className={styles.label}>Mobile / Team project</p><h3>StudySpot</h3><p>A study-location app with interactive maps, location-aware check-ins, and live availability scoring, built and tested with a four-person team.</p></div><ul className={styles.detailList}><li>Led the team through three months of product development.</li><li>Expanded location coverage with deduplicated Google Places searches.</li><li>Distributed internal builds through Apple TestFlight for feedback.</li></ul><ul className={styles.tags} aria-label="StudySpot technologies"><li>React Native</li><li>FastAPI</li><li>PostgreSQL</li><li>Google Places API</li></ul></article>
    </div>
  </section></SiteShell>;
}
