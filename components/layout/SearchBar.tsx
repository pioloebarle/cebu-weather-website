"use client";
import { CityWeatherData } from "@/types/weather";

export default function SearchBar({
    value,
    onChange,
    suggestions,
    showSuggestions,
    onFocus,
    onBlur,
    onSelect,
}: {
    value: string;
    onChange: (value: string) => void;
    suggestions: CityWeatherData[];
    showSuggestions: boolean;
    onFocus: () => void;
    onBlur: () => void;
    onSelect: (slug: string) => void;
}) {
    return (
        <div className="relative w-full max-w-[430px]">
            <div className="relative flex items-center">
                <span className="absolute left-[18px] text-base text-[#a8afc8]/50 z-10">🔍</span>
                <input
                    id="search-bar"
                    type="text"
                    placeholder="Search for a city or municipality..."
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    className="w-full h-11 pl-11 pr-5 rounded-2xl
                        bg-white/[0.06] border border-white/[0.1]
                        text-[#e8eaf2] text-sm
                        hover:border-[#7c9ef8]/40
                        focus:ring-2 focus:ring-blue-500/20
                        focus:outline-none
                        transition-colors"
                />
                {value && (
                    <button
                        onClick={() => onChange("")}
                        className="absolute right-4 text-[#a8afc8]/50 hover:text-[#a8afc8] text-sm"
                    >
                        ✕
                    </button>
                )}
            </div>

            {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-[#1a1d30] border border-white/[0.1] rounded-2xl overflow-hidden z-50 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
                    {suggestions.map((c) => (
                        <button
                            key={c.slug}
                            onClick={() => onSelect(c.slug)}
                            className="w-full bg-transparent border-none px-[18px] py-[14px] flex items-center gap-3 cursor-pointer text-left hover:bg-white/[0.05] transition-colors"
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={`https://openweathermap.org/img/wn/${c.current.weather[0].icon}@2x.png`}
                                alt={c.current.weather[0].description}
                                width={28}
                                height={28}
                            />
                            <div>
                                <div className="text-sm font-medium text-[#e8eaf2]">{c.cityName}</div>
                                <div className="text-[11px] text-[#a8afc8]/60">{c.region}</div>
                            </div>
                            <div className="ml-auto font-display text-lg text-[#e8eaf2]">
                                {Math.round(c.current.temp)}°
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}