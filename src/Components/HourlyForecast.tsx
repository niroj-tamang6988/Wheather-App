import { useState, useEffect } from "react";

const HourlyForecast = ({ city }: { city: string }) => {
    const [hours, setHours] = useState<any[]>([]);

    useEffect(() => {
        if (!city) return;
        setHours([]);
        fetch(
            `${import.meta.env.VITE_WEATHER_BASE_URL}/forecast.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${city}&days=1`
        )
            .then((res) => {
                if (!res.ok) throw new Error("City not found");
                return res.json();
            })
            .then((data) => setHours(data.forecast.forecastday[0].hour))
            .catch((err) => console.error(err));
    }, [city]);

    const currentHour = new Date().getHours();

    return (
        <div className="flex flex-row gap-4 pb-2">
                {hours.length > 0 ? (
                    hours.map((hour: any) => {
                        const hourNum = new Date(hour.time).getHours();
                        const isCurrent = hourNum === currentHour;
                        return (
                            <div key={hour.time} className={`flex flex-col items-center gap-1 min-w-[70px] border-r border-white/20 pr-4 ${ isCurrent ? "bg-white/20 rounded-xl px-3" : "" }`}>
                                <span className={`text-sm ${ isCurrent ? "text-white font-bold" : "text-white/60" }`}>
                                    {isCurrent ? "Now" : new Date(hour.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                </span>
                                <img src={hour.condition.icon} alt={hour.condition.text} className="w-8 h-8" />
                                <span className={`font-semibold ${ isCurrent ? "text-white text-lg" : "text-white/80" }`}>{hour.temp_c}°C</span>
                            </div>
                        );
                    })
            ) : (
                <p className="text-white">Loading...</p>
            )}
        </div>
    );
};

export default HourlyForecast;
