//API Service layer

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY

const BASE_URL = import.meta.env.VITE_WEATHER_BASE_URL

export const apiClient = async(
    endpoint: string, 
    options: RequestInit = {} //requestInit is request method
): Promise<any> =>{

    const url = `${BASE_URL}${endpoint}?key=${API_KEY}`

        try{
            const response = await fetch(url, {...options}); //sends a requst to server
            if(!response.ok){
                throw new Error(`API request failed with status ${response.status}`);
            }

            return await response.json();
        }catch(error){
            console.error("API request error:", error);
            throw error;
        }
}

