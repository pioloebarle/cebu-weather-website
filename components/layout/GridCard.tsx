"use client";
import { useState, useMemo, useEffect } from "react";
import { CityWeatherData } from "@/types/weather";
import { useRouter } from "next/navigation";

const FAVORITES_KEY = "cebu-wx-favorites";

function useFavorites() {
  const [favs, setFavs] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");
    } catch {
      return [];
    }
  });

  const toggle = (id: string) => {
    setFavs((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
      return next;
    });
  };

  return { favs, toggle };
}

export default function GridCard({ cities }: { cities: CityWeatherData[] }) {
    const { favs, toggle } = useFavorites();
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<typeof cities>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const router = useRouter();

    const filtered = useMemo(() => {
        if(!query) return cities;
        const q = query.toLowerCase();
        return cities.filter((city) => city.cityName.toLowerCase().includes(q) || city.region.toLowerCase().includes(q));
    }, [query]);

    useEffect(() => {
        if (query.length > 0){
            setSuggestions(cities.filter((c) => c.cityName.toLowerCase().includes(query.toLowerCase())).slice(0, 5));
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }
    }, [query]);

    const sorted = useMemo(() => {
        return [...filtered].sort((a, b) => {
            const aFav = favs.includes(a.slug) ? -1 : 1;
            const bFav = favs.includes(b.slug) ? -1 : 1;
            return aFav - bFav;
        })
    }, [filtered, favs]);

    const regions = useMemo(() => {
        const seen = new Set<string>();
        const out: string[] = [];
        for (const c of sorted) {
            if(!seen.has(c.region)) { seen.add(c.region); out.push(c.region); }
        }
        return out;
    }, [sorted]);

    return(
        <div>
            {/* Pinned section */}
            {favs.length > 0 && !query && (
                <div className="mb-10">
                    <div className="text-xs font-semibold tracking-[0.12em] uppercase text-[#a8afc8]/50 mb-4">
                        ★ Pinned
                    </div>
                    <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4">
                        {cities.filter((c) => favs.includes(c.slug)).map((city) => (
                            <CityCard key={city.slug} city={city} isFav pinned onFavToggle={toggle} onClick={() => {}} />
                        ))}
                    </div>
                </div>
            )}
            {regions.map((region) => (
                <div key={region} className="mb-9">
                    <div className="text-xs font-semibold tracking-[0.12em] uppercase text-[#a8afc8]/50 mb-4">
                        {region}
                    </div>
                    <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4">
                        {sorted.filter((c) => c.region === region && !favs.includes(c.slug)).map((city) => (
                            <CityCard key={city.slug} city={city} isFav={favs.includes(city.slug)} onFavToggle={toggle} onClick={() => router.push(`/city/${city.slug}`)} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

function CityCard({ city, isFav, pinned = false, onFavToggle, onClick }: { 
    city: CityWeatherData; 
    isFav: boolean; 
    pinned?: boolean;
    onFavToggle: (slug: string) => void;
    onClick: () => void }) {
    const [hovered, setHovered] = useState(false);
    return (
        <div
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={`
                relative 
                bg-white/[0.09] 
                hover:bg-white/[0.2]
                border
                border-white/[0.2]
                rounded-[18px]
                p-5
                pt-3
                pb-7
                cursor-pointer
                transition-[background,transform] duration-200 ease-in-out
                hover:-translate-y-[2px]
                ${pinned
                    ? "bg-[rgba(243,248,143,0.08)] border-[rgba(124,158,248,0.2)]"
                    : "bg-[rgba(221,250,0,0.05)] border-[rgba(255,255,255,0.08)]"
                }
            `}
        >
            <button
                onClick={(e) => { e.stopPropagation(); onFavToggle(city.slug); }}
                title={isFav ? "Unpin" : "Pin City"}
                className={`
                    absolute 
                    top-3
                    right-3
                    bg-transparent
                    border-none
                    p-1
                    cursor-pointer
                    text-[14px]
                    transition-[color,transform] duration-150 ease-in-out hover:scale-110
                    ${isFav ? 'text-[#fbbf24] scale-[1.15]' : 'text-[#a8afc8]/30 scale-100'}
                `}
            >
                ★
            </button>
            <div>
                <div className="flex flex-row items-center justify-between mb-1">
                        <div className="text-base font-semibold text-[#e8eaf2] leading-[1.2]">{city.cityName}</div>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={`https://openweathermap.org/img/wn/${city.current.weather[0].icon}@2x.png`}
                            alt={city.current.weather[0].description}
                            width={50}
                            height={50}
                        />
                </div>

                <div className="font-display text-5xl font-light text-[#e8eaf2] tracking-[-0.04em] leading-[1] mb-2">
                    {city.current.temp}°
                </div>

                <div className="text-sm text-[#a8afc8]/70">
                    {city.current.weather[0].main}
                </div>
                <div className="flex gap-3 mt-[10px]">
                    <span className="text-xs text-[#a8afc8]/50">💧 {city.current.humidity}%</span>
                    <span className="text-xs text-[#a8afc8]/50">💨 {city.current.wind_speed} km/h</span>
                </div>
            </div>
        </div>
    );
}