import { CurrentWeather, HourlyForecast, DailyForecast } from '@/types/weather';

const BASE_URL = "https://api.openweathermap.org/data/4.0/onecall";

export async function fetchCurrentWeather(lat: number, lon: number): Promise<CurrentWeather> {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  const url = `${BASE_URL}/current?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  const response = await fetch(url);

  if(!response.ok) {
    throw new Error(`Failed to fetch OpenWeather current weather data: ${response.statusText}`);
  }

  const data = await response.json();
  return data.data[0];
}

export async function fetchHourlyForecast(lat: number, lon: number): Promise<HourlyForecast[]> {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  const url = `${BASE_URL}/timeline/1h?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  console.log("Fetching:", url); // ← temporary debug line

  const response = await fetch(url, { cache: "no-store" });

  if(!response.ok) {
    throw new Error(`Failed to fetch OpenWeather hourly forecast data: ${response.statusText}`);
  }

  const data = await response.json();
  return data.data; //change accordingly
}

export async function fetchDailyForecast(lat: number, lon: number): Promise<DailyForecast[]> {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  const url = `${BASE_URL}/timeline/1day?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  const response = await fetch(url);

  if(!response.ok) {
    throw new Error(`Failed to fetch OpenWeather daily forecast data: ${response.statusText}`);
  }

  const data = await response.json();
  return data.data; //change accordingly
}