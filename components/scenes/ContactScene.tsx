"use client";

import { motion } from "framer-motion";
import { Globe, Mail, MapPin, Phone } from "lucide-react";
import { useEffect } from "react";

import { resume } from "@/lib/resume";
import { trackEvent, trackSectionView } from "@/lib/analytics-client";
import { GlassCard } from "@/components/ui/GlassCard";
import { ResumeDownloadButton } from "@/components/ui/ResumeDownloadButton";

export function ContactScene() {
  useEffect(() => {
    const section = document.getElementById("contact");
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            trackSectionView("contact");
          }
        });
      },
      { threshold: 0.35 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" className="px-4 pb-20 pt-14 md:px-8">
      <div className="mx-auto max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <GlassCard glow className="overflow-hidden p-6 md:p-10">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="space-y-5">
                <div className="text-xs uppercase tracking-[0.32em] text-sky-300">05 / Contact</div>
                <h2 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">Let’s build something useful, scalable, and thoughtfully designed.</h2>
                <p className="max-w-xl text-slate-300">I’m open to enterprise CMS, digital transformation, and Sitecore platform opportunities where thoughtful engineering can make a real difference.</p>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href={`mailto:${resume.personal.email}`}
                  onClick={() => void trackEvent("email_click", { source: "contact" })}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-sky-400/40 bg-gradient-to-r from-sky-500/20 to-cyan-400/20 px-5 py-3 text-sm font-medium text-sky-100 shadow-[0_18px_40px_rgba(59,130,246,0.14)] transition hover:scale-[1.01] hover:border-sky-300/70 hover:bg-sky-500/30"
                >
                  <Mail className="h-4 w-4" />
                  Email Me
                </a>
                <ResumeDownloadButton source="contact" />
              </div>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {resume.personal.email ? (
                <motion.a whileHover={{ y: -3, scale: 1.01 }} href={`mailto:${resume.personal.email}`} onClick={() => void trackEvent("email_click", { source: "contact" })} className="rounded-2xl border border-slate-700/80 bg-slate-900/60 p-4 text-slate-200 transition hover:border-sky-400/60 hover:bg-slate-900/80">
                  <Mail className="mb-2 h-4 w-4 text-sky-300" />
                  <div className="text-xs uppercase tracking-[0.22em] text-slate-400">Email</div>
                  <div className="mt-2 text-sm">{resume.personal.email}</div>
                </motion.a>
              ) : null}

              {resume.personal.phone ? (
                <motion.div whileHover={{ y: -3, scale: 1.01 }} className="rounded-2xl border border-slate-700/80 bg-slate-900/60 p-4 text-slate-200 transition hover:border-cyan-400/60 hover:bg-slate-900/80">
                  <Phone className="mb-2 h-4 w-4 text-sky-300" />
                  <div className="text-xs uppercase tracking-[0.22em] text-slate-400">Phone</div>
                  <div className="mt-2 text-sm">{resume.personal.phone}</div>
                </motion.div>
              ) : null}

              {resume.personal.location ? (
                <motion.div whileHover={{ y: -3, scale: 1.01 }} className="rounded-2xl border border-slate-700/80 bg-slate-900/60 p-4 text-slate-200 transition hover:border-violet-400/60 hover:bg-slate-900/80">
                  <MapPin className="mb-2 h-4 w-4 text-sky-300" />
                  <div className="text-xs uppercase tracking-[0.22em] text-slate-400">Location</div>
                  <div className="mt-2 text-sm">{resume.personal.location}</div>
                </motion.div>
              ) : null}

              <motion.div whileHover={{ y: -3, scale: 1.01 }} className="rounded-2xl border border-slate-700/80 bg-slate-900/60 p-4 text-slate-200 transition hover:border-emerald-400/60 hover:bg-slate-900/80">
                <Globe className="mb-2 h-4 w-4 text-sky-300" />
                <div className="text-xs uppercase tracking-[0.22em] text-slate-400">Social</div>
                <div className="mt-2 text-sm">LinkedIn</div>
                <div className="mt-2 text-sm">GitHub</div>
              </motion.div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {resume.personal.links.map((link) => {
                const lower = link.label.toLowerCase();
                const Icon = lower.includes("linkedin") || lower.includes("github") ? Globe : Mail;
                return (
                  <motion.a
                    key={link.label}
                    whileHover={{ y: -2, scale: 1.02 }}
                    href={link.url ?? "#"}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => {
                      if (lower.includes("linkedin")) void trackEvent("linkedin_click", { source: "contact" });
                      if (lower.includes("github")) void trackEvent("github_click", { source: "contact" });
                    }}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-900/60 px-4 py-2 text-sm text-slate-200 transition hover:border-sky-400/60 hover:bg-slate-900/80"
                  >
                    <Icon className="h-4 w-4 text-sky-300" />
                    {link.label}
                  </motion.a>
                );
              })}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
