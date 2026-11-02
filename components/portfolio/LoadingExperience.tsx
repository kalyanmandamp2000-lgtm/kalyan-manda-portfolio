"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const messages = [
  { at: 0, text: "INITIALIZING SYSTEM" },
  { at: 25, text: "LOADING ASSETS" },
  { at: 50, text: "BUILDING INTERFACE" },
  { at: 75, text: "OPTIMIZING EXPERIENCE" },
  { at: 100, text: "WELCOME ABOARD" },
];

export function LoadingExperience({ onComplete }: { onComplete: () => void }) {
  const reduceMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const status = [...messages].reverse().find((message) => progress >= message.at)?.text ?? messages[0].text;

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
        <motion.div className="loader-overlay" exit={{ opacity: 0, scale: 1.025 }} transition={{ duration: reduceMotion ? 0 : 0.65 }} aria-live="polite" aria-label="Loading portfolio experience">
          <div className="loader-grid" aria-hidden="true" />

          <div className="loader-content">
            <div className="loader-scene" aria-hidden="true">
              <div className="loader-orbit loader-orbit-one" />
              <div className="loader-orbit loader-orbit-two" />
              <div className="loader-cube">
                <span className="loader-face loader-face-front" />
                <span className="loader-face loader-face-back" />
                <span className="loader-face loader-face-right" />
                <span className="loader-face loader-face-left" />
                <span className="loader-face loader-face-top" />
                <span className="loader-face loader-face-bottom" />
              </div>
            </div>

            <div className="loader-copy">
              <p className="loader-eyebrow">PORTFOLIO.EXE</p>
              <h1 className="loader-title">CRAFTING <span className="loader-title-accent">DIGITAL</span><br /><span className="loader-title-primary">EXPERIENCES</span><span className="loader-cursor">_</span></h1>
              <p className="loader-subtitle">Building something meaningful, one pixel at a time.</p>

              <div className="loader-progress-area">
                <div className="loader-progress-info">
                  <span className="loader-status">{status}</span>
                  <span className="loader-percent">{String(progress).padStart(2, "0")}%</span>
                </div>
                <div className="loader-track" role="progressbar" aria-label="Portfolio loading progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>
                  <motion.div className="loader-bar" animate={{ width: `${progress}%` }} transition={{ duration: 0.15 }} />
                </div>
              </div>
            </div>
          </div>

          <div className="loader-footer"><span>DESIGNED TO CREATE</span><span>V.01 / 2026</span></div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
