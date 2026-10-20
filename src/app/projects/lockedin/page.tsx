import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import { LockedInArchitecture } from "@/components/lockedin-architecture";
import { ProjectVideo } from "@/components/project-video";
import styles from "../../home.module.css";
import projectStyles from "../projects.module.css";
import detail from "../project-detail.module.css";

export const metadata: Metadata = {
  title: "LockedIn | Pablo Mendoza",
  description: "A computer vision focus platform with real-time distraction tracking, session insights, and social leaderboards.",
};

export default function LockedInPage() {
  return (
    <SiteShell currentPath="/projects">
      <article className={`${styles.section} ${detail.page}`} aria-labelledby="lockedin-title">
        <header className={detail.intro}>
          <Link href="/projects" className={projectStyles.backLink}>← All projects</Link>
          <p className={`${styles.label} ${detail.eyebrow}`}>ShellHacks 2025 / 36-hour hackathon</p>
          <h1 id="lockedin-title" className={styles.pageTitle}>LockedIn<span className={projectStyles.accent}>.</span></h1>
          <p className={detail.tagline}>Computer vision for more focused work.</p>
          <p className={detail.summary}>Real-time distraction tracking and useful session insights.</p>
        </header>
        <div className={projectStyles.detailMedia}>
          <ProjectVideo project="lockedin" />
          <div className={detail.videoCaption}><span>LockedIn / Project trailer</span><a href="#build">Explore the build ↓</a></div>
        </div>
        <section id="build" className={detail.storySection} aria-labelledby="build-title">
          <div className={detail.sectionHeading}><span aria-hidden="true">01 /</span><h2 id="build-title">The build</h2></div>
          <div className={detail.buildGrid}>
            <div className={detail.buildCopy}>
              <h3>A computer vision focus platform</h3>
              <p>Built in 36 hours at ShellHacks 2025 with Fernando, Tristan, and Gerrard. Our team connected webcam-based distraction detection with real-time feedback, session analytics, and social accountability.</p>
              <div className={detail.contribution}>
                <h3>My contribution</h3>
                <p>I contributed across the stack, helping integrate computer vision, backend services, and the dashboard into a working hackathon prototype.</p><ul className={styles.detailList}><li>Implemented WebSocket communication and integrated FastAPI endpoints for live updates.</li><li>Developed backend distraction analytics and activity metrics.</li><li>Worked on the React/Next.js dashboard and live focus visualizations.</li></ul>
              </div>
              <ul className={styles.tags} aria-label="LockedIn technologies"><li>Next.js</li><li>FastAPI</li><li>YOLOv8</li><li>MediaPipe</li><li>TensorFlow.js</li><li>WebSockets</li></ul>
            </div>
            <div className="grid gap-6">
              <figure className={detail.photo}>
                <a href="/images/lockedIn.png" target="_blank" rel="noreferrer" aria-label="Open the full LockedIn dashboard screenshot in a new tab">
                  <Image src="/images/lockedIn.png" alt="LockedIn dashboard showing live phone-distraction detection, focus metrics, and a camera preview." width={2880} height={1610} sizes="(max-width: 760px) 92vw, 480px" />
                </a>
                <figcaption>Live distraction tracking / Open image for a closer look ↗</figcaption>
              </figure>
              <figure className={detail.photo}>
                <a href="/images/shellhacks2025-group.jpg" target="_blank" rel="noreferrer" aria-label="Open the full ShellHacks 2025 team photo in a new tab">
                  <Image src="/images/shellhacks2025-group.jpg" alt="The four-person LockedIn team posing in front of a ShellHacks backdrop surrounded by ocean-themed decorations and blue balloons." width={1600} height={1200} sizes="(max-width: 760px) 92vw, 480px" />
                </a>
                <figcaption>The team behind LockedIn / ShellHacks 2025 ↗</figcaption>
              </figure>
            </div>
          </div>
        </section>
        <section className={detail.storySection} aria-labelledby="architecture-title">
          <div className={detail.sectionHeading}><span aria-hidden="true">02 /</span><h2 id="architecture-title">From detection to feedback</h2></div>
          <LockedInArchitecture />
        </section>
      </article>
    </SiteShell>
  );
}
