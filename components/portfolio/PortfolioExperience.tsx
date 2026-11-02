"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

import { AmbientScene } from "@/components/portfolio/AmbientScene";
import { LoadingExperience } from "@/components/portfolio/LoadingExperience";
import { QuickActions } from "@/components/portfolio/QuickActions";
import { SectionIndicator } from "@/components/portfolio/SectionIndicator";
import { AboutScene } from "@/components/scenes/AboutScene";
import { CertificationScene } from "@/components/portfolio/CertificationScene";
import { ContactSection } from "@/components/portfolio/ContactSection";
import { EducationSection } from "@/components/portfolio/EducationSection";
import { ExperienceSection } from "@/components/portfolio/ExperienceSection";
import { HeroSection } from "@/components/portfolio/HeroSection";
import { ProjectsSection } from "@/components/portfolio/ProjectsSection";
import { SkillsSection } from "@/components/portfolio/SkillsSection";

const sections = [
  { id: "hero", label: "Home", component: HeroSection },
  { id: "about", label: "About", component: AboutScene },
  { id: "experience", label: "Experience", component: ExperienceSection },
  { id: "skills", label: "Skills", component: SkillsSection },
  { id: "projects", label: "Projects", component: ProjectsSection },
  { id: "education", label: "Education", component: EducationSection },
  { id: "certifications", label: "Credentials", component: CertificationScene },
  { id: "contact", label: "Contact", component: ContactSection },
];

