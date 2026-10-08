"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

import { resume } from "@/lib/resume";

export function EducationSection() {
  return (
    <section id="education" className="portfolio-section" aria-labelledby="education-heading">
      <div className="portfolio-shell">
        <div className="mb-6 text-center">
          <div className="section-kicker">Education</div>
          <h2 id="education-heading" className="section-heading">A foundation for practical engineering</h2>
          <p className="section-description">Academic training that supports a systems-minded, product-focused approach.</p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-3 sm:grid-cols-2">
          {resume.education.map((item, index) => (
            <motion.article
              key={`${item.degree}-${index}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.08),rgba(2,6,23,0.9)_55%)] p-5 text-center backdrop-blur-xl sm:p-6"
            >
              <div className="mx-auto mb-5 flex h-11 w-11 items-center justify-center rounded-2xl border border-sky-400/30 bg-sky-500/10 text-sky-200">
                <GraduationCap className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-white">{item.degree}</h3>
              <p className="mt-2 text-sm text-slate-300">{item.institution}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">{item.period}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
