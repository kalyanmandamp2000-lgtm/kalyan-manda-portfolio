"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, BriefcaseBusiness, MapPin } from "lucide-react";
import { useState } from "react";

import { SectionBackground } from "@/components/portfolio/SectionBackground";
import { resume } from "@/lib/resume";

export function ExperienceSection() {
  const [selected, setSelected] = useState(0);
  const role = resume.experience[selected];

  const selectRole = (index: number) => {
    setSelected((index + resume.experience.length) % resume.experience.length);
  };

  return (
    <section id="experience" className="portfolio-section" aria-labelledby="experience-heading">
      <SectionBackground src="/experience.jpg" />
      <div className="portfolio-shell flex min-h-full flex-col justify-center py-3 sm:py-4">
        <div className="mb-3 text-center sm:mb-4">
          <div className="section-kicker">Career / 2022—Now</div>
          <h2 id="experience-heading" className="section-heading">Experience built by shipping.</h2>
          <p className="section-description">A hands-on path through enterprise CMS, reusable platforms, and digital delivery.</p>
        </div>

        <div className="mx-auto grid w-full max-w-5xl gap-3 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-4">
          <nav aria-label="Career timeline" className="grid grid-cols-2 gap-2 lg:grid-cols-1 lg:content-start">
            {resume.experience.map((entry, index) => (
              <button
                key={`${entry.company}-${index}`}
                type="button"
                onClick={() => selectRole(index)}
                aria-pressed={selected === index}
                className={`min-w-0 border-l-2 px-3 py-2 text-left transition sm:px-4 ${selected === index ? "border-cyan-200 bg-cyan-200/[0.06]" : "border-white/10 hover:border-white/30 hover:bg-white/[0.025]"}`}
              >
                <span className="block text-[9px] font-mono uppercase tracking-[0.12em] text-slate-500">{entry.period}</span>
                <span className="mt-1 block truncate text-xs font-semibold text-white sm:text-sm">{entry.company}</span>
                <span className="mt-1 block truncate text-[10px] text-slate-400 sm:text-xs">{entry.role}</span>
              </button>
            ))}
          </nav>

          <motion.article
            key={`${role.company}-${selected}`}
            initial={{ opacity: 0, x: 20, rotateY: 2 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="glass-panel relative overflow-hidden rounded-lg p-4 sm:p-5"
          >
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-3">
              <div className="flex min-w-0 items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-cyan-200/20 bg-cyan-200/[0.07] text-cyan-100"><BriefcaseBusiness className="h-4 w-4" /></span>
                <div className="min-w-0">
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-cyan-100">Career module / {String(selected + 1).padStart(2, "0")}</p>
                  <p className="mt-1 text-xs text-slate-400">{role.period}</p>
                </div>
              </div>
              <span className="shrink-0 rounded-sm border border-emerald-300/20 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.12em] text-emerald-200">Career</span>
            </div>

            <div className="pt-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-amber-200">{role.company}</p>
              <h3 className="mt-2 text-2xl font-semibold leading-tight text-white sm:text-3xl">{role.role}</h3>
              {role.location ? <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-400"><MapPin className="h-3.5 w-3.5 text-emerald-200" />{role.location}</p> : null}
            </div>

            <ul aria-label="Role highlights" tabIndex={0} className="experience-highlights mt-3 grid gap-x-5 text-xs leading-5 text-slate-300 sm:grid-cols-2">
              {role.highlights.map((highlight, index) => (
                <li key={`${highlight}-${index}`} className="flex gap-2.5 border-t border-white/[0.07] py-2">
                  <span className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-200" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>

            <div className="mt-2 flex items-center justify-between border-t border-white/10 pt-3">
              <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-slate-500">{String(selected + 1).padStart(2, "0")} / {String(resume.experience.length).padStart(2, "0")}</span>
              <div className="flex gap-2">
                <button type="button" onClick={() => selectRole(selected - 1)} aria-label="Previous experience" className="grid h-9 w-9 place-items-center rounded-md border border-white/10 text-slate-300 transition hover:border-cyan-200/50 hover:text-cyan-100"><ArrowLeft className="h-4 w-4" /></button>
                <button type="button" onClick={() => selectRole(selected + 1)} aria-label="Next experience" className="grid h-9 w-9 place-items-center rounded-md border border-white/10 text-slate-300 transition hover:border-cyan-200/50 hover:text-cyan-100"><ArrowRight className="h-4 w-4" /></button>
              </div>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
