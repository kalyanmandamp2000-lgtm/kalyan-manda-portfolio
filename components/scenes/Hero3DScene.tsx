"use client";

import { motion } from "framer-motion";

const codeLines = [
  "const sitecoreStack = {",
  "  cms: ['Sitecore XM', 'XM Cloud', 'SXA'],",
  "  backend: ['C#', '.NET', 'ASP.NET Core'],",
  "  integrations: ['GraphQL', 'Solr', 'REST'],",
  "  delivery: 'Multi-site and headless experiences'",
  "};",
  "",
  "function buildExperience() {",
  "  return sitecoreStack.delivery;",
  "}",
];

const statusItems = [
  { label: "Build", value: "success", tone: "green" },
  { label: "Tests", value: "passing", tone: "blue" },
  { label: "Deploy", value: "live", tone: "purple" },
];

export function Hero3DScene() {
  return (
    <div className="relative overflow-hidden rounded-[1.75rem] border border-slate-700/80 bg-[#081521] p-3 shadow-[0_30px_90px_rgba(59,130,246,0.12)]">
      <div className="soft-grid absolute inset-0 opacity-30" />
      <div className="relative z-10 rounded-[1.4rem] border border-slate-700/80 bg-slate-950/90 p-3">
        <div className="mb-3 flex items-center justify-between border-b border-slate-700/80 pb-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#f87171]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#fbbf24]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#4ade80]" />
          </div>
          <div className="rounded-full border border-sky-400/30 bg-sky-500/10 px-2 py-0.5 text-[9px] uppercase tracking-[0.25em] text-sky-200">
            developer-workspace
          </div>
        </div>

        <div className="grid gap-3 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-2xl border border-slate-700/80 bg-slate-900/90 p-3">
            <div className="mb-2 flex items-center justify-between text-[9px] uppercase tracking-[0.28em] text-slate-400">
              <span>app.tsx</span>
              <span className="text-emerald-300">synced</span>
            </div>
            <div className="space-y-1.5 font-mono text-[10px] text-slate-200">
              {codeLines.map((line, index) => (
                <div key={line || `${index}-${Math.random()}`} className="flex">
                  <span className="mr-2 text-slate-500">{index + 1}.</span>
                  <span
                    className={[
                      index === 0 ? "text-sky-300" : "",
                      line.includes("cms") || line.includes("backend") ? "text-cyan-300" : "",
                      line.includes("return") ? "text-emerald-300" : "",
                    ].join(" ")}
                  >
                    {line || " "}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="rounded-2xl border border-slate-700/80 bg-slate-900/90 p-3">
              <div className="mb-3 flex items-center justify-between text-[9px] uppercase tracking-[0.28em] text-slate-400">
                <span>terminal</span>
                <span className="text-emerald-300">online</span>
              </div>
              <div className="font-mono text-[10px] text-slate-200">
                <div className="mb-2 text-cyan-300">$ npm run build</div>
                <div className="mb-1 text-slate-300">✓ CMS components compiled</div>
                <div className="mb-1 text-slate-300">✓ Solr indexing optimized</div>
                <div className="text-emerald-300">✓ Deployment ready</div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-700/80 bg-slate-900/90 p-3">
              <div className="mb-2 text-[9px] uppercase tracking-[0.28em] text-slate-400">status</div>
              <div className="space-y-2">
                {statusItems.map((item) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0.7, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center justify-between rounded-xl border border-slate-700/80 bg-slate-950/80 px-2 py-1.5"
                  >
                    <span className="text-[10px] text-slate-300">{item.label}</span>
                    <span
                      className={[
                        "rounded-full px-1.5 py-0.5 text-[9px] uppercase tracking-[0.2em]",
                        item.tone === "green" ? "bg-emerald-500/15 text-emerald-300" : "",
                        item.tone === "blue" ? "bg-sky-500/15 text-sky-300" : "",
                        item.tone === "purple" ? "bg-violet-500/15 text-violet-300" : "",
                      ].join(" ")}
                    >
                      {item.value}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
