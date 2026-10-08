"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

import { Hero3DScene } from "@/components/scenes/Hero3DScene";
import { resume } from "@/lib/resume";

export function HeroSection() {
  const reduceMotion = useReducedMotion();
  const [typedName, setTypedName] = useState(() => reduceMotion ? resume.personal.name : "");
  const [typedTitle, setTypedTitle] = useState(() => reduceMotion ? resume.personal.title : "");

  useEffect(() => {
    if (reduceMotion) return;

    const name = resume.personal.name;
    const title = resume.personal.title;
    let nameIndex = 0;
    let titleIndex = 0;
    let phase: "name" | "title" = "name";

    const interval = window.setInterval(() => {
      if (phase === "name") {
        nameIndex += 1;
        setTypedName(name.slice(0, nameIndex));

        if (nameIndex >= name.length) {
          phase = "title";
          titleIndex = 0;
        }
      } else {
        titleIndex += 1;
        setTypedTitle(title.slice(0, titleIndex));

        if (titleIndex >= title.length) {
          window.clearInterval(interval);
        }
      }
    }, 28);

    return () => window.clearInterval(interval);
  }, [reduceMotion]);

  return (
    <section id="hero" className="portfolio-section" aria-labelledby="hero-heading">
      <div className="portfolio-shell relative flex min-h-[70vh] items-center justify-center overflow-hidden text-center">
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: reduceMotion ? 0 : 0.9 }} className="absolute inset-0 z-0 opacity-80">
          <div className="absolute inset-8 rounded-[2.2rem] bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.18),transparent_56%)] blur-3xl" />
          <div className="h-full w-full rounded-[2rem] border border-white/10 bg-slate-950/30 shadow-[0_0_80px_rgba(14,165,233,0.12)] backdrop-blur-sm">
            <Hero3DScene />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.75 }} className="relative z-10 mx-auto w-full max-w-5xl text-center">
          <h1
            id="hero-heading"
            className="mx-auto max-w-full bg-gradient-to-b from-white via-sky-100 to-sky-300 bg-clip-text text-[clamp(2.7rem,10vw,7.8rem)] font-black leading-[0.82] tracking-[-0.065em] text-transparent drop-shadow-[0_18px_32px_rgba(56,189,248,0.26)]"
            style={{
              fontFamily: '"Arial Black", "Segoe UI Black", "Segoe UI", sans-serif',
              fontVariantLigatures: "none",
              fontFeatureSettings: '"kern" 1',
              textShadow: "0 0 24px rgba(125, 211, 252, 0.18)",
            }}
          >
            {typedName}
            {typedName.length < resume.personal.name.length && <span aria-hidden="true" className="typing-cursor">|</span>}
          </h1>

          <div className="mt-4 text-center text-sm font-medium uppercase tracking-[0.28em] text-cyan-200/90 sm:text-xl" aria-label={resume.personal.title}>
            {typedTitle}
            {typedTitle.length < resume.personal.title.length && <span aria-hidden="true" className="typing-cursor typing-cursor-title">|</span>}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
