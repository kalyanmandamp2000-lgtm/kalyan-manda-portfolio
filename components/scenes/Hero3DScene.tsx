"use client";

import { motion } from "framer-motion";

export function Hero3DScene() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#07151f] shadow-[0_30px_90px_rgba(59,130,246,0.12)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.18),transparent_43%)]" />
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.12)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(circle_at_center,black_45%,transparent_100%)]" />

      <motion.div
        animate={{ y: [0, -18, 0], x: [0, 16, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[12%] top-[16%] h-40 w-40 rounded-full border border-sky-300/30 bg-sky-500/10 blur-2xl"
      />
      <motion.div
        animate={{ y: [0, 20, 0], x: [0, -20, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[16%] top-[20%] h-52 w-52 rounded-full border border-cyan-300/25 bg-cyan-400/10 blur-3xl"
      />
      <motion.div
        animate={{ y: [0, -12, 0], x: [0, 12, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[14%] left-[28%] h-32 w-32 rounded-full border border-violet-300/20 bg-violet-500/10 blur-2xl"
      />

      <div className="absolute inset-0 [transform:perspective(1000px)_rotateX(58deg)] opacity-35">
        <div className="absolute inset-x-8 bottom-[-30%] h-[65%] border border-sky-300/15 bg-gradient-to-t from-sky-500/10 to-transparent" />
      </div>
    </div>
  );
}
