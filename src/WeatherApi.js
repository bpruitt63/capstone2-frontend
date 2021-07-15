import axios from "axios";
//import {weatherbit} from './ApiKeys';

const BASE_URL = "https://api.weatherbit.io/v2.0/forecast/daily";
const API_KEY = process.env.WEATHERBIT_API_KEY;

class WeatherApi {

    /** Calls weather API and gets 16 day forecast, using 
     * postal code and country code.
     * Returns full forecast, or error strings for invalid location
     * or server error
     */
    static async getWeather(location, units) {
        const zip = location.zipCode;
        const country = location.country;
        try {
            const res = await axios.get(
                `${BASE_URL}?postal_code=${zip}&country=${country}&units=${units.toUpperCase()}&key=${API_KEY}`
                );
            if (res.status === 204) return 'Bad location';
            return res;
        } catch(err) {
            console.error("weatherbit Error:", err.response);
            let message;
            !err.response ? message = "Server error, please try again later"
                : message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        };
    };

    /** Calls weather API and gets 16 day forecast, using 
     * longitude and latitude.
     * Returns full forecast, or error strings for invalid location
     * or server error
     */
     static async getWeatherbyLongLat(longLat, units) {
        try {
            const res = await axios.get(
                `${BASE_URL}?lat=${longLat[1]}&lon=${longLat[0]}&units=${units.toUpperCase()}&key=${API_KEY}`
                );
            if (res.status === 204) return 'Bad location';
            return res;
        } catch(err) {
            console.error("weatherbit Error:", err.response);
            let message;
            !err.response ? message = "Server error, please try again later"
                : message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        };
    };
};

export default WeatherApi;