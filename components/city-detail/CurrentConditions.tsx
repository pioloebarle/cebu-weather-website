import { CityWeatherData } from "@/types/weather";

export default function CurrentConditions( { city }: { city: CityWeatherData }) {
    return (
        <div className="flex flex-row gap-10 items-center mb-7">
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