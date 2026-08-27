import { Prisma } from "../app/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { fetchCurrentWeather } from "@/lib/openweather";

interface RefreshResult {
  city: string;
  success: boolean;
  error?: string;
}

export async function refreshAllCitiesWeather() {
  const cities = await prisma.city.findMany();
  const results: RefreshResult[] = [];

  for (const city of cities) {
    try {
      const current = await fetchCurrentWeather(city.lat, city.lon);
      await prisma.city.update({
        where: { id: city.id },
        data: {
          weatherData: current as unknown as Prisma.InputJsonValue,
          lastFetched: new Date(),
        },
      });
      results.push({ city: city.name, success: true });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error(`Failed to refresh weather for ${city.name}: ${message}`);
      results.push({ city: city.name, success: false, error: message });
    }
  }

  const successCount = results.filter((r) => r.success).length;
  const failedCities = results.filter((r) => !r.success);

  console.log(`Refreshed ${successCount}/${cities.length} cities.`);
  if (failedCities.length > 0) {
    console.log("Failed cities:", JSON.stringify(failedCities, null, 2));
  }

  return { total: cities.length, succeeded: successCount, failed: failedCities };
}