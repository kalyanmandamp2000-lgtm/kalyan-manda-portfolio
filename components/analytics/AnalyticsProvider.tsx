"use client";

import { useEffect } from "react";

import { trackEvent } from "@/lib/analytics-client";

export function AnalyticsProvider() {
  useEffect(() => {
    void trackEvent("page_view", { source: "app" });
  }, []);

  return null;
}
