import { CityWeatherData } from "@/types/weather";

export default function Header({ cities }: { cities: CityWeatherData[] }) {
    const mostRecentUpdate = cities.reduce((latest, city) => {
        if (!city.lastFetched) return latest;
        if (!latest || city.lastFetched > latest) return city.lastFetched;
        return latest;
    }, null as Date | null);

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
                    <div className="flex mt-2 items-center gap-[6px]">
                        <div className="h-1.5 w-1.5 rounded-full bg-green-500/50" />
                        <span className="text-[12px] text-[#a8afc8]/60 text-green-500/50">
                            Updated {formatTimeStamp(mostRecentUpdate)}
                        </span>
                    </div>
                </div>

                {/* <div className="flex shrink-0 items-center gap-[10px] rounded-[14px] border border-red-500/30 bg-red-500/12 px-[18px] py-[12px]">
                    <div>
                        <div className="text-[12px] font-semibold tracking-[0.06em] text-red-500">
                            ACTIVE ADVISORIES
                        </div>
                        <div className="text-[11px] text-red-500/70">
                            11 areas affected
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    );
}

function formatTimeStamp(date: Date | null): string {
    if (!date) return "Not yet updated";

    return new Date(date).toLocaleString("en-US", {
        timeZone: "Asia/Manila",
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    }) + " PHT";
}