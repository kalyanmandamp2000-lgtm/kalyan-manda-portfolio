import { NextResponse } from "next/server";
import { readAnalyticsState, writeAnalyticsState, type AnalyticsEventName } from "@/lib/analytics-store";

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
    const event = body.event as AnalyticsEventName | undefined;
    const visitorId = String(body.visitorId ?? `anonymous-${Date.now()}`);

    if (!event || !(event in state.events)) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    if (!state.visitors.includes(visitorId)) {
      state.visitors.push(visitorId);
    }

    state.events[event] = (state.events[event] ?? 0) + 1;

    state.history.push({
      event,
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
