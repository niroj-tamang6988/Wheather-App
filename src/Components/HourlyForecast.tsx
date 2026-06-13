import { useState, useEffect } from "react";

const HourlyForecast = ({ city }: { city: string }) => {
    const [hours, setHours] = useState<any[]>([]);

    useEffect(() => {
        if (!city) return; // skip if no city
        setHours([]); // reset old data
        fetch(
            `${import.meta.env.VITE_WEATHER_BASE_URL}/forecast.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${city}&days=1` // fetch from api
        )
            .then((res) => {
                if (!res.ok) throw new Error("City not found"); // bad response
                return res.json(); // parse json
            })
            .then((data) => setHours(data.forecast.forecastday[0].hour)) // save hours
            .catch((err) => console.error(err)); // log error
    }, [city]); // run on city change

    const currentHour = new Date().getHours(); // get current hour

    return (
        <div className="flex flex-row gap-4 pb-2">
                {hours.length > 0 ? ( // data ready
                    hours.map((hour: any) => {
                        const hourNum = new Date(hour.time).getHours(); // extract hour
                        const isCurrent = hourNum === currentHour; // check if now
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
                <p className="text-white">Loading...</p> // still fetching
            )}
        </div>
    );
};

export default HourlyForecast;
