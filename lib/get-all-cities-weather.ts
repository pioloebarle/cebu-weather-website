import { prisma } from "@/lib/prisma";
import { fetchCurrentWeather, fetchHourlyForecast, fetchDailyForecast } from "@/lib/openweather";
import { CityWeatherData, CurrentWeather } from "@/types/weather";

export async function getAllCitiesWeather() : Promise<CityWeatherData[]>{
    const cities = await prisma.city.findMany({
        orderBy: [
            { region: "asc" },
            { id: "asc" }
        ],
    });

    const results = await Promise.all(cities.map(async (city) => {
        // const current = await fetchCurrentWeather(city.lat, city.lon);
        // const hourly = await fetchHourlyForecast(city.lat, city.lon);
        // const daily = await fetchDailyForecast(city.lat, city.lon);
        return { 
            cityName: city.name,
            slug: city.slug,
            region: city.region as "Metro Cebu" | "Northern Cebu" | "Southern Cebu",
            lat: city.lat,
            lon: city.lon,
            current: city.weatherData as unknown as CurrentWeather,
            hourly: [], 
            daily: [], 
            lastFetched: city.lastFetched,  
            advisory: { active: false, riskLevel: null, summary: null },
        };
    }));
    return results;
}

export async function getCityWeather(slug: string) : Promise<CityWeatherData | null> {
    const city = await prisma.city.findUnique({ where: { slug }});
    if(!city) return null;

    // const current = await fetchCurrentWeather(city.lat, city.lon);
    // const hourly = await fetchHourlyForecast(city.lat, city.lon);
    // const daily = await fetchDailyForecast(city.lat, city.lon);
    return {
        cityName: city.name,
        slug: city.slug,
        region: city.region as "Metro Cebu" | "Northern Cebu" | "Southern Cebu",
        lat: city.lat,
        lon: city.lon,
        current: city.weatherData as unknown as CurrentWeather,
        hourly: [], 
        daily: [],   
        lastFetched: city.lastFetched,
        advisory: { active: false, riskLevel: null, summary: null },
    }
}