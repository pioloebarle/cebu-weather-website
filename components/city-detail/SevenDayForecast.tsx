"use client";
import { CityWeatherData } from "@/types/weather";
import { useState } from "react";

export default function SevenDayForecast({ city }: { city: CityWeatherData }){
    const [selectedDay, setSelectedDay] = useState(0);

    return(
        <div>
            {/* 7-day + selected day detail */}
            <div className="grid grid-cols-2 gap-5 mb-5">
                <div className="bg-white/[0.04] border border-white/[0.07] rounded-[20px] pt-5 pb-5 pl-6 pr-0 overflow-hidden">
                    <div className="pt-4 px-5 pb-2 text-xs tracking-[0.12em] uppercase text-[#a8afc8]/45 font-semibold">
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
                                {formatDayName(d.dt)};
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
                                <div className="text-xs text-[#a8afc8]/55">{d.weather[0].description}</div>
                                <div className="text-[10px] text-sky-300 mt-0.5">{rainPercentage(d.pop)}% rain</div>
                            </div>

                            <div className="text-right">
                                <span className="font-display text-[15px] text-[#e8eaf2]">{d.temp.max}°</span>
                                <span className="text-[12px] text-[#a8afc8]/45 ml-[5.5px]">{d.temp.min}°</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-4">
                {/* Selected Day */}
                <div className="bg-gradient-to-br from-sky-400/[0.07] to-indigo-500/[0.05] border border-indigo-500/14 rounded-2xl padding p-5">
                    <div className="text-xs font-semibold tracking-[0.12em] uppercase text-[#a8afc8]/45 mb-3">
                        {formatDayName(city.daily[selectedDay].dt)};
                    </div>
                    <div className="flex items-center gap-3.5">
                        <span className="text-4xl">
                            {/* eslint-disable-next-line @next/next/no-img-element */}{/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={`https://openweathermap.org/img/wn/${city.daily[selectedDay].weather[0].icon}@2x.png`}
                                    alt={city.daily[selectedDay].weather[0].description}
                                    width={50}
                                    height={50}
                                />
                        </span>
                        <div>
                            <div className="font-display text-4xl font-light text-[#e8eaf2] tracking-[-0.03em] leading-none">
                                {city.daily[selectedDay].temp.max}°
                                <span className="text-xl text-[#a8afc8]/45 ml-2">{city.daily[selectedDay].temp.min}°</span>
                            </div>
                        </div>
                        <div className="text-sm text-[#a8afc8]/65 mt-1.25">
                            {city.daily[selectedDay].weather[0].description}
                        </div>
                        <div className="text-[11px] text-sky-300 mt-1">
                            {rainPercentage(city.daily[selectedDay].pop)}% chance of rain
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

function rainPercentage(pop: number): number {
  return Math.round(pop * 100);
}