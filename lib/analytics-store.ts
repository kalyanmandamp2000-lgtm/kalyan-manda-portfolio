import fs from "node:fs/promises";
import path from "node:path";

export type AnalyticsEventName =
  | "page_view"
  | "section_view"
  | "resume_download"
  | "email_click"
  | "linkedin_click"
  | "github_click"
  | "project_click";

export interface AnalyticsEntry {
  event: AnalyticsEventName;
  source?: string;
  section?: string;
  project?: string;
  timestamp: string;
}

export interface AnalyticsState {
  visitors: string[];
  events: Record<string, number>;
  history: AnalyticsEntry[];
}

const analyticsPath = path.join(process.cwd(), ".portfolio-analytics.json");

export const defaultAnalyticsState: AnalyticsState = {
  visitors: [],
  events: {
    page_view: 0,
    section_view: 0,
    resume_download: 0,
    email_click: 0,
    linkedin_click: 0,
    github_click: 0,
    project_click: 0,
  },
  history: [],
};

export async function readAnalyticsState(): Promise<AnalyticsState> {
  try {
    const raw = await fs.readFile(analyticsPath, "utf8");
    const parsed = JSON.parse(raw) as Partial<AnalyticsState>;

    return {
      visitors: Array.isArray(parsed.visitors) ? parsed.visitors : [],
      events: { ...defaultAnalyticsState.events, ...(parsed.events ?? {}) },
      history: Array.isArray(parsed.history) ? parsed.history : [],
    };
  } catch {
    await writeAnalyticsState(defaultAnalyticsState);
    return defaultAnalyticsState;
  }
}

export async function writeAnalyticsState(state: AnalyticsState): Promise<void> {
  await fs.writeFile(analyticsPath, JSON.stringify(state, null, 2), "utf8");
}

export async function getAnalyticsSummary() {
  const state = await readAnalyticsState();
  const totalVisitors = state.visitors.length;
  const resumeDownloads = state.events.resume_download ?? 0;
  const emailClicks = state.events.email_click ?? 0;
  const linkedinClicks = state.events.linkedin_click ?? 0;
  const githubClicks = state.events.github_click ?? 0;
  const projectClicks = state.events.project_click ?? 0;

  return {
    totalVisitors,
    totalPageViews: state.events.page_view ?? 0,
    resumeDownloads,
    emailClicks,
    linkedinClicks,
    githubClicks,
    projectClicks,
    resumeDownloadRate: totalVisitors > 0 ? (resumeDownloads / totalVisitors) * 100 : 0,
    emailClickRate: totalVisitors > 0 ? (emailClicks / totalVisitors) * 100 : 0,
    linkedinClickRate: totalVisitors > 0 ? (linkedinClicks / totalVisitors) * 100 : 0,
    history: state.history.slice(-100),
  };
}
