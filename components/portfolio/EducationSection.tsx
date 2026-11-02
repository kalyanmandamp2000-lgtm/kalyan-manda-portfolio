"use client";

import { motion } from "framer-motion";
import { GraduationCap, Landmark } from "lucide-react";

import { SectionBackground } from "@/components/portfolio/SectionBackground";
import { resume } from "@/lib/resume";

export function EducationSection() {
  return (
    <section id="education" className="portfolio-section" aria-labelledby="education-heading">
      <SectionBackground src="/Education.png" />
      <div className="portfolio-shell flex min-h-full flex-col justify-center py-8">
        <div className="mb-8 text-center sm:mb-10">
          <div className="section-kicker">Education / Foundations</div>
          <h2 id="education-heading" className="section-heading">A foundation for practical engineering</h2>
          <p className="section-description">A computer science foundation behind a career building useful digital products.</p>
        </div>

        <div className="mx-auto w-full max-w-4xl">
          {resume.education.map((item, index) => (
            <motion.article
              key={`${item.degree}-${index}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="relative grid gap-5 border-t border-white/10 py-6 sm:grid-cols-[150px_1fr] sm:gap-8 sm:py-8"
            >
              <div className="flex items-center gap-3 sm:block">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md border border-amber-200/25 bg-amber-100/[0.06] text-amber-100"><GraduationCap className="h-5 w-5" /></span>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-amber-100 sm:mt-4 sm:block">{item.period}</span>
              </div>
              <div className="min-w-0">
                <p className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-slate-500"><Landmark className="h-3.5 w-3.5 text-cyan-200" />Academic record / {String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-3 text-xl font-semibold leading-snug text-white sm:text-2xl">{item.degree}</h3>
                <p className="mt-2 text-sm text-slate-300">{item.institution}</p>
                <div className="mt-5 h-px w-full bg-gradient-to-r from-amber-200/50 via-white/10 to-transparent" />
                <p className="mt-3 text-xs leading-5 text-slate-500">A foundation in computer science, applied to modern content platforms and enterprise web development.</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
