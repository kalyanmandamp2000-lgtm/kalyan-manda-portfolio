import { NextResponse } from "next/server";
import { readAnalyticsState, writeAnalyticsState } from "@/lib/analytics-store";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      event?: string;
      visitorId?: string;
      source?: string;
      section?: string;
      project?: string;
    };

    const state = await readAnalyticsState();
    const event = String(body.event ?? "");
    const visitorId = String(body.visitorId ?? `anonymous-${Date.now()}`);

    if (!state.visitors.includes(visitorId)) {
      state.visitors.push(visitorId);
    }

    state.events[event as keyof typeof state.events] =
      (state.events[event as keyof typeof state.events] ?? 0) + 1;

    state.history.push({
      event: event as any,
      source: body.source,
      section: body.section,
      project: body.project,
      timestamp: new Date().toISOString(),
    });

    await writeAnalyticsState(state);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

export async function GET() {
  const state = await readAnalyticsState();
  return NextResponse.json({
    visitors: state.visitors.length,
    events: state.events,
    history: state.history.slice(-20),
  });
}
