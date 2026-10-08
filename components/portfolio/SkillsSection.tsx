  "use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Braces, Code2, Database, Layers3, Server, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";

import { resume } from "@/lib/resume";

const categoryIcons = [Layers3, Braces, Code2, Database, Server];
const categoryColors = [
{ accent: "#f59e0b", glow: "rgba(245, 158, 11, .22)" },
{ accent: "#a78bfa", glow: "rgba(167, 139, 250, .22)" },
{ accent: "#facc15", glow: "rgba(250, 204, 21, .22)" },
{ accent: "#34d399", glow: "rgba(52, 211, 153, .22)" },
{ accent: "#38bdf8", glow: "rgba(56, 189, 248, .22)" },
];

export function SkillsSection() {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const activeGroup = resume.skills[activeIndex];
  const activeColor = categoryColors[activeIndex];

  const cards = useMemo(
    () =>
      resume.skills.map((group, index) => {
        const Icon = categoryIcons[index] ?? Sparkles;
        return { ...group, Icon, ...categoryColors[index] };
      }),
    [],
  );

  return (
    <section id="skills" className="portfolio-section" aria-labelledby="skills-heading">
      <div className="portfolio-shell flex min-h-full flex-col justify-center py-4 sm:py-6">
        <div className="mb-5 text-center sm:mb-7">
          <div className="section-kicker">Technical expertise</div>
          <h2 id="skills-heading" className="section-heading">A stack built for scalable digital experiences.</h2>
          <p className="section-description">From Sitecore content platforms to .NET services, cloud workflows, and modern interfaces—each capability is connected by one outcome-focused approach.</p>
        </div>

        <div className="skills-3d-stage" aria-label="Technology skills orbit">
          <div className="skills-core" style={{ "--core-glow": activeColor.glow } as React.CSSProperties}>
            <div className="skills-core-ring skills-core-ring-one" />
            <div className="skills-core-ring skills-core-ring-two" />
            <div className="skills-core-content">
              <span className="skills-core-symbol">&lt;/&gt;</span>
              <span className="skills-core-title">
                <strong>DEVELOPER</strong>
              </span>
              <span>SITECORE · .NET</span>
            </div>
          </div>

          {cards.map((card, index) => {
            const isActive = index === activeIndex;
            return (
              <motion.button
                key={card.category}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-pressed={isActive}
                aria-label={`${card.category}: ${card.items.join(", ")}`}
                className={`skills-orbit-card skills-orbit-card-${index + 1} ${isActive ? "skills-orbit-card-active" : ""}`}
                style={{ "--card-accent": card.accent, "--card-glow": card.glow } as React.CSSProperties}
              >
                <span className="skills-card-number">0{index + 1}</span>
                <span className="skills-card-icon"><card.Icon className="h-5 w-5" /></span>
                <span className="skills-card-copy">
                  <span className="skills-card-category">{card.category}</span>
                  <strong>{card.items.length} technologies</strong>
                  <span className="skills-card-tags">{card.items.slice(0, 5).map((item) => <span key={item}>{item}</span>)}</span>
                </span>
              </motion.button>
            );
          })}

          <AnimatePresence mode="wait">
            <motion.div
              key={activeGroup.category}
              initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0, scale: 1.03 }}
              transition={{ duration: 0.28 }}
              className="skills-detail"
              role="status"
            >
              <span className="skills-detail-dot" style={{ background: activeColor.accent, boxShadow: `0 0 14px ${activeColor.glow}` }} />
              <span>{activeGroup.category}</span>
              <strong>{activeGroup.items.length} technologies</strong>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="skills-stats" aria-label="Core technology highlights">
          <div><strong>Sitecore</strong><span>Core expertise</span></div>
          <div><strong>.NET</strong><span>Backend</span></div>
          <div><strong>React</strong><span>Frontend</span></div>
          <div><strong>Azure</strong><span>Cloud & DevOps</span></div>
        </div>
      </div>
    </section>
  );
}
