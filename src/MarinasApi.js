import axios from 'axios';
import {marinas} from './ApiKeys';

const BASE_URL = 'https://api.marinas.com/v1/';
const API_KEY = process.env.MARINAS_API_KEY || marinas;

class MarinasApi {

    static async getPoints(longLat) {
        try {
            const res = await axios.get(
                `${BASE_URL}points/search?location[lon]=${longLat[0]}&location[lat]=${longLat[1]}&location[radius]=20000&access_key=${API_KEY}`
                );
            return res;
        } catch(err) {
            console.error("marinas api Error:", err.response);
            let message;
            !err.response ? message = "Server error, please try again later"
                : message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        };
    };
};

export default MarinasApi;