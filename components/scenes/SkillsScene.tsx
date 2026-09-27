"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";

import { resume } from "@/lib/resume";
import { trackSectionView } from "@/lib/analytics-client";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function SkillsScene() {
  useEffect(() => {
    const section = document.getElementById("skills");
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            trackSectionView("skills");
          }
        });
      },
      { threshold: 0.4 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="px-4 py-16 md:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="02 / Skills"
          title="Focused on the tools that power modern digital platforms"
          description="My work brings together content architecture, personalization, integrations, search, and application delivery to build healthy, high-performing digital experiences."
        />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {resume.skills.map((group, index) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5, scale: 1.01 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
            >
              <GlassCard className="h-full p-6" glow>
                <div className="mb-5 flex items-center justify-between">
                  <div className="text-xs uppercase tracking-[0.28em] text-sky-300">{group.category}</div>
                  <span className="rounded-full border border-sky-400/30 bg-sky-500/10 px-2 py-1 text-[9px] uppercase tracking-[0.2em] text-sky-200">
                    stack
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <motion.span
                      key={skill}
                      whileHover={{ scale: 1.05, borderColor: "rgba(103, 232, 249, 0.8)" }}
                      className="rounded-full border border-slate-700/80 bg-slate-900/60 px-3 py-2 text-sm text-slate-200 transition-colors"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
