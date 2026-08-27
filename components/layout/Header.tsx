import { getAllCitiesWeather } from "@/lib/get-all-cities-weather";
export default async function Header() {
    const cities = await getAllCitiesWeather();
    return (
        <div className="mb-10">
            <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex-col">
                    <div className="text-[11px] font-semibold tracking-[0.14em] text-[#7c9ef8]/80 uppercase mb-[6px]">
                        PAGASA · Province of Cebu
                    </div>
                    <h1 className="font-display font-light text-[clamp(32px,5vw,52px)] text-[#e8eaf2] m-0 tracking-[-0.03em] leading-[1.1]">
                        Cebu Weather
                    </h1>
                    <p className="text-sm text-[#a8afc8]/70 mt-2 mb-0">
                        Real-time conditions · {cities.length} cities & municipalities
                    </p>

                    {/* Timestamp */}
                    {/* <div className="flex mt-4 items-center gap-[6px]">
                        <div className="h-1.5 w-1.5 rounded-full bg-[#4ade80]" />
                        <span className="text-[12px] text-[#a8afc8]/60">Updated August 26, 2026 · 12:47 PM PHT</span>
                    </div> */}
                </div>

                {/* Active advisories badge */}
                <div className="flex shrink-0 items-center gap-[10px] rounded-[14px] border border-red-500/30 bg-red-500/12 px-[18px] py-[12px]">
                    <div className="h-2 w-2 animate-pulse rounded-full bg-red-500 shadow-[0_0_8px_#ef4444]" />
                    <div>
                        <div className="text-[12px] font-semibold tracking-[0.06em] text-red-500">
                        ACTIVE ADVISORIES
                        </div>
                        <div className="text-[11px] text-red-500/70">
                            11 areas affected
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}