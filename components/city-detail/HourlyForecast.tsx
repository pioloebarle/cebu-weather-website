import { CityWeatherData } from "@/types/weather";

export default function HourlyForecast({ city }: { city: CityWeatherData }) {
    return (
        <div className="bg-white/[0.04] border border-white/[0.07] rounded-[20px] pt-5 pb-5 pl-6 pr-0 mb-5 overflow-x-auto">
            <div className="text-xs font-semibold tracking-[0.12em] uppercase text-[#a8afc8]/50 mb-3 pr-6">
                Next 20 Hours (Debug: {city.hourly.length} entries)
            </div>
            <div className="flex gap-1 pr-6">
                {city.hourly.map((hour, index) => (
                    <div key={index} className={`flex-none min-w-[70px] py-3 rounded-xl text-center border
                        ${index === 0 ? 'bg-indigo-500/20 border-indigo-500/30' : 'bg-transparent border-transparent'} 
                    `}>
                        <div className={`text-xs mb-2 tracking-[0.04em]
                            ${index === 0 ? 'text-[#7c9ef8] font-semibold' : 'text-[#a8afc8]/45 font-normal'}
                        `}>
                            {formatHour(hour.dt)}
                        </div>
                        <div className="text-base mb-2">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
                                alt={hour.weather[0].description}
                                width={50}
                                height={50}
                            />
                        </div>
                        <div className="font-display text-base text-[#e8eaf2] tracking-[-0.02em] mb-1">
                            {roundUp(hour.temp)}°
                        </div>
                        <div className={`text-[10px] ${percentage(hour.pop) > 40 ? 'text-sky-300' : 'text-[#a8afc8]/35'} `}>
                            {percentage(hour.pop).toFixed(0)}% 
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

function formatHour(date: number): string {
    return new Date(date * 1000).toLocaleString("en-US", {
        timeZone: "Asia/Manila",
        hour: "numeric",
        hour12: true,
    });
}

function roundUp(num: number): number {
    return Math.round(num);
}

function percentage(num: number) {
    return (num * 100)
}