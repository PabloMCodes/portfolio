import { Container } from "@/components/container";
import { ThemeToggle } from "@/components/theme-toggle";
import styles from "@/app/home.module.css";

const navigation = [
  ["/about", "About"], ["/experience", "Experience"],
  ["/projects", "Projects"], ["/skills", "Skills"],
];

export function SiteShell({ children, currentPath }: { children: React.ReactNode; currentPath: string }) {
  return (
    <Container id="top" className={styles.home}>
      <a href="#main" className={styles.skipLink}>Skip to content</a>
      <header className={styles.header}>
        <a href="/about" className={styles.wordmark} aria-label="Pablo Mendoza, about">pablo mendoza<span aria-hidden="true">.</span></a>
        <nav aria-label="Main navigation" className={styles.navigation}>
          {navigation.map(([href, label]) => <a key={href} href={href} aria-current={href === currentPath ? "page" : undefined}>{label}</a>)}
        </nav>
        <ThemeToggle />
      </header>
      <main id="main" tabIndex={-1}>{children}</main>
      <footer className={styles.footer}>
        <p>Pablo Mendoza <span>/ Engineering portfolio</span></p>
        <div className={styles.footerLinks}>
          <a href="mailto:pablocmendozab@gmail.com">Email</a>
          <a href="https://www.linkedin.com/in/pablo-c-mendoza" target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
          <a href="https://github.com/PabloMCodes" target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
          <a href="/images/Pablo_Mendoza_Resume.pdf" target="_blank" rel="noreferrer">Résumé <span aria-hidden="true">↗</span></a>
        </div>
        <a href="#top">Back to top <span aria-hidden="true">↑</span></a>
      </footer>
    </Container>
  );
}
