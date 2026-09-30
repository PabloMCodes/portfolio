import Image from "next/image";
import { NasaExperience } from "@/components/nasa-experience";
import { SiteShell } from "@/components/site-shell";
import styles from "../home.module.css";

export default function ExperiencePage() {
  return <SiteShell currentPath="/experience"><section className={styles.section} aria-labelledby="experience-title">
    <div className={styles.sectionHeading}><div><p className={styles.label}>Where I’ve worked</p><h1 id="experience-title" className={styles.pageTitle}>Work experience</h1></div></div>
    <div className={styles.projectGrid}>
      <NasaExperience />
      <article className={`${styles.project} ${styles.productionProject}`}>
        <figure className={styles.creditPhoto}><Image src="/images/credit-karma-team.png" alt="Pablo with the Credit Karma internship cohort in front of a colorful Credit Karma mural." width={1628} height={1098} sizes="(max-width: 900px) 92vw, (max-width: 1440px) 46vw, 640px" /><figcaption>Summer with the team / Credit Karma</figcaption></figure>
        <div className={styles.projectCopy}>
          <p className={styles.label}>Summer 2025</p><h3>Credit Karma / Intuit</h3><p className={styles.role}>Software Engineering Intern · User Management</p>
          <p>Software engineering experience on the User Management team, spanning frontend development, service infrastructure, and testing.</p>
          <ul className={styles.detailList}><li>Shipped security-settings upgrades for a platform serving more than 120 million users.</li><li>Migrated authentication functionality from a legacy monorepo into Scala microservices.</li><li>Added schema validation, unit and integration coverage, and monitored staged Kubernetes rollouts.</li></ul>
          <ul className={styles.tags} aria-label="Credit Karma technologies"><li>React / TypeScript</li><li>Vite</li><li>GraphQL</li><li>Scala</li></ul>
        </div>
      </article>
    </div>
  </section></SiteShell>;
}
