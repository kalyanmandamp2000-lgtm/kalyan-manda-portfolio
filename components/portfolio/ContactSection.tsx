"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";

import { resume } from "@/lib/resume";

export function ContactSection() {
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? resume.personal.email;

  return (
    <section id="contact" className="portfolio-section" aria-labelledby="contact-heading">
      <div className="portfolio-shell">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="mx-auto max-w-4xl text-center"
        >
          <div className="section-kicker">Contact</div>
          <h2 id="contact-heading" className="section-heading">Let&apos;s build something useful and scalable.</h2>
          <p className="section-copy mx-auto">I&apos;m open to enterprise CMS, digital transformation, and Sitecore platform opportunities.</p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            {email ? (
              <a href={`mailto:${email}`} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-110"><Mail className="h-4 w-4" /> Email Me</a>
            ) : null}
            <a href="/resume.pdf" download="Kalyan-Manda-Resume.pdf" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-sm text-slate-100 transition hover:border-sky-300/50 hover:bg-sky-500/10"><ArrowUpRight className="h-4 w-4" /> Download resume</a>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-2 text-[10px] uppercase tracking-[0.22em] text-slate-500">
            {resume.personal.links.map((link) => {
              if (!link.url) return null;
              const href = /^https?:\/\//i.test(link.url) ? link.url : `https://${link.url}`;
              return (
                <a
                  key={link.label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-2 text-slate-300 transition hover:border-sky-300/50 hover:text-white"
                >
                  {link.label}
                </a>
              );
            })}
            <span className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-2">{resume.personal.location ?? "Remote"}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
