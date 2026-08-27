import { refreshAllCitiesWeather } from "@/lib/refresh-weather";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const expected = `Bearer ${process.env.CRON_SECRET}`;

  console.log("Received header:", authHeader);
  console.log("Expected:", expected);

  if (authHeader !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await refreshAllCitiesWeather();
  return NextResponse.json({ success: true, timestamp: new Date().toISOString() });
}