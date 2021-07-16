import mapboxgl from 'mapbox-gl';
//import {mapbox} from './ApiKeys';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;

class MapboxApi {

    /** Uses mapbox API feature to find distance between two sets
     * of latitude and longitude.
     * Returns distance in meters.
     */
    static getDistance(longLat1, longLat2) {
        const lon1 = longLat1[0];
        const lat1 = longLat1[1];
        const lon2 = longLat2[0];
        const lat2 = longLat2[1];
        const start = new mapboxgl.LngLat(lon1, lat1);
        const end = new mapboxgl.LngLat(lon2, lat2);
        const distance = start.distanceTo(end);
        return distance;
    };
};

export default MapboxApi;