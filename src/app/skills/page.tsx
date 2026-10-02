import { SiteShell } from "@/components/site-shell";
import { SkillBubbles } from "@/components/skill-bubbles";
import styles from "../home.module.css";

const groups = [
  { title: "Languages", items: ["Python", "Java", "TypeScript", "JavaScript", "Scala", "C", "SQL", "Php", "HTML / CSS"] },
  { title: "Web & backend", items: ["React", "React Native", "Next.js", "FastAPI", "GraphQL", "Prisma", "SQLite", "PostgreSQL", "Thrift"] },
  { title: "Infrastructure & delivery", items: ["Git / GitHub", "Docker", "AWS", "CI/CD", "Kubernetes", "Testing", "Splunk", "WebSockets"] },
  { title: "Robotics & AI", items: ["ESP32", "YOLOv8", "MediaPipe", "Computer vision", "ArUco localization", "Bluetooth communication", "Agent orchestration"] },
];

const coursework = [
  { title: "Computer Science & Systems", items: ["Data Structures & Algorithms I", "Data Structures & Algorithms II", "Operating Systems", "Systems Software", "Computer Logic & Organization", "Object-Oriented Programming", "Processes for Object-Oriented Software Development", "Security in Computing"] },
  { title: "AI / Machine Learning / Math", items: ["Artificial Intelligence", "Algorithms for Machine Learning", "Matrix & Linear Algebra", "Calculus III", "Calculus II", "Discrete Structures"] },
];

export default function SkillsPage() {
  return <SiteShell currentPath="/skills"><section className={`${styles.section} ${styles.skills}`} aria-labelledby="skills-title">
    <div className={styles.sectionHeading}><div><p className={styles.label}>My toolkit</p><h1 id="skills-title" className={styles.pageTitle}>Skills</h1></div><p>Tools I’ve used across my work and projects.</p></div>
    <SkillBubbles groups={groups} />
    <section className={styles.section} aria-labelledby="coursework-title">
      <div className={styles.sectionHeading}><div><p className={styles.label}>Academic foundation</p><h2 id="coursework-title">Relevant coursework</h2></div></div>
      <SkillBubbles groups={coursework} itemLabel="courses" />
    </section>
  </section></SiteShell>;
}
