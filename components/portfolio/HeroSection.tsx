"use client";

import { motion, useReducedMotion } from "framer-motion";

import { SectionBackground } from "@/components/portfolio/SectionBackground";
import { resume } from "@/lib/resume";

export function HeroSection() {
  const reduceMotion = useReducedMotion();
  const [firstName, ...lastNameParts] = resume.personal.name.split(" ");
  const lastName = lastNameParts.join(" ");

  return (
    <section id="hero" className="portfolio-section" aria-labelledby="hero-heading">
      <SectionBackground src="/HeroSection.png" />
      <div className="portfolio-shell flex min-h-full items-center justify-center py-10">
        <motion.div
          initial={{ opacity: 0, y: 24, rotateX: -12 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 mx-auto w-full max-w-5xl text-center [perspective:1000px]"
        >
          <h1 id="hero-heading" className="hero-heading-depth mx-auto flex max-w-full flex-wrap justify-center gap-x-[0.28em] text-3xl min-[380px]:text-4xl sm:text-6xl lg:text-8xl font-black leading-tight">
            <span className="hero-name-primary">{firstName}</span>
            <span className="hero-name-depth">{lastName}</span>
          </h1>
          <p className="hero-role-perspective mx-auto mt-5 justify-center text-center" aria-label={resume.personal.title}>
            <span className="hero-role-focus">{resume.personal.title}</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
