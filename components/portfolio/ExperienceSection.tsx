"use client";

import { motion } from "framer-motion";
import { BriefcaseBusiness } from "lucide-react";
import { useState } from "react";

import { resume } from "@/lib/resume";

export function ExperienceSection() {
  const [selected, setSelected] = useState(0);
  const role = resume.experience[selected];

  return (
    <section id="experience" className="portfolio-section" aria-labelledby="experience-heading">
      <div className="portfolio-shell flex min-h-full flex-col justify-center py-4 sm:py-6">
        <div className="mb-5 text-center sm:mb-7"><div className="section-kicker">Experience</div><h2 id="experience-heading" className="section-heading">Built for complex digital environments</h2><p className="section-description">A progression of platform delivery, content architecture, and scalable engineering.</p></div>
        <div className="grid gap-4 sm:gap-5 lg:grid-cols-[.72fr_1.28fr]">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-1">
            {resume.experience.map((entry, index) => (
              <button
                key={`${entry.company}-${index}`}
                type="button"
                onClick={() => setSelected(index)}
                aria-pressed={selected === index}
                className={`min-w-0 rounded-xl border p-2.5 text-left transition sm:rounded-2xl sm:p-4 ${selected === index ? "border-sky-300/60 bg-sky-500/10 shadow-[0_0_30px_rgba(56,189,248,.1)]" : "border-white/10 bg-slate-950/35 hover:border-white/20 hover:bg-white/[0.04]"}`}
              >
                <span className="block text-[8px] uppercase tracking-[0.16em] text-slate-500 sm:text-[9px]">{entry.period}</span>
                <span className="mt-1 block truncate text-xs font-semibold text-white sm:text-sm">{entry.company}</span>
                <span className="mt-0.5 block truncate text-[10px] text-slate-400 sm:text-xs">{entry.role}</span>
              </button>
            ))}
          </div>

          <motion.article
            key={`${role.company}-${selected}`}
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35 }}
            className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.12),rgba(2,6,23,0.88)_55%)] p-5 backdrop-blur-xl sm:p-7"
          >
            <div className="absolute inset-x-8 top-0 h-20 rounded-full bg-sky-500/10 blur-3xl" />
            <div className="relative z-10 flex items-start justify-between gap-4">
              <div>
                <div className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-sky-300"><BriefcaseBusiness className="h-4 w-4" /> {role.period}</div>
                <h3 className="text-2xl font-semibold text-white sm:text-3xl">{role.role}</h3>
                <p className="mt-1 text-sm text-slate-400">{role.company}{role.location ? ` · ${role.location}` : ""}</p>
              </div>
              <span className="rounded-full border border-sky-400/25 bg-sky-500/10 px-3 py-1 font-mono text-xs text-sky-200">0{selected + 1}</span>
            </div>

            <ul className="relative z-10 mt-5 grid gap-3 text-sm leading-6 text-slate-300 sm:grid-cols-2">
              {role.highlights.map((highlight, index) => (
                <li key={`${highlight}-${index}`} className="flex gap-3 border-t border-white/5 pt-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-300 shadow-[0_0_10px_rgba(125,211,252,.8)]" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
