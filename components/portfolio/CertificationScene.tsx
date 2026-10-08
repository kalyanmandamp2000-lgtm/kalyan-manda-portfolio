"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";

import { resume } from "@/lib/resume";

export function CertificationScene() {
  return (
    <section id="certifications" className="portfolio-section" aria-labelledby="certifications-heading">
      <div className="portfolio-shell">
        <div className="mx-auto max-w-5xl text-center">
          <div className="section-kicker">Credentials</div>
          <h2 id="certifications-heading" className="section-heading">Professional validation</h2>
          <p className="section-description">Industry-recognized credentials that complement practical delivery experience.</p>

          <div className="certification-list mt-7 grid max-h-[52vh] gap-3 overflow-y-auto pr-1 sm:grid-cols-2">
            {resume.certifications.map((certification, index) => (
              <motion.article
                key={`${certification.title}-${index}`}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className="min-w-0 rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.09),rgba(2,6,23,0.88)_55%)] p-4 text-center backdrop-blur-xl sm:p-5"
              >
                <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-2xl border border-violet-400/30 bg-violet-500/10 text-violet-200"><Award className="h-4 w-4" /></div>
                <h3 className="break-words text-base font-semibold leading-snug text-white sm:text-lg">{certification.title}</h3>
                <p className="mt-2 text-sm text-slate-400">{certification.issuer ?? "Professional credential"}</p>
                {certification.date ? <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">{certification.date}</p> : null}
                {certification.url ? <a href={certification.url} target="_blank" rel="noreferrer" className="mt-4 inline-flex rounded-full border border-violet-400/30 px-3 py-2 text-xs text-violet-100 hover:bg-violet-500/10">View credential</a> : null}
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
