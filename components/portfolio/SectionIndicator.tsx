"use client";

import { motion } from "framer-motion";

export function SectionIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 sm:bottom-7" aria-label={`Section ${current + 1} of ${total}`}>
      <div className="flex items-center gap-3 rounded-full border border-white/10 bg-slate-950/75 px-3 py-2 shadow-[0_18px_50px_rgba(15,23,42,0.6)] backdrop-blur-xl">
        <span className="font-mono text-[10px] tracking-[0.2em] text-slate-400">{String(current + 1).padStart(2, "0")}</span>

        <div className="flex items-center gap-1.5">
          {Array.from({ length: total }, (_, index) => (
            <motion.span
              key={index}
              animate={{ opacity: index === current ? 1 : 0.35, scale: index === current ? 1.2 : 1 }}
              className={`h-1.5 rounded-full ${index === current ? "w-4 bg-sky-300 shadow-[0_0_10px_rgba(125,211,252,.8)]" : "w-1.5 bg-slate-500"}`}
            />
          ))}
        </div>

        <span className="font-mono text-[10px] tracking-[0.2em] text-slate-500">/{String(total).padStart(2, "0")}</span>
      </div>
    </div>
  );
}
