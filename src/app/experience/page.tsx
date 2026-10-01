import { CreditKarmaExperience } from "@/components/credit-karma-experience";
import { NasaExperience } from "@/components/nasa-experience";
import { SiteShell } from "@/components/site-shell";
import styles from "../home.module.css";

export default function ExperiencePage() {
  return <SiteShell currentPath="/experience"><section className={styles.section} aria-labelledby="experience-title">
    <div className={styles.sectionHeading}><div><p className={styles.label}>Where I’ve worked</p><h1 id="experience-title" className={styles.pageTitle}>Work experience</h1></div></div>
    <div className={styles.projectGrid}>
      <NasaExperience />
      <CreditKarmaExperience />
    </div>
  </section></SiteShell>;
}
