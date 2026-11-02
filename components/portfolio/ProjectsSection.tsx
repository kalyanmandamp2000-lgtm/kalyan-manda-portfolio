"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, CalendarDays, HeartPulse, MapPin, ShoppingBag } from "lucide-react";
import { useState } from "react";

import { SectionBackground } from "@/components/portfolio/SectionBackground";
import { resume } from "@/lib/resume";

const projectIcons = [HeartPulse, MapPin, ShoppingBag, CalendarDays];
const projectVisuals = [
  "from-emerald-500/25 via-cyan-500/10 to-[#0b1520]",
  "from-lime-400/20 via-emerald-600/10 to-[#101920]",
  "from-orange-400/25 via-rose-500/10 to-[#17121b]",
  "from-sky-400/20 via-teal-500/10 to-[#0c1920]",
];

export function ProjectsSection() {
  const [selected, setSelected] = useState(0);
  const project = resume.projects[selected];
  const reduceMotion = useReducedMotion();
  const ProjectIcon = projectIcons[selected % projectIcons.length];

  const selectProject = (index: number) => {
    setSelected((index + resume.projects.length) % resume.projects.length);
  };

  return (
    <section id="projects" className="portfolio-section" aria-labelledby="projects-heading">
      <SectionBackground src="/Projects.jpg" />
      <div className="portfolio-shell flex min-h-full flex-col justify-center py-5 sm:py-7">
        <div className="mb-6 text-center sm:mb-8">
          <div className="section-kicker">Selected work / {String(resume.projects.length).padStart(2, "0")} projects</div>
          <h2 id="projects-heading" className="section-heading">Ideas made useful.</h2>
          <p className="section-description">A closer look at products and platforms delivered across healthcare, commerce, and digital services.</p>
        </div>

        <div className="mx-auto w-full max-w-5xl [perspective:1200px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.article
              key={`${project.name}-${selected}`}
              initial={{ opacity: 0, x: reduceMotion ? 0 : 28, rotateY: reduceMotion ? 0 : 3 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: reduceMotion ? 0 : -20, rotateY: reduceMotion ? 0 : -2 }}
              transition={{ duration: reduceMotion ? 0 : 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="glass-panel grid overflow-hidden rounded-lg lg:grid-cols-[.72fr_1.28fr]"
            >
              <div className={`relative flex min-h-40 flex-col justify-between overflow-hidden bg-gradient-to-br p-5 sm:min-h-48 sm:p-7 lg:min-h-[440px] ${projectVisuals[selected % projectVisuals.length]}`}>
                <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,.13)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.13)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom_right,black,transparent_90%)]" />
                <div className="relative flex items-center justify-between gap-4 font-mono text-[9px] uppercase tracking-[0.16em] text-white/65">
                  <span>Case study</span>
                  <span>{project.period ?? "Selected work"}</span>
                </div>
                <div className="relative flex items-end justify-between gap-4">
                  <div>
                    <ProjectIcon aria-hidden="true" className="h-10 w-10 text-white/90 sm:h-14 sm:w-14" strokeWidth={1.2} />
                  </div>
                  <span className="mb-1 font-mono text-4xl font-light text-white/35 sm:text-5xl">0{selected + 1}</span>
                </div>
              </div>

              <div className="flex min-w-0 flex-col p-5 sm:p-7 lg:p-8">
                <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-cyan-100">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />{project.role ?? "Project"}
                </div>
                <h3 className="mt-3 text-2xl font-semibold leading-tight text-white sm:text-3xl">{project.name}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{project.summary}</p>

                <div className="mt-5 flex flex-wrap gap-2" aria-label="Technologies used">
                  {project.technologies.map((technology) => (
                    <span key={technology} className="border border-white/10 bg-white/[0.035] px-2.5 py-1.5 font-mono text-[10px] text-slate-300">{technology}</span>
                  ))}
                </div>

                <ul className="mt-5 grid gap-x-5 text-xs leading-5 text-slate-300 sm:grid-cols-2">
                  {project.highlights.map((highlight, index) => (
                    <li key={`${highlight}-${index}`} className="flex gap-2.5 border-t border-white/[0.07] py-3">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-200" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          </AnimatePresence>

          <div className="mt-4 flex items-center justify-between gap-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">{String(selected + 1).padStart(2, "0")} <span className="mx-1 text-slate-700">/</span> {String(resume.projects.length).padStart(2, "0")}</span>
            <div className="flex items-center gap-1.5" aria-label="Choose project">
              {resume.projects.map((item, index) => (
                <button key={item.name} type="button" onClick={() => selectProject(index)} aria-label={`Show ${item.name}`} aria-current={index === selected ? "true" : undefined} className={`h-2 rounded-full transition-all ${index === selected ? "w-7 bg-cyan-200" : "w-2 bg-slate-600 hover:bg-slate-400"}`} />
              ))}
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => selectProject(selected - 1)} aria-label="Previous project" className="grid h-9 w-9 place-items-center rounded-md border border-white/10 text-slate-300 transition hover:border-cyan-200/50 hover:text-cyan-100"><ArrowLeft className="h-4 w-4" /></button>
              <button type="button" onClick={() => selectProject(selected + 1)} aria-label="Next project" className="grid h-9 w-9 place-items-center rounded-md border border-white/10 text-slate-300 transition hover:border-cyan-200/50 hover:text-cyan-100"><ArrowRight className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
