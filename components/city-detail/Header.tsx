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