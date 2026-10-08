"use client";

import { motion } from "framer-motion";
import { Aperture, Layers3, Network } from "lucide-react";

import { resume } from "@/lib/resume";

export function AboutScene() {
  return (
    <section id="about" className="portfolio-section" aria-labelledby="about-heading">
      <div className="portfolio-shell">
        <motion.div initial={{ opacity: 0, y: 24, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.65 }} className="mx-auto max-w-4xl text-center">
          <div className="section-kicker">About me</div>
          <h2 id="about-heading" className="section-heading">Engineering digital products with clarity, scale, and purpose.</h2>
          <div className="mx-auto my-5 h-px w-24 bg-gradient-to-r from-transparent via-sky-300 to-transparent" />
          <p className="section-copy mx-auto">{resume.personal.summary}</p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3 text-xs uppercase tracking-[0.2em] text-slate-400">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3 py-2"><Aperture className="h-3.5 w-3.5 text-sky-300" /> Enterprise CMS</span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3 py-2"><Layers3 className="h-3.5 w-3.5 text-violet-300" /> Scalable systems</span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3 py-2"><Network className="h-3.5 w-3.5 text-cyan-300" /> Connected experiences</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
