import { useState } from "react"
import Current from "../Components/Current"
import SearchWeather from "../Components/SearchWeather"
import HourlyForecast from "../Components/HourlyForecast"
import DailyForecast from "../Components/DailyForecast"
import PastForecast from "../Components/PastForecast"

const Home = () => {
    const [city, setCity] = useState("Kathmandu");
    const [loading, setLoading] = useState(false);

    const handleSearch = (newCity: string) => {
        setLoading(true);
        setCity(newCity);
        setTimeout(() => setLoading(false), 1000);
    };

    return(
        <div className="h-screen w-full bg-[url('/background.webp')] bg-cover bg-center flex items-center justify-center">
            <div className="bg-black rounded-2xl p-8 w-[1250px] h-[90vh] flex flex-col gap-4 overflow-hidden">
                <SearchWeather onSearch={handleSearch} loading={loading} accent="#ffffff"/>
                <div className="flex gap-6 flex-1 overflow-hidden">
                    <Current city ={city}/>
                    <div className="flex-1 flex flex-col gap-4 overflow-y-auto pr-1">
                        <div>
                            <h3 className="text-white font-semibold mb-2">Hourly Forecast</h3>
                            <div className="overflow-x-auto">
                                <HourlyForecast city={city}/>
                            </div>
                        </div>
                        <DailyForecast city={city}/>
                        <PastForecast city={city}/>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Home
