import axios from 'axios';
//import {marinas} from './ApiKeys';

const BASE_URL = 'https://api.marinas.com/v1/';
const API_KEY = process.env.REACT_APP_MARINAS_API_KEY;

class MarinasApi {

    /** Retrieves array of all points of interest within a certain distance
     * of a specific latitude/longitude.
     */
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

    /** Retrieves info on a specific point of interest */
    static async getOnePoint(id) {
        try {
            const res = await axios.get(
                `${BASE_URL}points/${id}`
            );
            return res.data;
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