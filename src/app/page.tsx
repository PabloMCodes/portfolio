import Image from "next/image";
import { Container } from "@/components/container";
import { ThemeToggle } from "@/components/theme-toggle";
import styles from "./home.module.css";

// Small navigation stays visible and usable without a mobile-menu script.
function Header() {
  return (
    <header className={styles.header}>
      <a href="#top" className={styles.wordmark} aria-label="Pablo Mendoza, home">
        pablo mendoza<span aria-hidden="true">.</span>
      </a>
      <nav aria-label="Main navigation" className={styles.navigation}>
        <a href="#about">About</a>
        <a href="#experience">Experience</a>
        <a href="#projects">Projects</a>
        <a href="#skills">Skills</a>
      </nav>
      <ThemeToggle />
    </header>
  );
}

// A personal introduction opens the page with confirmed background and a portrait.
function About() {
  return (
    <section id="about" className={styles.hero} aria-labelledby="intro-title">
      <div className={styles.heroLabel}>
        <span className={styles.label}>01 / About me</span>
        <span className={styles.label}>Computer science · UCF</span>
      </div>
      <div className={styles.heroLayout}>
        <div>
          <h1 id="intro-title" className={styles.heroTitle}>
            Hi, I’m Pablo<span>.</span>
          </h1>
          <div className={styles.heroBottom}>
            <p className={styles.introCopy}>
              I’m a Computer Science student at the University of Central Florida.
              My work brings together software, AI, and robotics—from web
              applications to robots that move through the real world.
            </p>
            <p className={styles.introCopy}>
              I’ve spent summers building software at NASA and Credit Karma,
              and a hackathon connecting hardware, code, and a robot named WALL-Y.
              This is a little of what I’ve been working on.
            </p>
            <a href="#projects" className={styles.textLink}>
              See my projects <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
        {/* Preserve the full portrait and reserve its space while it loads. */}
        <figure className={styles.portrait}>
          <Image
            src="/images/pablo-portrait.png"
            alt="Pablo standing in front of a large cylindrical spacecraft structure."
            width={488}
            height={719}
            sizes="(max-width: 600px) 78vw, (max-width: 900px) 240px, 320px"
            preload
          />
          <figcaption><span>Behind the code</span><span>Pablo Mendoza</span></figcaption>
        </figure>
      </div>
      <div className={styles.heroFootnote}>
        <span>Computer Science / University of Central Florida</span>
        <span>Expected graduation — Dec 2027</span>
      </div>
    </section>
  );
}

// A conceptual sketch explains the fleet pipeline; it is not live telemetry.
function FleetSketch() {
  return (
    <figure className={styles.sketch}>
      <div className={styles.sketchHeading}>
        <span>01 / Fleet architecture</span>
        <span>Concept sketch</span>
      </div>
      <svg viewBox="0 0 560 310" role="img" aria-labelledby="fleet-title fleet-desc">
        <title id="fleet-title">From perception to physical movement</title>
        <desc id="fleet-desc">
          A conceptual view of an overhead camera feeding centralized planning,
          which coordinates robots through Bluetooth. One robot is named WALL-Y.
        </desc>
        <g fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="190" y="20" width="180" height="48" rx="4" />
          <path d="M280 68v38" />
          <rect x="170" y="106" width="220" height="56" rx="4" />
          <path d="M280 162v54M100 238v-22h360v22M280 216v22" />
          <rect x="49" y="238" width="102" height="46" rx="4" />
          <rect x="229" y="238" width="102" height="46" rx="4" />
          <rect x="409" y="238" width="102" height="46" rx="4" />
          <circle cx="280" cy="216" r="4" fill="currentColor" />
        </g>
        <g fill="currentColor" textAnchor="middle" fontSize="12">
          <text x="280" y="49">OVERHEAD CAMERA</text>
          <text x="280" y="139">CENTRALIZED PLANNING</text>
          <text x="365" y="192" fontSize="10">BLUETOOTH</text>
          <text x="100" y="266">ROBOT</text>
          <text x="280" y="266">WALL-Y</text>
          <text x="460" y="266">ROBOT</text>
        </g>
      </svg>
      <figcaption>Perceive. Plan. Coordinate. Move.</figcaption>
    </figure>
  );
}

