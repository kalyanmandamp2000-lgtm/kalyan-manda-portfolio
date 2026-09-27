"use client";

import { motion } from "framer-motion";
import { Award, BriefcaseBusiness, Code2, ContactRound, GraduationCap, Home, NotebookText } from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
  { id: "hero", label: "Home", icon: Home },
  { id: "experience", label: "Experience", icon: BriefcaseBusiness },
  { id: "skills", label: "Skills", icon: Code2 },
  { id: "projects", label: "Projects", icon: NotebookText },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "certificates", label: "Certificates", icon: Award },
  { id: "contact", label: "Contact", icon: ContactRound },
];

export function FloatingNavigation() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const updateActiveSection = () => {
      const sections = navItems
        .map(({ id }) => document.getElementById(id))
        .filter((section): section is HTMLElement => section !== null);

      if (!sections.length) return;

      const viewportCenter = window.innerHeight * 0.38;
      const activationWindow = window.innerHeight * 0.24;

      const inFocusSections = sections.filter((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= viewportCenter + activationWindow && rect.bottom >= viewportCenter - activationWindow;
      });

      const candidateSections = inFocusSections.length > 0 ? inFocusSections : sections;

      const nextActive = candidateSections.reduce((closest, section) => {
        const currentRect = section.getBoundingClientRect();
        const closestRect = document.getElementById(closest)?.getBoundingClientRect();
        const currentDistance = Math.abs(currentRect.top - viewportCenter);
        const closestDistance = closestRect ? Math.abs(closestRect.top - viewportCenter) : Number.POSITIVE_INFINITY;

        return currentDistance < closestDistance ? section.id : closest;
      }, candidateSections[0].id);

      setActiveSection(nextActive);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-2.5 sm:px-4">
      <div className="mx-auto max-w-5xl">
        <motion.nav
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-full border border-sky-400/20 bg-slate-950/75 px-1 py-1.5 shadow-[0_18px_50px_rgba(15,23,42,0.55)] backdrop-blur-2xl"
        >
          <div className="flex items-center justify-center gap-[2px] overflow-x-auto px-0.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className={[
                    "group relative inline-flex items-center justify-center gap-1 rounded-full px-1.5 py-1.5 text-left transition-all duration-200 sm:gap-2 sm:px-2.5",
                    isActive
                      ? "border border-sky-400/35 bg-slate-900/90 text-sky-50 shadow-[0_0_0_1px_rgba(56,189,248,0.08),0_0_18px_rgba(56,189,248,0.22)]"
                      : "text-slate-300 hover:bg-slate-900/60 hover:text-slate-100",
                  ].join(" ")}
                  aria-label={item.label}
                >
                  <span
                    className={[
                      "relative flex h-5 w-5 items-center justify-center rounded-full border transition-all duration-200 sm:h-6 sm:w-6",
                      isActive
                        ? "border-sky-300/70 bg-sky-500/20 shadow-[0_0_18px_rgba(56,189,248,0.28)]"
                        : "border-slate-700/80 bg-slate-900/90 group-hover:border-sky-300/60",
                    ].join(" ")}
                  >
                    <Icon className={[
                      "h-2.5 w-2.5 transition-all duration-200 sm:h-3 sm:w-3",
                      isActive ? "text-sky-100" : "text-slate-400 group-hover:text-sky-200",
                    ].join(" ")} />
                  </span>

                  <span className="relative hidden text-[7px] uppercase tracking-[0.18em] sm:inline sm:text-[8px]">
                    {item.label}
                    {isActive ? (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute -bottom-1.5 left-0 h-0.5 w-full rounded-full bg-gradient-to-r from-sky-300 via-cyan-300 to-sky-500 shadow-[0_0_20px_rgba(125,211,252,0.9)]"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.45 }}
                      />
                    ) : null}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.nav>
      </div>
    </header>
  );
}
