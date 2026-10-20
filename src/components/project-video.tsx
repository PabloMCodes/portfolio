"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "@/app/projects/projects.module.css";

const projects = {
  lovebugs: { name: "Lovebugs", label: "Lovebugs robot fleet demonstration", poster: "/images/lovebugs-poster.jpg", previewPoster: "/images/lovebugs-preview.jpg" },
  lockedin: { name: "LockedIn", label: "LockedIn project trailer", poster: "/images/lockedin-poster.jpg", previewPoster: "/images/lockedin-poster.jpg" },
};

export function ProjectVideo({ preview = false, project = "lovebugs" }: { preview?: boolean; project?: keyof typeof projects }) {
  const media = projects[project];
  const videoRef = useRef<HTMLVideoElement>(null);
  const manuallyPaused = useRef(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const syncPlayback = () => {
      if (visible && !document.hidden && !reducedMotion.matches && !manuallyPaused.current) {
        void video.play().catch(() => { /* Native controls remain available if autoplay is blocked. */ });
      } else {
        video.pause();
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncPlayback();
    }, { threshold: 0.15 });
    observer.observe(video);
    reducedMotion.addEventListener("change", syncPlayback);
    document.addEventListener("visibilitychange", syncPlayback);
    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener("change", syncPlayback);
      document.removeEventListener("visibilitychange", syncPlayback);
    };
  }, []);

  const video = <video
    ref={videoRef}
    className={styles.video}
    width={1280}
    height={720}
    muted
    loop
    playsInline
    controls={!preview}
    preload="none"
    poster={preview ? media.previewPoster : media.poster}
    aria-label={media.label}
    onPlay={() => setPlaying(true)}
    onPause={() => setPlaying(false)}
  >
    <source src={`/videos/${project}${preview ? "-preview" : ""}.mp4`} type="video/mp4" />
    Your browser does not support embedded video.
  </video>;

  return <div className={styles.videoFrame}>
    {preview ? <Link href={`/projects/${project}`} aria-label={`Watch ${media.name} and explore the build`} className={styles.previewLink}>{video}<span className={styles.previewBadge}>Watch & explore ↗</span></Link> : video}
    {preview && <button className={styles.playbackButton} type="button" aria-label={`${playing ? "Pause" : "Play"} ${media.name} preview`} onClick={() => {
      const element = videoRef.current;
      if (!element) return;
      manuallyPaused.current = !element.paused;
      if (element.paused) void element.play().catch(() => {});
      else element.pause();
    }}>{playing ? "Pause" : "Play"}</button>}
  </div>;
}
