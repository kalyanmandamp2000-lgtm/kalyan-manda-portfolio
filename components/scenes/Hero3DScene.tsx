"use client";

import { motion } from "framer-motion";
import { Braces, Check, Cloud, Database, Globe2 } from "lucide-react";

export function Hero3DScene() {
  return (
    <div className="relative aspect-[1.08] w-full overflow-hidden rounded-lg border border-white/10 bg-[#0b0918] p-4 shadow-[0_28px_90px_rgba(0,0,0,0.45)] sm:aspect-[1.2] sm:p-6">
      <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.12)_1px,transparent_1px)] [background-size:26px_26px] [mask-image:linear-gradient(to_bottom_right,black,transparent_85%)]" />

      <div className="relative flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono text-[9px] uppercase tracking-[0.16em] text-slate-400">
          <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,.8)]" />Platform overview</span>
          <span>01 / 03</span>
        </div>

        <div className="grid flex-1 grid-cols-[48px_1fr] gap-3 py-4 sm:grid-cols-[58px_1fr] sm:gap-4 sm:py-5">
          <div className="flex flex-col items-center gap-3 border-r border-white/10 pr-3 text-slate-500">
            {[Braces, Cloud, Database, Globe2].map((Icon, index) => (
              <span key={index} className={`grid h-8 w-8 place-items-center rounded-md ${index === 0 ? "bg-cyan-300/10 text-cyan-200" : "bg-white/[0.03]"}`}><Icon className="h-4 w-4" /></span>
            ))}
          </div>

          <div className="flex min-w-0 flex-col justify-between">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-cyan-200">Experience platform</p>
              <p className="mt-2 text-xl font-semibold text-white sm:text-2xl">Content, connected.</p>
              <p className="mt-1 max-w-xs text-xs leading-5 text-slate-400">Composable Sitecore solutions for teams shipping across channels.</p>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="rounded-md border border-white/10 bg-[#151027] p-3">
                <span className="flex items-center gap-2 text-[9px] uppercase tracking-[0.12em] text-slate-400"><Cloud className="h-3.5 w-3.5 text-cyan-200" />Delivery</span>
                <strong className="mt-2 block text-sm font-medium text-white sm:text-base">XM Cloud</strong>
              </motion.div>
              <motion.div animate={{ y: [0, 3, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }} className="rounded-md border border-white/10 bg-[#151027] p-3">
                <span className="flex items-center gap-2 text-[9px] uppercase tracking-[0.12em] text-slate-400"><Database className="h-3.5 w-3.5 text-amber-200" />Architecture</span>
                <strong className="mt-2 block text-sm font-medium text-white sm:text-base">Reusable by design</strong>
              </motion.div>
            </div>

            <div className="flex items-center justify-between gap-2 border-t border-white/10 pt-3 font-mono text-[8px] uppercase tracking-[0.12em] text-slate-500 sm:text-[9px]">
              <span>Content model / API / experience</span>
              <span className="flex shrink-0 items-center gap-1.5 text-emerald-200"><Check className="h-3 w-3" />Ready to ship</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
