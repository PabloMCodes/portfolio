import { SiteShell } from "@/components/site-shell";
import { SkillBubbles } from "@/components/skill-bubbles";
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
    <SkillBubbles groups={groups} />
  </section></SiteShell>;
}
