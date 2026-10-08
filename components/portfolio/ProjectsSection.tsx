"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, GitBranch } from "lucide-react";
import { useState } from "react";

import { resume } from "@/lib/resume";

export function ProjectsSection() {
  const [selected, setSelected] = useState(0);
  const project = resume.projects[selected];

  return (
    <section id="projects" className="portfolio-section" aria-labelledby="projects-heading">
      <div className="portfolio-shell flex min-h-full flex-col justify-center py-4 sm:py-6">
        <div className="mb-5 text-center sm:mb-7"><div className="section-kicker">Selected work</div><h2 id="projects-heading" className="section-heading">Systems and experiences with a clear purpose</h2><p className="section-description">A concise view of delivery work across CMS, API, commerce, and platform modernization.</p></div>
        <div className="grid gap-4 sm:gap-5 lg:grid-cols-[.72fr_1.28fr]">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-1">
            {resume.projects.map((item, index) => (
              <button key={item.name} type="button" onClick={() => setSelected(index)} aria-pressed={selected === index} className={`min-w-0 rounded-xl border p-2.5 text-left transition sm:rounded-2xl sm:p-4 ${selected === index ? "border-violet-300/60 bg-violet-500/10" : "border-white/10 bg-slate-950/35 hover:border-white/20"}`}>
                <span className="block truncate text-xs font-semibold text-white sm:text-sm">{item.name}</span>
                <span className="mt-1 block truncate text-[10px] text-slate-400 sm:text-xs">{item.role ?? "Project"}</span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.article key={`${project.name}-${selected}`} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35 }} className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.12),rgba(2,6,23,0.88)_55%)] p-5 backdrop-blur-xl sm:p-7">
              <div className="absolute inset-x-8 top-0 h-20 rounded-full bg-violet-500/10 blur-3xl" />
              <div className="relative z-10 flex items-start justify-between gap-4">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.24em] text-violet-300">{project.role ?? "Project"}</div>
                  <h3 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">{project.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{project.summary}</p>
                </div>
                <span className="rounded-full border border-white/10 px-3 py-1 font-mono text-xs text-slate-400">0{selected + 1}</span>
              </div>

              <div className="relative z-10 mt-5 flex flex-wrap gap-2">
                {project.technologies.map((technology) => (
                  <span key={technology} className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-xs text-slate-300">{technology}</span>
                ))}
              </div>

              <ul className="relative z-10 mt-5 grid gap-3 text-sm leading-6 text-slate-300 sm:grid-cols-2">
                {project.highlights.map((highlight, index) => (
                  <li key={`${highlight}-${index}`} className="flex gap-3 border-t border-white/5 pt-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-300" /><span>{highlight}</span></li>
                ))}
              </ul>

              <div className="relative z-10 mt-5 flex flex-wrap gap-2">
                {project.links?.map((link) => (
                  <a key={link.label} href={link.url ?? "#"} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3 py-2 text-xs text-slate-200 hover:border-sky-300/50">
                    {link.label.toLowerCase().includes("github") ? <GitBranch className="h-3.5 w-3.5" /> : <ArrowUpRight className="h-3.5 w-3.5" />}
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