export function PortfolioExperience() {
  const reduceMotion = useReducedMotion();
  const [loaded, setLoaded] = useState(false);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const touchStart = useRef<{ y: number; sectionId: string; atTop: boolean; atBottom: boolean } | null>(null);
  const wheelGesture = useRef<{ sectionId: string; atTop: boolean; atBottom: boolean } | null>(null);
  const wheelIdleTimer = useRef<number | null>(null);
  const wheelCooldown = useRef(0);

  const navigate = useCallback((nextIndex: number) => {
    if (isTransitioning || nextIndex === current || nextIndex < 0 || nextIndex >= sections.length) return;
    const nextDirection = nextIndex > current ? 1 : -1;
    setDirection(nextDirection);
    setIsTransitioning(true);
    window.setTimeout(() => {
      setCurrent(nextIndex);
      setIsTransitioning(false);
    }, reduceMotion ? 0 : 520);
  }, [current, isTransitioning, reduceMotion]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (["ArrowDown", "PageDown"].includes(event.key)) navigate(Math.min(sections.length - 1, current + 1));
      if (["ArrowUp", "PageUp"].includes(event.key)) navigate(Math.max(0, current - 1));
    };
    const handleCustomNavigation = (event: Event) => {
      const detail = (event as CustomEvent<number>).detail;
      if (typeof detail === "number") navigate(detail);
    };
    window.addEventListener("keydown", handleKey);
    window.addEventListener("portfolio:navigate", handleCustomNavigation);
    return () => { window.removeEventListener("keydown", handleKey); window.removeEventListener("portfolio:navigate", handleCustomNavigation); };
  }, [current, navigate]);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      const target = event.target;
      const interactiveTarget = target instanceof Element ? target.closest("input, textarea, select, [contenteditable='true']") : null;
      if (interactiveTarget) return;

      const activeSection = document.getElementById(sections[current].id);
      if (!activeSection || Math.abs(event.deltaY) < 18) return;

      const now = Date.now();
      const isAtTop = activeSection.scrollTop <= 1;
      const isAtBottom = activeSection.scrollTop + activeSection.clientHeight >= activeSection.scrollHeight - 1;

      if (!wheelGesture.current) {
        wheelGesture.current = { sectionId: activeSection.id, atTop: isAtTop, atBottom: isAtBottom };
      }

      if (wheelIdleTimer.current !== null) window.clearTimeout(wheelIdleTimer.current);
      wheelIdleTimer.current = window.setTimeout(() => {
        wheelGesture.current = null;
        wheelIdleTimer.current = null;
      }, 420);

      if (isTransitioning || now < wheelCooldown.current || wheelGesture.current.sectionId !== activeSection.id) return;

      const gestureStartedAtBoundary = event.deltaY > 0
        ? wheelGesture.current.atBottom
        : wheelGesture.current.atTop;
      if (!gestureStartedAtBoundary) return;

      if (event.deltaY > 0 && isAtBottom) {
        event.preventDefault();
        wheelCooldown.current = now + 850;
        navigate(Math.min(sections.length - 1, current + 1));
      } else if (event.deltaY < 0 && isAtTop) {
        event.preventDefault();
        wheelCooldown.current = now + 850;
        navigate(Math.max(0, current - 1));
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      if (wheelIdleTimer.current !== null) window.clearTimeout(wheelIdleTimer.current);
      wheelIdleTimer.current = null;
      wheelGesture.current = null;
    };
  }, [current, isTransitioning, navigate]);

  useEffect(() => {
    const handleTouchStart = (event: TouchEvent) => {
      const activeSection = document.getElementById(sections[current].id);
      if (!activeSection) return;
      touchStart.current = {
        y: event.changedTouches[0].clientY,
        sectionId: activeSection.id,
        atTop: activeSection.scrollTop <= 1,
        atBottom: activeSection.scrollTop + activeSection.clientHeight >= activeSection.scrollHeight - 1,
      };
    };
    const handleTouchEnd = (event: TouchEvent) => {
      const start = touchStart.current;
      touchStart.current = null;
      if (!start) return;
      const activeSection = document.getElementById(sections[current].id);
      if (!activeSection || activeSection.id !== start.sectionId || isTransitioning) return;

      const delta = event.changedTouches[0].clientY - start.y;
      if (Math.abs(delta) < 48) return;
      const isAtTop = activeSection.scrollTop <= 1;
      const isAtBottom = activeSection.scrollTop + activeSection.clientHeight >= activeSection.scrollHeight - 1;
      if (delta < 0 && start.atBottom && isAtBottom) navigate(Math.min(sections.length - 1, current + 1));
      else if (delta > 0 && start.atTop && isAtTop) navigate(Math.max(0, current - 1));
    };
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => { window.removeEventListener("touchstart", handleTouchStart); window.removeEventListener("touchend", handleTouchEnd); };
  }, [current, isTransitioning, navigate]);

  const ActiveSection = sections[current].component;
  const handleLoadingComplete = useCallback(() => setLoaded(true), []);

  return (
    <main className="relative h-dvh min-h-[400px] w-full overflow-hidden bg-[#070914] text-white">
      <LoadingExperience onComplete={handleLoadingComplete} />
      <AnimatePresence>{loaded ? (
        <motion.div key="experience" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: reduceMotion ? 0 : 0.7 }} className="relative z-10 h-full">
          <AmbientScene sectionId={sections[current].id} />
          <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_50%_42%,rgba(167,139,250,.08),transparent_46%),linear-gradient(180deg,rgba(7,9,20,.12),rgba(7,9,20,.72))]" />
          <div className="section-atmosphere" data-section={sections[current].id} aria-hidden="true" />
          <QuickActions />
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={sections[current].id} initial={{ opacity: 0, x: direction * 48, rotateY: direction * -2, filter: "blur(10px)" }} animate={{ opacity: 1, x: 0, rotateY: 0, filter: "blur(0px)" }} exit={{ opacity: 0, x: direction * -48, rotateY: direction * 2, filter: "blur(8px)" }} transition={{ duration: reduceMotion ? 0 : 0.62, ease: [0.22, 1, 0.36, 1] }} className="absolute inset-0 z-10 h-full w-full overflow-hidden" style={{ transformOrigin: "center center" }}>
              <ActiveSection />
            </motion.div>
          </AnimatePresence>
          <SectionIndicator current={current} total={sections.length} />
          <div className="fixed bottom-5 right-4 z-40 hidden items-center gap-3 text-[9px] uppercase tracking-[0.24em] text-slate-500 sm:flex">
            <span>Scroll edge or use</span><span className="rounded border border-white/10 px-2 py-1 text-slate-300">↑ ↓</span><span>to navigate</span>
          </div>
        </motion.div>
      ) : null}</AnimatePresence>
    </main>
  );
}
