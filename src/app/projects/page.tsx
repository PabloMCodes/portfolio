import { ProjectCard } from "@/components/hover-highlights";
import Link from "next/link";
import { ProjectVideo } from "@/components/project-video";
import projectStyles from "./projects.module.css";
import Image from "next/image";
import { SiteShell } from "@/components/site-shell";
import styles from "../home.module.css";

export default function ProjectsPage() {
  return <SiteShell currentPath="/projects"><section className={styles.section} aria-labelledby="projects-title">
    <div className={styles.sectionHeading}><div><p className={styles.label}>Things I’ve built</p><h1 id="projects-title" className={styles.pageTitle}>Projects</h1></div></div>
    <p className={projectStyles.intro}>Software, hardware, and the experiments that bring them together. Take a closer look at what I’ve been building.</p>
    <div className={projectStyles.grid}>
      <ProjectCard className={`${styles.projectCard} ${projectStyles.card}`}>
        <ProjectVideo preview />
        <div><p className={styles.label}>ShellHacks 2026 / Robotics</p><h3><Link href="/projects/lovebugs">Lovebugs</Link></h3><p>An autonomous multi-robot fleet connecting overhead vision, centralized planning, and physical robots.</p></div>
        <ul className={styles.tags} aria-label="Lovebugs technologies"><li>ESP32</li><li>Computer vision</li><li>Agent orchestration</li></ul>
        <Link href="/projects/lovebugs" className={projectStyles.cardLink}>Explore the build <span aria-hidden="true">↗</span></Link>
      </ProjectCard>
      <ProjectCard className={`${styles.projectCard} ${projectStyles.card}`}><div><p className={styles.label}>AI productivity / Full stack</p><h3>LockedIn</h3><p>A focus platform that uses computer vision to recognize distractions during work sessions, then turns that activity into useful session insights and social leaderboards.</p></div>
        <figure className={`${styles.projectPhoto} ${styles.productScreenshot}`}>
          <a href="/images/lockedIn.png" target="_blank" rel="noreferrer" aria-label="Open the full LockedIn dashboard screenshot in a new tab"><Image src="/images/lockedIn.png" alt="LockedIn dashboard showing live phone-distraction detection, focus metrics, and a camera preview." width={2880} height={1610} sizes="(max-width: 600px) 85vw, 42vw" /></a>
          <figcaption>Live distraction tracking / Open image for a closer look ↗</figcaption>
        </figure>
        <ul className={styles.detailList}><li>Built a Python inference pipeline and real-time WebSocket updates.</li><li>Designed the Next.js dashboard, authentication, and analytics experience.</li></ul><ul className={styles.tags} aria-label="LockedIn technologies"><li>Next.js</li><li>FastAPI</li><li>YOLOv8</li><li>MediaPipe</li><li>Prisma</li><li>NextAuth</li></ul></ProjectCard>
      <ProjectCard className={`${styles.projectCard} ${projectStyles.card}`}><div><p className={styles.label}>Mobile / Team project</p><h3>StudySpot</h3><p>A study-location app with interactive maps, location-aware check-ins, and live availability scoring, built and tested with a four-person team.</p></div>
        <div className={styles.studySpotGallery}>
          <figure className={styles.projectPhoto}>
            <a href="/images/StudySpotSc.png" target="_blank" rel="noreferrer" aria-label="Open the full StudySpot app screenshot in a new tab"><Image src="/images/StudySpotSc.png" alt="StudySpot mobile app showing nearby study locations on a map, search filters, and a check-in prompt." width={824} height={1798} sizes="(max-width: 600px) 32vw, 17vw" /></a>
            <figcaption>Finding a nearby spot / App view ↗</figcaption>
          </figure>
          <figure className={styles.projectPhoto}>
            <a href="/images/StudySpotGroupPhoto.JPG" target="_blank" rel="noreferrer" aria-label="Open the full StudySpot team photo in a new tab"><Image src="/images/StudySpotGroupPhoto.JPG" alt="The four-person StudySpot team holding project posters in front of a UCF College of Engineering and Computer Science backdrop." width={2160} height={2880} sizes="(max-width: 600px) 48vw, 25vw" /></a>
            <figcaption>The team behind StudySpot ↗</figcaption>
          </figure>
        </div>
        <ul className={styles.detailList}><li>Led the team through three months of product development.</li><li>Expanded location coverage with deduplicated Google Places searches.</li><li>Distributed internal builds through Apple TestFlight for feedback.</li></ul><ul className={styles.tags} aria-label="StudySpot technologies"><li>React Native</li><li>FastAPI</li><li>PostgreSQL</li><li>Google Places API</li></ul></ProjectCard>
    </div>
  </section></SiteShell>;
}
