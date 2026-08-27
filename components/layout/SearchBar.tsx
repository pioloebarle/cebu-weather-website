export default function SearchBar() {
    return (
        <div className="flex items-center mr-[680px] border-white">
            <input 
                id="search-bar"
                type="text"
                placeholder="Search for a city or municipality..."
                className="w-full max-w-[1200px] h-11 p-5 rounded-2xl items-start border border-white/[0.5] border-slate-300 hover:border-slate-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-colors"
            />
            
        </div>
    )
}