import { useState, useEffect} from "react";



const Current = ({ city }: { city: string }) => {

        
        const [weather, setWeather] = useState <any> (null);

    useEffect(() => {
        if (!city) return;
        setWeather(null);
        fetch(
            `${import.meta.env.VITE_WEATHER_BASE_URL}/current.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${city}`
        )
        .then((res) => {
            if (!res.ok) throw new Error("City not found");
            return res.json();
        })
        .then((data) => setWeather(data))
        .catch((err) => console.error(err));
    },[city]);


        return(
            <div className="bg-black/50 rounded-2xl p-6 w-[280px] flex flex-col gap-4 text-white">
  {weather ? (
    <>
      <div className="flex flex-col items-center gap-1">
        <h2 className="text-xl font-bold">{weather.location.name}, {weather.location.country}</h2>
        <p className="text-white/60 text-sm">{weather.location.localtime}</p>
        <img src={weather.current.condition.icon} alt="weather icon" className="w-16 h-16" />
        <p className="text-5xl font-bold">{weather.current.temp_c}°C</p>
        <p className="text-white/80">{weather.current.condition.text}</p>
        <p className="text-sm text-white/60">Feels like {weather.current.feelslike_c}°C</p>
      </div>

      <div className="border-t border-white/20 pt-4 grid grid-cols-2 gap-3 text-sm">
        <div className="flex flex-col">
          <span className="text-white/50">Humidity</span>
          <span className="font-semibold">{weather.current.humidity}%</span>
        </div>
        <div className="flex flex-col">
          <span className="text-white/50">Wind</span>
          <span className="font-semibold">{weather.current.wind_kph} km/h {weather.current.wind_dir}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-white/50">UV Index</span>
          <span className="font-semibold">{weather.current.uv}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-white/50">Visibility</span>
          <span className="font-semibold">{weather.current.vis_km} km</span>
        </div>
     
       
      </div>
    </>
  ) : (
    <p className="text-white">Loading...</p>
  )}
</div>
 
);
};

export default Current