// Hackathon projects stay separate from professional experience.
function Projects() {
  return (
    <section id="projects" className={styles.section} aria-labelledby="projects-title">
      <div className={styles.sectionHeading}>
        <div>
          <p className={styles.label}>03 / Things I’ve built</p>
          <h2 id="projects-title">Projects</h2>
        </div>
      </div>

      <article className={styles.featuredProject}>
        <div className={styles.featuredCopy}>
          <p className={styles.label}>ShellHacks 2026 / Robotics</p>
          <h3>Autonomous<br />Multi-Robot Fleet</h3>
          <p>
            Physical robots, overhead vision, and centralized planning. My work
            connected firmware, hardware, communication, autonomous navigation,
            and agent orchestration into a working system.
          </p>
          <ul className={styles.tags} aria-label="Fleet technologies">
            <li>ESP32</li><li>Computer vision</li><li>Agent orchestration</li>
          </ul>
        </div>
        <FleetSketch />
      </article>
      <div className={styles.fieldNote}>
        <span className={styles.label}>Meet WALL-Y</span>
        <p>
          One of our robots was named WALL-Y. Getting the fleet running took
          more than code: motor noise was disconnecting the ESP32s. Investigating
          power behavior, adding suppression capacitors, and improving power
          handling helped us get reliable operation.
        </p>
      </div>
    </section>
  );
}

// Only confirmed internships appear in the work experience section.
function WorkExperience() {
  return (
    <section id="experience" className={styles.section} aria-labelledby="experience-title">
      <div className={styles.sectionHeading}>
        <div>
          <p className={styles.label}>02 / Where I’ve worked</p>
          <h2 id="experience-title">Work experience</h2>
        </div>
      </div>
      <div className={styles.projectGrid}>
        <article className={`${styles.project} ${styles.nasaProject}`}>
          {/* The photo adds personal context without implying a mission role. */}
          <figure className={styles.nasaPhoto}>
            <Image
              src="/images/nasa-group.png"
              alt="Pablo posing with three people in blue flight suits in front of a NASA backdrop."
              width={1936}
              height={1458}
              sizes="(max-width: 900px) 92vw, (max-width: 1440px) 46vw, 640px"
            />
            <figcaption>A moment beyond the code / NASA</figcaption>
          </figure>
          <div className={styles.projectCopy}>
            <p className={styles.label}>Summer 2026</p>
            <h3>NASA Kennedy Space Center</h3>
            <p className={styles.role}>Software Engineering Intern</p>
            <p>
              Built an internal full-stack platform supporting payload and science
              experiment processing analysis during my summer 2026 internship.
            </p>
            <ul className={styles.tags} aria-label="NASA technologies">
              <li>Python / FastAPI</li><li>React</li><li>Background workers</li>
            </ul>
          </div>
        </article>
        <article className={`${styles.project} ${styles.productionProject}`}>
          <div>
            <p className={styles.label}>Summer 2025</p>
            <h3>Credit Karma / Intuit</h3>
            <p className={styles.role}>Software Engineering Intern · User Management</p>
          </div>
          <div className={styles.projectCopy}>
            <p>
              Software engineering experience on the User Management team,
              spanning frontend development, service infrastructure, and testing.
            </p>
            <ul className={styles.tags} aria-label="Credit Karma technologies">
              <li>React / TypeScript</li><li>GraphQL</li><li>Scala</li>
            </ul>
          </div>
        </article>
      </div>
    </section>
  );
}

// Skills reflect tools used in the documented internships and robotics project.
function Skills() {
  const groups = [
    { title: "Languages", items: ["TypeScript", "Python", "Scala"] },
    { title: "Web & backend", items: ["React", "FastAPI", "GraphQL", "SQLite", "Thrift"] },
    { title: "Infrastructure & delivery", items: ["Docker", "AWS", "CI/CD", "Testing", "Splunk"] },
    { title: "Robotics & AI", items: ["ESP32", "Bluetooth communication", "Computer vision", "ArUco localization", "Agent orchestration"] },
  ];

  return (
    <section id="skills" className={`${styles.section} ${styles.skills}`} aria-labelledby="skills-title">
      <div className={styles.sectionHeading}>
        <div>
          <p className={styles.label}>04 / My toolkit</p>
          <h2 id="skills-title">Skills</h2>
        </div>
        <p>Tools I’ve used across my work and projects.</p>
      </div>
      <div className={styles.skillGrid}>
        {groups.map(({ title, items }) => (
          <div key={title} className={styles.skillGroup}>
            <h3>{title}</h3>
            <ul>
              {items.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

// Keep the page composition visible here; each feature remains a server component.
export default function Home() {
  return (
    <Container id="top" className={styles.home}>
      <a href="#main" className={styles.skipLink}>Skip to content</a>
      <Header />
      <main id="main" tabIndex={-1}>
        <About />
        <WorkExperience />
        <Projects />
        <Skills />
      </main>
      {/* A small closing row provides a real destination and a way back up. */}
      <footer className={styles.footer}>
        <p>Pablo Mendoza <span>/ Engineering portfolio</span></p>
        <a href="https://github.com/PabloMCodes" className={styles.textLink}>Find me on GitHub <span aria-hidden="true">↗</span></a>
        <a href="#top">Back to top <span aria-hidden="true">↑</span></a>
      </footer>
    </Container>
  );
}
