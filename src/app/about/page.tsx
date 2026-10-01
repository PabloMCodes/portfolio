import Image from "next/image";
import { PixelPablo } from "@/components/pixel-pablo";
import { SiteShell } from "@/components/site-shell";
import styles from "../home.module.css";

export default function AboutPage() {
  return <SiteShell currentPath="/about"><section className={styles.hero} aria-labelledby="intro-title">
    <div className={styles.heroLabel}><span className={styles.label}>About me</span><span className={styles.label}>Computer science · UCF</span></div>
    <div className={styles.heroLayout}>
      <div className={styles.heroLead}><div className={styles.heroTitleRow}>
        <h1 id="intro-title" className={styles.heroTitle}>Hi, I’m Pablo<span>.</span></h1>
      </div><div className={styles.heroBottom}>
        <p className={styles.introCopy}>Computer Science student at UCF and a software engineer interested in building intelligent, complex systems. From production software at Credit Karma and engineering tools at NASA to autonomous robots, I like connecting the pieces and making them work reliably.</p>
      </div></div>
      <div className={styles.heroActions}>
        <PixelPablo />
        <a href="/images/Pablo_Mendoza_Resume.pdf" className={styles.quietLink} target="_blank" rel="noreferrer">View résumé <span aria-hidden="true">↗</span></a>
      </div>
      <figure className={styles.portrait}>
        <Image src="/images/pablo-portrait.png" alt="Pablo standing in front of a large cylindrical spacecraft structure." width={488} height={719} sizes="(max-width: 600px) 144px, (max-width: 900px) 240px, 320px" preload />
        <figcaption><span>Behind the code</span><span>Pablo Mendoza</span></figcaption>
      </figure>
    </div>
    <details className={styles.aboutDetails}>
      <summary>More about me <span aria-hidden="true">+</span></summary>
      <div className={styles.aboutStory}>
        <p>I&apos;ve worked on production software at Credit Karma and built full-stack engineering tools at NASA Kennedy Space Center, with experience spanning backend services, APIs, distributed workflows, frontend applications, and AI-assisted systems. I’m especially interested in backend and infrastructure engineering, AI/ML, and software that has to operate reliably beyond a simple demo.</p>
        <p>Outside of work, I like pushing software into the physical world. Most recently, that meant building an autonomous multi-robot system from the ground up — connecting AI agents and computer vision to navigation software, embedded firmware, and physical robots.</p>
        <p>I enjoy understanding systems deeply: tracing how data moves between services, figuring out why something fails, and working across abstractions when the problem demands it. Whether that means debugging an API or tracking down why a motor is interfering with a microcontroller, I like getting to the root of the problem and building a better solution.</p>
      </div>
    </details>
    <div className={styles.heroFootnote}><span>Computer Science / University of Central Florida</span><span>Expected graduation — Aug 2027</span></div>
  </section></SiteShell>;
}
