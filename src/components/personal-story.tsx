import Image from "next/image";
import { StoryChapter, StoryTimeline } from "./story-timeline";
import styles from "./personal-story.module.css";

export function PersonalStory() {
  return <section className={styles.story} aria-labelledby="personal-story-title">
    <header className={styles.header}>
      <p className={styles.eyebrow}>Behind the code</p>
      <h2 id="personal-story-title">More about me<span aria-hidden="true">.</span></h2>
      <p className={styles.intro}>Where I come from, what drives me, and life away from the screen.</p>
    </header>
    <StoryTimeline>
      <StoryChapter id="story-roots">
        <div className={styles.copy}>
          <p className={styles.eyebrow}>01 / My roots</p>
          <h3 id="story-roots">Where it all started</h3>
          <p>I’m a first-generation college student and the son of Mexican immigrant parents. They came to the U.S. without knowing English to give my sisters and me better opportunities.</p>
          <p>My dad has worked in construction for over 25 years. He always reminds me that each generation should go further than the last. He taught me perseverance and hard work; my mom taught me kindness and how to treat others.</p>
        </div>
      </StoryChapter>
      <StoryChapter id="story-work">
        <div className={styles.copy}>
          <p className={styles.eyebrow}>02 / Showing up</p>
          <h3 id="story-work">Learning to show up</h3>
          <p>I’ve worked since I was 15, balancing jobs with school and sports. I started as a recreation attendant, then worked as a restaurant server, lifeguard, and AV technician.</p>
          <p>Across those jobs, coworkers and managers appreciated my positive attitude, work ethic, and communication. Being someone they could count on—and trust to work independently—meant a lot to me.</p>
        </div>
      </StoryChapter>
      <StoryChapter id="story-curiosity">
        <div className={styles.copy}>
          <p className={styles.eyebrow}>03 / Finding my direction</p>
          <h3 id="story-curiosity">From curiosity to code</h3>
          <p>I always wanted to be an engineer. At first, I pictured mechanical engineering, but discovering computer science in high school changed that.</p>
          <p>I started programming outside class simply because I enjoyed it. I still remember the excitement of printing my first message to the console. That small moment made me want to keep going—and pursue software engineering.</p>
        </div>
      </StoryChapter>
      <StoryChapter id="story-engineering">
        <div className={styles.copy}>
          <p className={styles.eyebrow}>04 / Putting it into practice</p>
          <h3 id="story-engineering">Bringing that mindset into engineering</h3>
          <p>At Credit Karma, I contributed to production software serving millions of users. At NASA Kennedy Space Center, I developed engineering tools supporting real operational workflows, and my managers nominated me for a NASA Shining Star Award.</p>
          <p>I’m still exploring backend systems, AI/ML, and robotics. Working on robots brings my interests in software and physical engineering together.</p>
        </div>
        <figure className={styles.photo}>
          <Image src="/images/nasa-group.png" alt="Pablo with three people in blue flight suits in front of a NASA backdrop." width={1936} height={1458} sizes="(max-width: 760px) 85vw, (max-width: 1200px) 40vw, 480px" />
          <figcaption>A moment beyond the code / NASA</figcaption>
        </figure>
      </StoryChapter>
      <StoryChapter id="story-life">
        <div className={styles.copy}>
          <p className={styles.eyebrow}>05 / The everyday things</p>
          <h3 id="story-life">Beyond the keyboard</h3>
          <p>I enjoy cooking and baking banana bread and cookies. I also love spending time with friends, whether we’re studying together or finding a new coffee shop.</p>
          <p>I ran cross country and track in high school, and running is still part of my life. These days, you’ll also find me at the gym, playing pickleball, or playing soccer.</p>
        </div>
      </StoryChapter>
    </StoryTimeline>
  </section>;
}
