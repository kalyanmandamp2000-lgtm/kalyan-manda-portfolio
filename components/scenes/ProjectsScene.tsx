"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, GitBranch, Link2 } from "lucide-react";
import { useEffect } from "react";

import { resume } from "@/lib/resume";
import { trackEvent, trackSectionView } from "@/lib/analytics-client";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function ProjectsScene() {
  useEffect(() => {
    const section = document.getElementById("projects");
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            trackSectionView("projects");
          }
        });
      },
      { threshold: 0.35 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" className="px-4 py-16 md:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="03 / Projects"
          title="Selected work across CMS, commerce, and platform delivery"
          description="These projects reflect a practical approach to delivery: building flexible systems, improving performance, and creating experiences that scale with real-world business requirements."
        />

        <div className="grid gap-4 sm:gap-5 lg:grid-cols-2 lg:gap-6">
          {resume.projects.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6, rotateX: 1.2, rotateY: -1.2 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.65, delay: index * 0.08 }}
              style={{ transformPerspective: 1200 }}
            >
              <GlassCard className="h-full p-3.5 sm:p-5 md:p-6" glow>
                <div className="mb-4 flex items-center justify-between gap-4">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.28em] text-sky-300">{project.role ?? "Project"}</div>
                    <h3 className="mt-2 text-2xl font-semibold text-white">{project.name}</h3>
                  </div>
                  <div className="flex gap-2">
                    {project.links?.map((link) => (
                      <a
                        key={link.label}
                        href={link.url ?? "#"}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => void trackEvent("project_click", { project: project.name, source: "projects" })}
                        className="rounded-full border border-sky-400/30 bg-sky-500/10 p-2 text-sky-200 transition hover:bg-sky-500/20"
                        aria-label={link.label}
                      >
                        {link.label.toLowerCase().includes("github") ? <GitBranch className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                      </a>
                    ))}
                    {!project.links?.length ? (
                      <div className="rounded-full border border-slate-700/80 bg-slate-900/60 p-2 text-slate-200">
                        <Link2 className="h-4 w-4" />
                      </div>
                    ) : null}
                  </div>
                </div>

                <p className="mb-4 text-base leading-7 text-slate-300">{project.summary}</p>

                <div className="mb-5 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <motion.span
                      key={tech}
                      whileHover={{ scale: 1.05, borderColor: "rgba(59,130,246,0.8)" }}
                      className="rounded-full border border-slate-700/80 bg-slate-900/70 px-2.5 py-1 text-xs text-slate-200"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>

                <ul className="space-y-3 text-sm leading-7 text-slate-200">
                  {project.highlights.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-violet-300" />
                      <span>{point}</span>
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
