import { notFound } from "next/navigation";

import { getAnalyticsSummary } from "@/lib/analytics-store";

export const dynamic = "force-dynamic";

export default async function AnalyticsPage() {
  if (!process.env.PORTFOLIO_ANALYTICS_TOKEN) {
    notFound();
  }

  const summary = await getAnalyticsSummary();

  return (
    <main className="mx-auto max-w-6xl px-6 py-24 text-slate-100">
      <div className="mb-10 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-sky-300">Dashboard</p>
          <h1 className="mt-3 text-4xl font-semibold text-white">Portfolio analytics</h1>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
          <div className="text-xs uppercase tracking-[0.22em] text-slate-400">Total Visitors</div>
          <div className="mt-3 text-3xl font-semibold text-white">{summary.totalVisitors}</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
          <div className="text-xs uppercase tracking-[0.22em] text-slate-400">Resume Downloads</div>
          <div className="mt-3 text-3xl font-semibold text-white">{summary.resumeDownloads}</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
          <div className="text-xs uppercase tracking-[0.22em] text-slate-400">Email Clicks</div>
          <div className="mt-3 text-3xl font-semibold text-white">{summary.emailClicks}</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
          <div className="text-xs uppercase tracking-[0.22em] text-slate-400">LinkedIn Clicks</div>
          <div className="mt-3 text-3xl font-semibold text-white">{summary.linkedinClicks}</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
          <div className="text-xs uppercase tracking-[0.22em] text-slate-400">Project Clicks</div>
          <div className="mt-3 text-3xl font-semibold text-white">{summary.projectClicks}</div>
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
          <div className="text-xs uppercase tracking-[0.22em] text-slate-400">Resume Download Rate</div>
          <div className="mt-3 text-2xl font-semibold text-white">{summary.resumeDownloadRate.toFixed(2)}%</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
          <div className="text-xs uppercase tracking-[0.22em] text-slate-400">Email Click Rate</div>
          <div className="mt-3 text-2xl font-semibold text-white">{summary.emailClickRate.toFixed(2)}%</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
          <div className="text-xs uppercase tracking-[0.22em] text-slate-400">LinkedIn Click Rate</div>
          <div className="mt-3 text-2xl font-semibold text-white">{summary.linkedinClickRate.toFixed(2)}%</div>
        </div>
      </div>

      <div className="mt-10 rounded-2xl border border-white/10 bg-slate-900/70 p-5">
        <div className="mb-4 text-xs uppercase tracking-[0.22em] text-slate-400">Recent Events</div>
        <div className="space-y-3">
          {summary.history.length ? summary.history.map((event, index) => (
            <div key={`${event.event}-${index}`} className="flex items-center justify-between border-b border-white/5 py-2 text-sm text-slate-300">
              <span>{event.event}</span>
              <span>{new Date(event.timestamp).toLocaleString()}</span>
            </div>
          )) : <div className="text-sm text-slate-400">No analytics events recorded yet.</div>}
        </div>
      </div>
    </main>
  );
}
