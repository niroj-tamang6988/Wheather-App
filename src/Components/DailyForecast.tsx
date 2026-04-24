import { useState, useEffect } from "react";

const DailyForecast = ({ city }: { city: string }) => {
    const [days, setDays] = useState<any[]>([]);

    useEffect(() => {
        if (!city) return;
        setDays([]);
        fetch(
            `${import.meta.env.VITE_WEATHER_BASE_URL}/forecast.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${city}&days=10`
        )
            .then((res) => {
                if (!res.ok) throw new Error("City not found");
                return res.json();
            })
            .then((data) => setDays(data.forecast.forecastday))
            .catch((err) => console.error(err));
    }, [city]);

    return (
        <div>
            <h3 className="text-white font-semibold mb-2">10-Day Forecast</h3>
            <div className="overflow-x-auto">
                <div className="flex flex-row gap-4 pb-2">
                    {days.length > 0 ? days.map((day: any) => (
                        <div key={day.date} className="flex flex-col items-center gap-1 min-w-[70px] border-r border-white/20 pr-4">
                            <span className="text-white/60 text-sm">
                                {new Date(day.date).toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" })}
                            </span>
                            <img src={day.day.condition.icon} alt={day.day.condition.text} className="w-8 h-8" />
                            <span className="text-white font-semibold">{day.day.avgtemp_c}°C</span>
                            <span className="text-white/50 text-xs">{day.day.condition.text}</span>
                        </div>
                    )) : <p className="text-white">Loading...</p>}
                </div>
            </div>
        </div>
    );
};

export default DailyForecast;
