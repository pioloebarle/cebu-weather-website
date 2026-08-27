import { getAllCitiesWeather } from "@/lib/get-all-cities-weather";
import { fetchCurrentWeather } from "@/lib/openweather";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await getAllCitiesWeather();
  return NextResponse.json(data);
}