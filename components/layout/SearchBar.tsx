export default function SearchBar() {
    return (
        <div className="flex items-center w-full max-w-[430px]">
            <input
                id="search-bar"
                type="text"
                placeholder="Search for a city or municipality..."
                className="w-full h-11 px-5 rounded-2xl
                    border border-white/[0.5]
                    hover:border-slate-500
                    focus:ring-2 focus:ring-blue-500/20
                    focus:outline-none
                    transition-colors"
            />
        </div>
    );
}