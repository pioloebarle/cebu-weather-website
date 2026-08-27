import Header  from "@/components/layout/Header";
import SearchBar from "@/components/layout/SearchBar";
import GridCard from "@/components/layout/GridCard";
import { getAllCitiesWeather } from "@/lib/get-all-cities-weather";
export const dynamic = "force-dynamic";
export default async function Home() {
  const cities = await getAllCitiesWeather();
  return (
  <div className="min-h-screen p-0 bg-[linear-gradient(160deg,#0c0f1d_0%,#111630_40%,#161040_70%,#0d0c1e_100%)]">
    <div className="fixed -top-[100px] -right-[60px] w-[480px] h-[480px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.16)_0%,transparent_70%)] pointer-events-none z-0" />
    <div className="fixed -bottom-[80px] -left-[40px] w-[380px] h-[380px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.09)_0%,transparent_70%)] pointer-events-none z-0" />
    
      <div className="relative z-1 max-w-[1220px] my-0 mx-auto p-[40px_24px_80px]">
        <Header cities={cities}/>
        <SearchBar />
        <div className="mt-8">
          <GridCard cities={cities} />
        </div>
      </div>
  </div>
  );
}
