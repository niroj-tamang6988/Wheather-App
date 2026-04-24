import { useState } from "react";
import type {FormEvent} from "react";


interface Props{
    onSearch: (city: string) => void; // Called with the city name when user submits
    loading: boolean;
    accent: string;

}
const SearchWeather = ({ onSearch, loading, accent}: Props) => {

    const [input,setInput] =useState("");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault(); //stop page reload when form submit
        if(input.trim()) //remove spaces
            onSearch(input.trim()); //call onSearch
            
        };
            return(
                <form onSubmit={handleSubmit} className="flex items-center gap-2 mb-6">
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Search City"
                        className="flex-1 px-4 py-2 rounded-xl bg-white/20 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-white/50"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-4 py-2 rounded-xl bg-white/30 text-white font-semibold hover:bg-white/50 transition disabled:opacity-50"
                    >
                        {loading ? "..." : "Search"}
                    </button>
                </form>
            );
    }
export default SearchWeather

