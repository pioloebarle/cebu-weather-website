export interface CurrentWeather {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
}

export interface HourlyForecast {
  dt: number;
  temp: number;
  pop: number;               // probability of precipitation (0-1)
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
}

export interface DailyForecast {
  dt: number;
  temp: {
    min: number;
    max: number;
  };
  summary: string;            // human-readable daily summary (One Call 3.0 feature)
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
}

export interface CityWeatherData {
  cityName: string;
  slug: string;
  lat: number;
  lon: number;
  region: "Metro Cebu" | "Northern Cebu" | "Southern Cebu";
  current: CurrentWeather;
  hourly: HourlyForecast[];   // next 24
  daily: DailyForecast[];     // next 7
  advisory: {
    active: boolean;
    riskLevel: "low" | "moderate" | "high" | "severe" | null;
    summary: string | null;
  };
}