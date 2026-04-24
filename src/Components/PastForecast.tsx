import { useState, useEffect } from "react";

const PastForecast = ({ city }: { city: string }) => {
    const [days, setDays] = useState<any[]>([]);

    useEffect(() => {
        if (!city) return;
        setDays([]);

        const today = new Date();
        const promises = Array.from({ length: 7 }, (_, i) => {
            const date = new Date(today);
            date.setDate(today.getDate() - (i + 1));
            const dateStr = date.toISOString().split("T")[0];
            return fetch(
                `${import.meta.env.VITE_WEATHER_BASE_URL}/history.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${city}&dt=${dateStr}`
            )
                .then((res) => {
                    if (!res.ok) throw new Error("History not found");
                    return res.json();
                })
                .then((data) => data.forecast.forecastday[0]);
        });

        Promise.all(promises)
            .then((results) => setDays(results))
            .catch((err) => console.error(err));
    }, [city]);

    return (
        <div>
            <h3 className="text-white font-semibold mb-2">7-Day Past Weather</h3>
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

export default PastForecast;
