import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import { ProjectVideo } from "@/components/project-video";
import styles from "../../home.module.css";
import projectStyles from "../projects.module.css";
import detail from "./lovebugs.module.css";

export const metadata: Metadata = { title: "Lovebugs | Pablo Mendoza", description: "An autonomous multi-robot fleet built at ShellHacks. Watch the demo and explore the build." };

function FleetSketch() {
  return <figure className={detail.sketch}>
    <div className={detail.sketchHeading}><span>Fleet architecture</span><span>Concept sketch</span></div>
    <svg viewBox="0 0 560 310" role="img" aria-labelledby="fleet-title fleet-desc">
      <title id="fleet-title">From perception to physical movement</title><desc id="fleet-desc">A conceptual view of an overhead camera feeding centralized planning, which coordinates robots through Bluetooth.</desc>
      <g fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="190" y="20" width="180" height="48" rx="4" /><path d="M280 68v38" /><rect x="170" y="106" width="220" height="56" rx="4" /><path d="M280 162v54M100 238v-22h360v22M280 216v22" /><rect x="49" y="238" width="102" height="46" rx="4" /><rect x="229" y="238" width="102" height="46" rx="4" /><rect x="409" y="238" width="102" height="46" rx="4" /><circle cx="280" cy="216" r="4" fill="currentColor" /></g>
      <g fill="currentColor" textAnchor="middle" fontSize="12"><text x="280" y="49">OVERHEAD CAMERA</text><text x="280" y="139">CENTRALIZED PLANNING</text><text x="365" y="192" fontSize="10">BLUETOOTH</text><text x="100" y="266">ROBOT</text><text x="280" y="266">ROBOT</text><text x="460" y="266">ROBOT</text></g>
    </svg><figcaption>Perceive. Plan. Coordinate. Move.</figcaption>
  </figure>;
}

export default function LovebugsPage() {
  return (
    <SiteShell currentPath="/projects">
      <article className={`${styles.section} ${detail.page}`} aria-labelledby="lovebugs-title">
        <header className={detail.intro}>
          <Link href="/projects" className={projectStyles.backLink}>← All projects</Link>
          <p className={`${styles.label} ${detail.eyebrow}`}>ShellHacks 2026 / Robotics</p>
          <h1 id="lovebugs-title" className={styles.pageTitle}>Lovebugs<span className={projectStyles.accent}>.</span></h1>
          <p className={detail.tagline}>Small robots. One coordinated fleet.</p>
          <p className={detail.summary}>From overhead vision to physical movement.</p>
        </header>

        <div className={projectStyles.detailMedia}>
          <ProjectVideo />
          <div className={detail.videoCaption}>
            <span>Lovebugs / Project demo</span>
            <a href="#build">Explore the build ↓</a>
          </div>
        </div>

        <section id="build" className={detail.storySection} aria-labelledby="build-title">
          <div className={detail.sectionHeading}><span aria-hidden="true">01 /</span><h2 id="build-title">The build</h2></div>
          <div className={detail.buildGrid}>
            <div className={detail.buildCopy}>
              <h3>An autonomous multi-robot fleet</h3>
              <p>Physical robots, overhead vision, and centralized planning.</p>
              <div className={detail.contribution}>
                <h3>My contribution</h3>
                <p>My work connected firmware, hardware, communication, autonomous navigation, and agent orchestration into a working system.</p>
              </div>
              <ul className={styles.tags} aria-label="Fleet technologies"><li>ESP32</li><li>Computer vision</li><li>Agent orchestration</li></ul>
            </div>
            <figure className={detail.photo}>
              <Image src="/images/IMG_7843.JPG" alt="Two wheeled robots with hand-drawn faces, exposed electronics, and visual markers on top." width={2048} height={1536} sizes="(max-width: 760px) 92vw, 480px" />
              <figcaption>A little hardware, a lot of personality.</figcaption>
            </figure>
          </div>
        </section>

        <section className={detail.storySection} aria-labelledby="architecture-title">
          <div className={detail.sectionHeading}><span aria-hidden="true">02 /</span><h2 id="architecture-title">How it fits together</h2></div>
          <div className={detail.architectureGrid}>
            <FleetSketch />
            <aside className={detail.fieldNote} aria-labelledby="robots-title">
              <p className={styles.label}>Hardware notes</p>
              <h3 id="robots-title">The robots</h3>
              <p>Getting the fleet running took more than code: motor noise was disconnecting the ESP32s. Investigating power behavior, adding suppression capacitors, and improving power handling helped us get reliable operation.</p>
            </aside>
          </div>
        </section>

        <section className={detail.storySection} aria-labelledby="photos-title">
          <div className={detail.sectionHeading}><span aria-hidden="true">03 /</span><h2 id="photos-title">From the hackathon floor</h2></div>
          <div className={detail.gallery}>
            <figure className={detail.photo}>
              <Image src="/images/IMG_0127.JPG" alt="A robotics demonstration at ShellHacks, with two small robots on the floor and laptops running nearby." width={2048} height={1536} sizes="(max-width: 760px) 92vw, 500px" />
              <figcaption>The fleet in action / ShellHacks</figcaption>
            </figure>
            <figure className={detail.photo}>
              <Image src="/images/IMG_0125.jpg" alt="Four participants posing inside a colorful television frame beside robot cutouts at ShellHacks." width={1206} height={1330} sizes="(max-width: 760px) 92vw, 500px" />
              <figcaption>A moment with the crew / ShellHacks</figcaption>
            </figure>
          </div>
        </section>
      </article>
    </SiteShell>
  );
}
