import type { PropsWithChildren, ReactNode } from "react";

interface GlassCardProps extends PropsWithChildren {
  className?: string;
  glow?: boolean;
  children?: ReactNode;
}

export function GlassCard({ className = "", glow = false, children }: GlassCardProps) {
  return (
    <div
      className={[
        "group relative overflow-hidden rounded-3xl border border-slate-700/80 bg-slate-900/60 backdrop-blur-xl shadow-[0_18px_60px_rgba(15,23,42,0.42)] transition-all duration-300 hover:-translate-y-1 hover:border-sky-400/60 hover:shadow-[0_30px_80px_rgba(59,130,246,0.14)]",
        glow ? "before:absolute before:inset-0 before:rounded-3xl before:bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),transparent_55%)] before:content-['']" : "",
        className,
      ].join(" ")}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/8 via-transparent to-sky-500/5" />
      <div className="relative">{children}</div>
    </div>
  );
}
