"use client";

import { motion } from "framer-motion";
import { BriefcaseBusiness } from "lucide-react";
import { useEffect } from "react";

import { resume } from "@/lib/resume";
import { trackSectionView } from "@/lib/analytics-client";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function ExperienceScene() {
  useEffect(() => {
    const section = document.getElementById("experience");
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            trackSectionView("experience");
          }
        });
      },
      { threshold: 0.4 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" className="relative px-4 py-16 md:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="01 / Experience"
          title="Building digital experiences that support real business needs"
          description="Across enterprise delivery and CMS modernization, I’ve worked on solutions designed to be scalable, maintainable, and easy for teams to evolve over time."
        />

        <div className="relative space-y-5 sm:space-y-6">
          <div className="absolute left-5 top-0 hidden h-full w-px bg-gradient-to-b from-sky-400/80 via-violet-400/60 to-transparent md:block" />

          {resume.experience.map((role, index) => (
            <motion.div
              key={`${role.company}-${role.role}`}
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              whileHover={{ y: -4, scale: 1.01 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: index * 0.12 }}
              className="relative grid gap-4 md:grid-cols-[80px_1fr]"
            >
              <div className="hidden md:flex md:justify-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-sky-400/40 bg-slate-900/80 shadow-[0_0_24px_rgba(56,189,248,0.28)]">
                  <BriefcaseBusiness className="h-4 w-4 text-sky-300" />
                </div>
              </div>

              <GlassCard className="p-3.5 sm:p-5 md:p-8" glow>
                <div className="mb-4 flex items-center justify-between">
                  <div className="h-px flex-1 bg-gradient-to-r from-sky-500/60 via-cyan-400/40 to-transparent" />
                  <span className="mx-3 rounded-full border border-sky-400/40 bg-sky-500/10 px-2 py-1 text-[9px] uppercase tracking-[0.25em] text-sky-200">
                    {index + 1}
                  </span>
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-violet-400/40 to-violet-500/60" />
                </div>
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="text-sm uppercase tracking-[0.24em] text-sky-300">{role.role}</div>
                    <h3 className="mt-2 text-2xl font-semibold text-white">{role.company}</h3>
                  </div>
                  <div className="text-sm text-slate-300">
                    <div>{role.period}</div>
                    {role.location ? <div className="text-slate-400">{role.location}</div> : null}
                  </div>
                </div>

                <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-200">
                  {role.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-sky-300" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
