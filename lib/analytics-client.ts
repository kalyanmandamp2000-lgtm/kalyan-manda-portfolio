export type AnalyticsEventName =
  | "page_view"
  | "section_view"
  | "resume_download"
  | "email_click"
  | "linkedin_click"
  | "github_click"
  | "project_click";

const STORAGE_KEY = "portfolio-visitor-id";
const SECTION_KEY_PREFIX = "portfolio-section-";

function getVisitorId(): string {
  if (typeof window === "undefined") {
    return "server";
  }

  const existing = window.localStorage.getItem(STORAGE_KEY);
  if (existing) {
    return existing;
  }

  const value = crypto.randomUUID();
  window.localStorage.setItem(STORAGE_KEY, value);
  return value;
}

export async function trackEvent(
  eventName: AnalyticsEventName,
  metadata: Record<string, string | number | boolean | undefined> = {},
): Promise<void> {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const payload = {
      event: eventName,
      visitorId: getVisitorId(),
      ...metadata,
    };

    await fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    // Silently fail analytics when the browser cannot reach the API.
  }
}

export function trackSectionView(sectionName: string): void {
  if (typeof window === "undefined") {
    return;
  }

  const key = `${SECTION_KEY_PREFIX}${sectionName}`;
  if (window.sessionStorage.getItem(key)) {
    return;
  }

  window.sessionStorage.setItem(key, "true");
  void trackEvent("section_view", { section: sectionName });
}
