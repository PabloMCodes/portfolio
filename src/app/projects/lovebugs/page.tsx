import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import { LovebugsArchitecture } from "@/components/lovebugs-architecture";
import { ProjectVideo } from "@/components/project-video";
import styles from "../../home.module.css";
import projectStyles from "../projects.module.css";
import detail from "./lovebugs.module.css";

export const metadata: Metadata = { title: "Lovebugs | Pablo Mendoza", description: "A collaborative multi-agent robotics system built at ShellHacks. Watch the demo and explore the build." };

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
              <h3>A multi-agent robotics system</h3>
              <p>A collaborative build connecting AI coordination, a shared simulation, and two custom physical robots.</p>
              <div className={detail.contribution}>
                <h3>My contribution</h3>
                <p>I focused on AI agent orchestration, embedded firmware, and integrating high-level agent decisions with robot control.</p>
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
          <LovebugsArchitecture />
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
