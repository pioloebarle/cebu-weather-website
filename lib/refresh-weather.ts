import { Prisma } from "../app/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { fetchCurrentWeather } from "@/lib/openweather";

export async function refreshAllCitiesWeather() {
  const cities = await prisma.city.findMany();

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
    } catch (err) {
      console.error(`Failed to refresh weather for ${city.name}:`, err);
    }
  }

  console.log(`Refreshed weather for ${cities.length} cities.`);
}