"use client";
import { CityWeatherData } from "@/types/weather";
import { useState } from "react";
import { useRouter } from "next/navigation";

const FAVORITES_KEY = "cebu-wx-favorites";

function isFav(id: string) {
  try {
    return (JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]") as string[]).includes(id);
  } catch { return false; }
}

function toggleFav(id: string) {
  try {
    const favs: string[] = JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");
    const next = favs.includes(id) ? favs.filter((x) => x !== id) : [...favs, id];
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
    return next.includes(id);
  } catch { return false; }
}

export default function CityHeader({ city }: { city: CityWeatherData }) {
    const router = useRouter();
    const [pinned, setPinned] = useState(() => isFav(city.slug ?? ""));
    
    return(
        <div>
            {/* Top nav */}
            <div className="flex flex-row justify-between items-center mb-9">
                <button
                    onClick={() => router.push("/")}
                    className="flex items-center gap-[6px] rounded-[12px] border border-white/10 bg-white/[0.06] px-4 py-2.5 text-[13px] font-body text-[#e8eaf2] cursor-pointer transition-colors duration-150 hover:bg-white/10"
                >
                    ← All Cities
                </button>
                <button
                    onClick={() => { const next = toggleFav(city.slug ?? ""); setPinned(next); }}
                    className={`
                        flex items-center gap-[6px] rounded-xl border px-4 py-2.5 
                        text-[13px] font-body cursor-pointer transition-all duration-150
                        ${pinned 
                            ? 'bg-amber-400/12 border-amber-400/30 text-amber-400'
                            : 'bg-white/[0.06] border-white/10 text-[#a8afc8]/70'
                        }
                    `}
                >
                    {pinned ? "★ Pinned" : "☆ Pin"}
                </button>
            </div>

            {/* City name and region - details */}
            <div className="mb-7">
                <div className="text-xs font-semibold tracking-[0.12em] text-[#7c9ef8]/80 uppercase mb-1">
                    {city.region}
                </div>
                <h1 className="font-display font-light text-[clamp(40px,4vw,44px)] text-[#e8eaf2] m-0 mb-4 tracking-[-0.03em] leading-[1.1]">
                    {city.cityName}
                </h1>

                <div className="flex flex-row gap-10 items-center">
                    {/* Temperature + Condition */}
                    <div className="flex flex-col">
                        <div className="flex flex-row">
                            <div className="font-display font-light text-[clamp(20px,13vw,124px)] text-[#e8eaf2] m-0 tracking-[-0.04em] leading-[1]">
                                {Math.round(city.current.temp)}
                            </div>
                            <div className="flex flex-col pt-3 ml-2">
                                <div className="text-[clamp(22px,3vw,37px)] text-semibold text-[#a8afc8]/60">°C</div>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={`https://openweathermap.org/img/wn/${city.current.weather[0].icon}@2x.png`}
                                    alt={city.current.weather[0].description}
                                    width={50}
                                    height={50}
                                />
                            </div>
                        </div>
                        <div className="capitalize tracking-[-0.01em] text-xl text-[#e8eaf2] mb-1">{city.current.weather[0].description}</div>
                        <div className="text-sm text-[#a8afc8]/55">
                            Feels like {Math.round(city.current.feels_like)}° &nbsp;·&nbsp; ☁️: {city.current.clouds}%
                        </div>
                    </div>
                    <div className="flex-1 grid grid-cols-[repeat(3,minmax(220px,1fr))] gap-3">
                        {[
                            { label: "Humidity", value: `${city.current.humidity}%`, icon: "💧" },
                            { label: "Wind", value: `${city.current.wind_speed} km/h`, sub: `(${city.current.wind_deg}°)`, icon: "💨" },
                            { label: "UV Index", value: String(city.current.uvi), icon: "🌞" },
                            { label: "Visibility", value: `${kmToMeters(city.current.visibility)} km`, icon: "👁" },
                            { label: "Pressure", value: `${city.current.pressure}`, sub: "hPa", icon: "📊" },
                            { label: "Sunrise", value: `${formatTime(city.current.sunrise)}`, sub: `↓ ${formatTime(city.current.sunset)}`, icon: "🌅" }
                        ].map((s) => (
                            <div key={s.label} className="bg-white/[0.04] border border-white/[0.07] rounded-2xl p-4 ">
                                <div className="flex items-center gap-2 mb-1.5">
                                    <span className="text-xs">{s.icon}</span>
                                    <span className="text-xs tracking-[0.09em] uppercase text-[#a8afc8]/45">{s.label}</span>
                                </div>
                                <div className="font-display text-xl text-[#e8eaf2] tracking-[-0.02em] leading-none mt-2">{s.value}</div>
                                {"sub" in s && s.sub && <div className="text-[11px] text-[#a8afc8]/45 mt-1">{s.sub}</div>}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

function formatTime(timestamp: number) {
    return new Date(timestamp * 1000).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZone: "Asia/Manila",
    })
}

function kmToMeters(km: number) {
    return (km / 1000).toFixed(1);
}