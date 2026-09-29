import { Container } from "@/components/container";
import styles from "./home.module.css";

// Small navigation stays visible and usable without a mobile-menu script.
function Header() {
  return (
    <header className={styles.header}>
      <a href="#top" className={styles.wordmark} aria-label="Pablo Mendoza, home">
        pablo mendoza<span aria-hidden="true">.</span>
      </a>
      <nav aria-label="Main navigation" className={styles.navigation}>
        <a href="#work">Work</a>
        <a href="#about">About</a>
        <a href="https://github.com/PabloMCodes">GitHub <span aria-hidden="true">↗</span></a>
      </nav>
    </header>
  );
}

// The opening sets the engineering theme and points directly to selected work.
function Introduction() {
  return (
    <section className={styles.hero} aria-labelledby="intro-title">
      <div className={styles.heroLabel}>
        <span className={styles.label}>Software · Intelligence · Physical systems</span>
        <span className={styles.label}>Portfolio / 01</span>
      </div>
      <h1 id="intro-title" className={styles.heroTitle}>
        Intelligent systems.<br />
        <span>Real-world impact.</span>
      </h1>
      <div className={styles.heroBottom}>
        <p className={styles.introCopy}>
          I’m Pablo, a computer science student and engineer building across
          software, AI, and robotics. I build intelligent systems that interact
          with the real world.
        </p>
        <a href="#work" className={styles.textLink}>
          Explore my work <span aria-hidden="true">↓</span>
        </a>
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

// Public summaries introduce the work without implying case-study pages exist.
function SelectedWork() {
  return (
    <section id="work" className={styles.section} aria-labelledby="work-title">
      <div className={styles.sectionHeading}>
        <div>
          <p className={styles.label}>01 / Selected work</p>
          <h2 id="work-title">From code to consequence.</h2>
        </div>
        <p>Three perspectives on engineering:<br />physical systems, science, and production software.</p>
      </div>

      <article className={styles.featuredProject}>
        <div className={styles.featuredCopy}>
          <p className={styles.label}>ShellHacks 2026 / Robotics</p>
          <h3>One fleet.<br />Many moving parts.</h3>
          <p className={styles.projectName}>Autonomous Multi-Robot Fleet</p>
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

      <div className={styles.projectGrid}>
        <article className={styles.project}>
          <p className={styles.label}>02 / NASA Kennedy Space Center</p>
          <h3>Software supporting science.</h3>
          <p>
            Built an internal full-stack platform supporting payload and science
            experiment processing analysis during my summer 2026 internship.
          </p>
          <ul className={styles.tags} aria-label="NASA technologies">
            <li>Python / FastAPI</li><li>React</li><li>Background workers</li>
          </ul>
          <p className={styles.projectNote}>Software Engineering Intern · Summer 2026</p>
        </article>
        <article className={styles.project}>
          <p className={styles.label}>03 / Credit Karma · Intuit</p>
          <h3>Engineering in production.</h3>
          <p>
            Software engineering experience on the User Management team,
            spanning frontend development, service infrastructure, and testing.
          </p>
          <ul className={styles.tags} aria-label="Credit Karma technologies">
            <li>React / TypeScript</li><li>GraphQL</li><li>Scala</li>
          </ul>
          <p className={styles.projectNote}>Software Engineering Intern · Summer 2025</p>
        </article>
      </div>
    </section>
  );
}

// A concise background section gives context without a separate About page.
function About() {
  return (
    <section id="about" className={`${styles.section} ${styles.about}`} aria-labelledby="about-title">
      <div>
        <p className={styles.label}>02 / A little context</p>
        <h2 id="about-title">Across the stack.<br />Beyond the screen.</h2>
      </div>
      <div className={styles.aboutCopy}>
        <p>
          My work spans software, AI, embedded systems, and the hardware they
          connect to. I’m studying Computer Science at the University of Central
          Florida, with an expected graduation in December 2027.
        </p>
        <p>
          Alongside NASA and Credit Karma, my experience includes Motorola
          Solutions and Limbitless Solutions—adding physical engineering and
          product experience to my software background.
        </p>
        <div className={styles.fieldNote}>
          <span className={styles.label}>A lesson from the work</span>
          <p>
            Sometimes a software disconnect starts at a motor. On our robot
            fleet, investigating electrical noise and power behavior led to
            suppression capacitors, improved power handling, and reliable operation.
          </p>
        </div>
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
        <Introduction />
        <SelectedWork />
        <About />
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
