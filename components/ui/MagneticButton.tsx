"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
}

export function MagneticButton({ href, onClick, children, className = "" }: MagneticButtonProps) {
  return (
    <motion.a
      href={href}
      onClick={onClick}
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className={[
        "inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-slate-100 transition hover:border-sky-300/50 hover:bg-slate-800/80",
        className,
      ].join(" ")}
    >
      {children}
    </motion.a>
  );
}
