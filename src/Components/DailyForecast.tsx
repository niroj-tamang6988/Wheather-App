import { useState, useEffect } from "react";

const DailyForecast = ({ city }: { city: string }) => {
    const [days, setDays] = useState<any[]>([]);

    useEffect(() => {
        if (!city) return; // skip if no city
        setDays([]); // reset old data
        fetch(
            `${import.meta.env.VITE_WEATHER_BASE_URL}/forecast.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${city}&days=10` // fetch from api
        )
            .then((res) => {
                if (!res.ok) throw new Error("City not found"); // bad response
                return res.json(); // parse json
            })
            .then((data) => setDays(data.forecast.forecastday)) // save days
            .catch((err) => console.error(err)); // log error
    }, [city]); // run on city change

    return (
        <div>
            <h3 className="text-white font-semibold mb-2">10-Day Forecast</h3>
            <div className="overflow-x-auto">
                <div className="flex flex-row gap-4 pb-2">
                    {days.length > 0 ? days.map((day: any) => ( // loop each day
                        <div key={day.date} className="flex flex-col items-center gap-1 min-w-[70px] border-r border-white/20 pr-4">
                            <span className="text-white/60 text-sm">
                                {new Date(day.date).toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" })}
                            </span>
                            <img src={day.day.condition.icon} alt={day.day.condition.text} className="w-8 h-8" />
                            <span className="text-white font-semibold">{day.day.avgtemp_c}°C</span>
                            <span className="text-white/50 text-xs">{day.day.condition.text}</span>
                        </div>
                    )) : <p className="text-white">Loading...</p>} {/* still fetching */}
                </div>
            </div>
        </div>
    );
};

export default DailyForecast;
