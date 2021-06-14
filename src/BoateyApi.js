import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";


class BoateyApi {

    static token;

    /** Sends request to database and catches any errors */
    static async request(endpoint, data={}, method="get") {
        const url = `${BASE_URL}/${endpoint}`;
        const headers = {Authorization: `Bearer ${BoateyApi.token}`};
        const params = (method === "get") ? data : {};

        try {
            return (await axios({url, method, data, params, headers})).data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message;
            !err.response ? message = "Server error, please try again later"
                : message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        };
    };

    /** Register new user and get JWT */
    static async register(data) {
        const res = await this.request('users/register', data, 'post');
        return res.token;
    };

    /** Log in existing user and get JWT. 
     * Returns user location and preferred unit of measurement.
     */
    static async login(data) {
        const res = await this.request('users/login', data, 'post');
        const token = res.token;
        const location = res.location;
        const units = res.units;
        return {token, location, units};
    };

    /** Gets all info on a single user */
    static async getUser(username) {
        const res = await this.request(`users/${username}`);
        return res.user;
    };

    /** Updates selected data on a single user and returns all data */
    static async updateUser(username, data) {
        const res = await this.request(`users/${username}`, data, 'patch');
        return res.user;
    };
};

BoateyApi.token = localStorage.getItem("token");

export default BoateyApi;