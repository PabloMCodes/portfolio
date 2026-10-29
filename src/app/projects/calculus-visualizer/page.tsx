import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import { ProjectVideo } from "@/components/project-video";
import styles from "../../home.module.css";
import projectStyles from "../projects.module.css";
import detail from "../project-detail.module.css";

export const metadata: Metadata = {
  title: "Calculus Visualizer | Pablo Mendoza",
  description: "An educational Calculus I web app with interactive graphs, Google Gemini explanations, and Python, NumPy, and Plotly limit visualizations developed by Pablo Mendoza.",
};

export default function CalculusVisualizerPage() {
  return (
    <SiteShell currentPath="/projects">
      <article className={`${styles.section} ${detail.page}`} aria-labelledby="calculus-title">
        <header className={detail.intro}>
          <Link href="/projects" className={projectStyles.backLink}>← All projects</Link>
          <p className={`${styles.label} ${detail.eyebrow}`}>Education / Interactive mathematics</p>
          <h1 id="calculus-title" className={styles.pageTitle}>Calculus Visualizer<span className={projectStyles.accent}>.</span></h1>
          <p className={detail.tagline}>Making Calculus I concepts visible and interactive.</p>
          <p className={detail.summary}>Explore limits, derivatives, and integrals through interactive graphs and AI-powered explanations.</p>
        </header>
        <div className={projectStyles.detailMedia}>
          <ProjectVideo project="calculus-visualizer" />
          <div className={detail.videoCaption}><span>Calculus Visualizer / Application demo</span><a href="#build">Explore the build ↓</a></div>
        </div>
        <section id="build" className={detail.storySection} aria-labelledby="build-title">
          <div className={detail.sectionHeading}><span aria-hidden="true">01 /</span><h2 id="build-title">The build</h2></div>
          <div className={detail.buildGrid}>
            <div className={detail.buildCopy}>
              <h3>Learn by exploring the graphs</h3>
              <p>Our team of six developers built an educational web application to help students understand Calculus I through interactive mathematical graphs and visual explanations.</p>
              <p>Students can explore limits, derivatives, and integrals, including interactive limits visualizations and customizable integration graphs. Google Gemini provides step-by-step explanations of mathematical concepts, functions, and graphs to support that exploration.</p>
              <ul className={styles.tags} aria-label="Calculus Visualizer technologies"><li>Python</li><li>NumPy</li><li>Plotly</li><li>JavaScript</li><li>TypeScript</li><li>React</li><li>Google Gemini</li></ul>
            </div>
            <div className={detail.buildCopy}>
              <h3>My contribution</h3>
              <p>My primary focus was developing Python scripts with NumPy and Plotly to generate interactive limit graphs and integrate them into the frontend.</p>
              <ul className={styles.detailList}>
                <li>Developed the Python scripts behind the interactive limit visualizations.</li>
                <li>Integrated the graphs into the frontend and contributed to frontend development and graph functionality.</li>
                <li>Collaborated with five other developers using GitHub and helped deploy the application.</li>
              </ul>
            </div>
          </div>
        </section>
        <section className={detail.storySection} aria-labelledby="expo-title">
          <div className={detail.sectionHeading}><span aria-hidden="true">02 /</span><h2 id="expo-title">Sharing it at Knight Hacks Expo</h2></div>
          <div className={detail.buildGrid}>
            <div className={detail.buildCopy}>
              <p>I presented the application at the Knight Hacks Expo, where attendees could try it and explore the interactive mathematics functionality firsthand.</p>
            </div>
            <figure className={detail.photo}>
              <a href="/images/calcvisualizerdemo.jpg" target="_blank" rel="noreferrer" aria-label="Open the full Calculus Visualizer demo photo in a new tab">
                <Image src="/images/calcvisualizerdemo.jpg" alt="A group gathered around two monitors showing the Calculus Visualizer logo and an interactive mathematical graph during a live demonstration." width={1156} height={750} sizes="(max-width: 760px) 92vw, 480px" />
              </a>
              <figcaption>Calculus Visualizer / Live demonstration ↗</figcaption>
            </figure>
          </div>
        </section>
      </article>
    </SiteShell>
  );
}
