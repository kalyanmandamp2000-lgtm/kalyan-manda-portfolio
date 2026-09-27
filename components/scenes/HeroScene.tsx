"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { resume } from "@/lib/resume";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ResumeDownloadButton } from "@/components/ui/ResumeDownloadButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { trackEvent, trackSectionView } from "@/lib/analytics-client";
import { Hero3DScene } from "@/components/scenes/Hero3DScene";

export function HeroScene() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handlePointer = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      setTilt({ x: y * 12, y: x * 12 });
    };

    const reset = () => setTilt({ x: 0, y: 0 });
    element.addEventListener("pointermove", handlePointer);
    element.addEventListener("pointerleave", reset);

    return () => {
      element.removeEventListener("pointermove", handlePointer);
      element.removeEventListener("pointerleave", reset);
    };
  }, []);

  useEffect(() => {
    const section = document.getElementById("hero");
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            trackSectionView("hero");
            void trackEvent("page_view", { source: "hero" });
          }
        });
      },
      { threshold: 0.5 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const headline = `${resume.personal.name}`;

  return (
    <section id="hero" ref={ref} className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-20 md:px-8">
      <div className="soft-grid absolute inset-0 opacity-25" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,_rgba(59,130,246,0.12),transparent_24%),radial-gradient(circle_at_85%_30%,_rgba(6,182,212,0.12),transparent_22%),linear-gradient(135deg,#07111f_0%,#0d1b2a_38%,#07111f_100%)]" />

      <div className="relative z-10 grid w-full max-w-7xl items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-5 sm:space-y-7"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/40 bg-sky-500/10 px-2.5 py-1 text-[8px] uppercase tracking-[0.22em] text-sky-200 sm:px-3 sm:py-1.5 sm:text-[10px] sm:tracking-[0.28em]">
            Sitecore Engineer • CMS Platform Delivery
          </div>

          <div className="space-y-3 sm:space-y-5">
            <h1 className="text-3.5xl font-semibold tracking-[-0.08em] text-white sm:text-5xl md:text-7xl">{headline}</h1>
            <div className="text-base text-cyan-200 sm:text-xl md:text-2xl">{resume.personal.title}</div>
            <p className="max-w-xl text-sm leading-7 text-slate-300 sm:text-base sm:leading-8 md:text-lg">{resume.personal.summary}</p>
          </div>

          <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <a
              href="#experience"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-cyan-400 px-4 py-2.5 text-sm font-medium text-slate-950 shadow-[0_18px_40px_rgba(59,130,246,0.3)] transition hover:brightness-110 sm:px-5 sm:py-3"
            >
              View Experience
            </a>
            <ResumeDownloadButton source="hero" className="min-h-[44px]" />
            <MagneticButton
              href={`mailto:${resume.personal.email}`}
              onClick={() => void trackEvent("email_click", { source: "hero" })}
              className="min-h-[44px]"
            >
              <Mail className="mr-2 h-4 w-4" />
              Email Me
            </MagneticButton>
          </div>

          <div className="flex flex-wrap gap-2 pt-1 text-xs text-slate-300 sm:gap-4 sm:pt-2 sm:text-sm">
            {resume.personal.location ? (
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-700/70 bg-slate-900/70 px-2.5 py-1.5 sm:px-3 sm:py-2">
                <MapPin className="h-3.5 w-3.5 text-sky-300 sm:h-4 sm:w-4" />
                {resume.personal.location}
              </div>
            ) : null}
            {resume.personal.phone ? (
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-700/70 bg-slate-900/70 px-2.5 py-1.5 sm:px-3 sm:py-2">
                <Phone className="h-3.5 w-3.5 text-cyan-300 sm:h-4 sm:w-4" />
                {resume.personal.phone}
              </div>
            ) : null}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          style={{ transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="absolute inset-6 rounded-[2rem] bg-sky-500/20 blur-3xl" />
          <GlassCard glow className="p-3 md:p-4">
            <Hero3DScene />
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
