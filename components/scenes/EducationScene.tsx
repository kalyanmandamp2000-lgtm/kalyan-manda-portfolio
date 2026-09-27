"use client";

import { motion } from "framer-motion";
import { Award, GraduationCap } from "lucide-react";
import { useEffect } from "react";

import { resume } from "@/lib/resume";
import { trackSectionView } from "@/lib/analytics-client";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function EducationScene() {
  useEffect(() => {
    const section = document.getElementById("education");
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            trackSectionView("education");
          }
        });
      },
      { threshold: 0.4 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="education" className="px-4 py-16 md:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="04 / Education"
          title="Academic foundation"
          description="A solid base in computer science and technology that supports a practical, systems-oriented engineering mindset."
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {resume.education.map((item, index) => (
            <motion.div
              key={item.degree}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="h-full"
            >
              <GlassCard className="h-full p-6" glow>
                <div className="mb-4 flex items-center gap-4">
                  <div className="rounded-2xl border border-sky-400/40 bg-sky-500/10 p-3 text-sky-200">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.28em] text-slate-400">Degree</div>
                    <h3 className="mt-2 text-xl font-semibold text-white">{item.degree}</h3>
                  </div>
                </div>

                <div className="space-y-2 text-slate-200">
                  <div>{item.institution}</div>
                  <div className="text-sm text-slate-400">{item.period}</div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CertificationScene() {
  useEffect(() => {
    const section = document.getElementById("certificates");
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            trackSectionView("certificates");
          }
        });
      },
      { threshold: 0.4 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="certificates" className="px-4 pb-20 pt-16 md:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="05 / Certifications"
          title="Professional credentials"
          description="Industry-recognized validation that complements hands-on delivery across Sitecore and digital experience platforms."
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {resume.certifications.map((certification, index) => {
            const cardContent = (
              <GlassCard className="h-full p-6" glow>
                <div className="mb-4 flex items-center gap-4">
                  <div className="rounded-2xl border border-violet-400/40 bg-violet-500/10 p-3 text-violet-200">
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.28em] text-slate-400">Certification</div>
                    <h3 className="mt-2 text-xl font-semibold text-white">{certification.title}</h3>
                  </div>
                </div>

                <div className="text-sm text-slate-300">Verified professional credential</div>
              </GlassCard>
            );

            return (
              <motion.div
                key={certification.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="h-full"
              >
                {certification.url ? (
                  <a
                    href={certification.url}
                    target="_blank"
                    rel="noreferrer"
                    className="block h-full rounded-3xl focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/80"
                    aria-label={`View certification details for ${certification.title}`}
                  >
                    {cardContent}
                  </a>
                ) : (
                  <div className="h-full">{cardContent}</div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
