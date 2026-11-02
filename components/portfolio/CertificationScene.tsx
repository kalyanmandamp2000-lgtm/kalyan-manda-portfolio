"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Award, ArrowUpRight, BadgeCheck } from "lucide-react";

import { SectionBackground } from "@/components/portfolio/SectionBackground";
import { resume } from "@/lib/resume";

export function CertificationScene() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="certifications" className="portfolio-section" aria-labelledby="certifications-heading">
      <SectionBackground src="/Certifications.jpg" />
      <div className="portfolio-shell flex min-h-full flex-col justify-center py-7">
        <div className="mx-auto w-full max-w-5xl">
          <div className="mb-8 text-center sm:mb-10">
            <div className="section-kicker">Credentials / Sitecore</div>
            <h2 id="certifications-heading" className="section-heading">Learning, put into practice.</h2>
            <p className="section-description">Current certifications supporting real-world work across the Sitecore ecosystem.</p>
          </div>

          <div className="certification-list grid gap-3 sm:grid-cols-2 sm:gap-4">
            {resume.certifications.map((certification, index) => (
              <motion.article
                key={`${certification.title}-${index}`}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reduceMotion ? 0 : index * 0.08, duration: reduceMotion ? 0 : 0.4 }}
                className="glass-panel relative flex min-w-0 flex-col overflow-hidden rounded-lg p-5 sm:p-6"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-200/60 to-transparent" />
                <div className="flex items-start justify-between gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md border border-emerald-200/20 bg-emerald-200/[0.07] text-emerald-100"><Award className="h-5 w-5" /></span>
                  <span className="flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.15em] text-emerald-200"><BadgeCheck className="h-3.5 w-3.5" />Verified credential</span>
                </div>

                <h3 className="mt-5 break-words text-xl font-semibold leading-snug text-white sm:text-2xl">{certification.title}</h3>
                <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-400">
                  <span>{certification.issuer ?? "Professional credential"}</span>
                  {certification.date ? <><span className="text-slate-600">/</span><span>{certification.date}</span></> : null}
                </div>

                <div className="mt-5 flex-1 border-t border-white/[0.08] pt-4">
                  <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-slate-500">Credential reference</p>
                  <p className="mt-1 break-all font-mono text-[10px] leading-5 text-slate-400">{certification.credentialId ?? "Reference available on request"}</p>
                </div>

                {certification.url ? (
                  <a href={certification.url} target="_blank" rel="noreferrer" className="mt-5 inline-flex min-h-10 items-center justify-between gap-3 border-t border-white/[0.08] pt-4 text-xs font-medium text-emerald-100 transition hover:text-white">
                    View credential on Credly <ArrowUpRight className="h-4 w-4" />
                  </a>
                ) : null}
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
