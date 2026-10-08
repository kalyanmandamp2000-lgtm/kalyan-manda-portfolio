"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export function LoadingExperience({ onComplete }: { onComplete: () => void }) {
  const reduceMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const startedAt = performance.now();
    const duration = reduceMotion ? 320 : 1150;
    let frame = 0;
    let completionTimer = 0;

    const update = (now: number) => {
      const next = Math.min(100, Math.round(((now - startedAt) / duration) * 100));
      setProgress(next);
      if (next < 100) frame = requestAnimationFrame(update);
      else completionTimer = window.setTimeout(() => {
        setVisible(false);
        onComplete();
      }, reduceMotion ? 0 : 420);
    };

    frame = requestAnimationFrame(update);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(completionTimer);
    };
  }, [onComplete, reduceMotion]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#050b13]" exit={{ opacity: 0, scale: 1.04 }} transition={{ duration: reduceMotion ? 0 : 0.65 }} aria-live="polite" aria-label="Loading portfolio experience">
          <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(125,211,252,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(125,211,252,.08)_1px,transparent_1px)] [background-size:44px_44px]" />
          <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/10 blur-[90px]" />
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} className="absolute h-56 w-56 rounded-full border border-sky-300/15 border-t-sky-300/80 border-r-cyan-300/30 shadow-[0_0_40px_rgba(56,189,248,0.18)]" />

          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="mb-5 rounded-full border border-sky-400/20 bg-slate-950/55 px-4 py-2 font-mono text-5xl font-medium tracking-[-0.08em] text-white shadow-[0_0_30px_rgba(56,189,248,0.1)] sm:text-6xl">
              {progress}
              <span className="text-sky-300">%</span>
            </div>

            <div className="mb-4 h-px w-48 overflow-hidden bg-white/10">
              <motion.div className="h-full bg-gradient-to-r from-sky-400 to-cyan-300" animate={{ width: `${progress}%` }} transition={{ duration: 0.15 }} />
            </div>

            <div className="text-[10px] uppercase tracking-[0.38em] text-slate-400">Loading experience</div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
