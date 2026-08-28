"use client";
import { CityWeatherData } from "@/types/weather";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SevenDayForecast({ city, cities }: { city: CityWeatherData; cities: CityWeatherData[] }) {
    const [ todayInSeconds ] = useState(() => Math.floor(Date.now() / 1000));
    const todayIndex = city.daily.findIndex((day) => {
    const dayDate = new Date(day.dt * 1000).toDateString();
    const nowDate = new Date(todayInSeconds * 1000).toDateString();
    return dayDate === nowDate;
    });
    const router = useRouter();
    const [selectedDay, setSelectedDay] = useState(todayIndex >= 0 ? todayIndex : 0);

    return(
        <div>
            {/* 7-day + selected day detail */}
            <div className="grid grid-cols-2 gap-5 mb-5">
                <div className="bg-white/[0.04] border border-white/[0.07] rounded-[20px] pt-6 pb-6 pr-0 overflow-hidden">
                    <div className="pt-3 px-5 pb-3 mb-1 text-xs tracking-[0.12em] uppercase text-[#a8afc8]/45 font-semibold">
                        7-Day Forecast
                    </div>

                    {city.daily.map((d, index) => (
                        <div
                            key={index}
                            onClick={() => setSelectedDay(index)}
                            className={`grid grid-cols-[52px_26px_1fr_auto] items-center gap-3 py-[13px] px-[22px] cursor-pointer border-l-3 transition-colors duration-150
                                ${ selectedDay === index  ? 'bg-indigo-500/11 border-indigo-500/70' : 'bg-transparent border-transparent' }    
                            `}
                        >
                            <div className={`text-sm ${selectedDay === index ?  'font-semibold text-[#7c9ef8]' : 'font-normal text-[#e8eaf2]' }`}>
                                {formatDayName(d.dt)}
                            </div>
                            <div className="text-base">
                                {/* eslint-disable-next-line @next/next/no-img-element */}{/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={`https://openweathermap.org/img/wn/${d.weather[0].icon}@2x.png`}
                                    alt={d.weather[0].description}
                                    width={50}
                                    height={50}
                                />
                            </div>
                            <div>
                                <div className="text-xs text-[#a8afc8]/55 capitalize">{d.weather[0].description}</div>
                                <div className="text-[10px] text-sky-300 mt-0.5">{rainPercentage(d.pop)}% rain</div>
                            </div>

                            <div className="text-right">
                                <span className="font-display text-[15px] text-[#e8eaf2]">{d.temp.max}°</span>
                                <span className="text-[12px] text-[#a8afc8]/45 ml-[5.5px]">{d.temp.min}°</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col gap-4">
                    {/* Selected Day */}
                    <div className="bg-gradient-to-br from-sky-400/[0.07] to-indigo-500/[0.05] border border-indigo-500/14 rounded-2xl padding p-5">
                        <div className="text-sm font-semibold tracking-[0.12em] uppercase text-[#a8afc8]/45 mb-3">
                            {formatDayNameLong(city.daily[selectedDay].dt)}
                        </div>
                        <div className="flex flex-row items-center gap-2">
                            <span className="text-4xl mb-2">
                                {/* eslint-disable-next-line @next/next/no-img-element */}{/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={`https://openweathermap.org/img/wn/${city.daily[selectedDay].weather[0].icon}@2x.png`}
                                    alt={city.daily[selectedDay].weather[0].description}
                                    width={70}
                                    height={70}
                                />
                            </span>
                            <div className="flex flex-col">
                                <div>
                                    <div className="font-display text-4xl font-light text-[#e8eaf2] tracking-[-0.03em] leading-none">
                                        {city.daily[selectedDay].temp.max}°
                                        <span className="text-xl text-[#a8afc8]/45 ml-2">/ {city.daily[selectedDay].temp.min}°</span>
                                    </div>
                                </div>
                                <div className="text-sm text-[#a8afc8]/65 mt-1.25 capitalize">
                                    {city.daily[selectedDay].weather[0].description}
                                </div>
                                <div className="text-[11px] text-sky-300 mt-1">
                                    {rainPercentage(city.daily[selectedDay].pop)}% chance of rain
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Nearby Cities */}
                    <div className="bg-white/[0.04] border border-white/[0.07] rounded-[20px] p-[18px_22px] flex-1">
                        <div className="text-xs font-semibold tracking-[0.12em] uppercase text-[#a8afc8]/45 mb-3.5">
                            Nearby
                        </div>
                        <div className="flex flex-col">
                            {cities
                                .filter((c) => c.slug !== city.slug && c.region === city.region)
                                .slice(0, 4)
                                .map((c) => (
                                    <button
                                        key={c.slug}
                                        onClick={() => router.push(`/city/${c.slug}`)}
                                        className="bg-transparent border-none border-t border-white/[0.05] first:border-t-0 py-[11px] px-0 flex items-center gap-[11px] cursor-pointer text-left w-full transition-opacity duration-150 hover:opacity-65"
                                    >
                                        <span className="text-[18px]">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}{/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={`https://openweathermap.org/img/wn/${c.current.weather[0].icon}@2x.png`}
                                                alt={c.current.weather[0].description}
                                                width={50}
                                                height={50}
                                            />
                                        </span>
                                        <div className="flex-1">
                                            <div className="text-sm font-medium text-[#e8eaf2]">{c.cityName}</div>
                                            <div className="text-xs text-[#a8afc8]/45 capitalize">{c.current.weather[0].description}</div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-display text-lg text-[#e8eaf2]">{c.current.temp}°</span>
                                            {/* {c.advisory && <div className="w-[5px] height h-[5px] rounded-full bg-red-500" />} */}
                                        </div>
                                    </button>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function formatDayName(date: number): string {
    return new Date(date * 1000).toLocaleString("en-US", {
        timeZone: "Asia/Manila",
        weekday: "short",
    });
}

function formatDayNameLong(date: number): string {
    return new Date(date * 1000).toLocaleString("en-US", {
        timeZone: "Asia/Manila",
        weekday: "long",
    });
}

function rainPercentage(pop: number): number {
  return Math.round(pop * 100);
}