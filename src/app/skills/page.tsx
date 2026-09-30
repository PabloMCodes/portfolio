import { SiteShell } from "@/components/site-shell";
import styles from "../home.module.css";

const groups = [
  { title: "Languages", items: ["Python", "Java", "TypeScript", "JavaScript", "Scala", "C", "SQL", "HTML / CSS"] },
  { title: "Web & backend", items: ["React", "React Native", "Next.js", "FastAPI", "GraphQL", "Prisma", "SQLite", "PostgreSQL", "Thrift"] },
  { title: "Infrastructure & delivery", items: ["Git / GitHub", "Docker", "AWS", "CI/CD", "Kubernetes", "Testing", "Splunk", "WebSockets"] },
  { title: "Robotics & AI", items: ["ESP32", "YOLOv8", "MediaPipe", "Computer vision", "ArUco localization", "Bluetooth communication", "Agent orchestration"] },
];

export default function SkillsPage() {
  return <SiteShell currentPath="/skills"><section className={`${styles.section} ${styles.skills}`} aria-labelledby="skills-title">
    <div className={styles.sectionHeading}><div><p className={styles.label}>My toolkit</p><h1 id="skills-title" className={styles.pageTitle}>Skills</h1></div><p>Tools I’ve used across my work and projects.</p></div>
    <div className={styles.skillGrid}>{groups.map(({ title, items }) => <div key={title} className={styles.skillGroup}><h3>{title}</h3><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></div>)}</div>
  </section></SiteShell>;
}
