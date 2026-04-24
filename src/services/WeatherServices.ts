import { apiClient } from "../config/config.ts"

//fetching current weather
export const getCurrentWeather = (location:string) => {
    return apiClient(`/current.json?q=${location}`);
};


//fetching 7 days forecast weather 
export const getForecastWeather = (location:string, days:number) =>{
    return apiClient(`/forecast.json?q=${location}&days=${days}`);

};