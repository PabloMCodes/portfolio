import Image from "next/image";
import { PixelPablo } from "@/components/pixel-pablo";
import { SiteShell } from "@/components/site-shell";
import styles from "../home.module.css";

export default function AboutPage() {
  return <SiteShell currentPath="/about"><section className={styles.hero} aria-labelledby="intro-title">
    <div className={styles.heroLabel}><span className={styles.label}>About me</span><span className={styles.label}>Computer science · UCF</span></div>
    <div className={styles.heroLayout}>
      <div><div className={styles.heroTitleRow}>
        <h1 id="intro-title" className={styles.heroTitle}>Hi, I’m Pablo<span>.</span></h1>
        <PixelPablo />
      </div><div className={styles.heroBottom}>
        <p className={styles.introCopy}>I’m a Computer Science student at the University of Central Florida. My work brings together software, AI, and robotics—from web applications to robots that move through the real world.</p>
        <p className={styles.introCopy}>I’ve spent summers building software at NASA and Credit Karma, and a hackathon connecting hardware, code, and a robot named WALL-Y. This is a little of what I’ve been working on.</p>
        <a href="/projects" className={styles.textLink}>See my projects <span aria-hidden="true">→</span></a>
        <a href="/images/Pablo_Mendoza_Resume.pdf" className={styles.quietLink} target="_blank" rel="noreferrer">View résumé <span aria-hidden="true">↗</span></a>
      </div></div>
      <figure className={styles.portrait}>
        <Image src="/images/pablo-portrait.png" alt="Pablo standing in front of a large cylindrical spacecraft structure." width={488} height={719} sizes="(max-width: 600px) 78vw, (max-width: 900px) 240px, 320px" preload />
        <figcaption><span>Behind the code</span><span>Pablo Mendoza</span></figcaption>
      </figure>
    </div>
    <div className={styles.heroFootnote}><span>Computer Science / University of Central Florida</span><span>Expected graduation — Aug 2027</span></div>
  </section></SiteShell>;
}
