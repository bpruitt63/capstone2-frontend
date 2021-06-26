import React from 'react';
import LocationForm from './LocationForm';

/** Component displayed at top of all pages, showing today's weather 
 * for current location.  Includes form component to update location for 
 * weather and trip planner searches
 */
function WeatherBar({location, updateLocation, weather}) {

    /** Gives loading or error message if weather prop is
     * undefined or error string
     */
    if (!weather) return <p>Getting weather</p>;
    if (weather === 'API error') return <p>API Error</p>;
    if (weather === 'Bad location') {
        return (
            <div>
                <p>That place don't exist!</p>
                <LocationForm location={location}
                            updateLocation={updateLocation} />
            </div>
        );
    };

    const w = weather.data.data[0];
    const ICON_URL = 'https://www.weatherbit.io/static/img/icons/'

    return (
        <div>
            <p>Here's today's weather for {weather.data.city_name} 
                , {weather.data.state_code || location.country}.</p>
            <img src={`${ICON_URL}${w.weather.icon}.png`} alt={w.weather.description} />
            <p>{w.weather.description}</p>
            <p>High: {w.high_temp}, feels like {w.app_max_temp}</p>
            <p>Low: {w.low_temp}, feels like {w.app_min_temp}</p>
            <p>Precipitation chance: {w.pop}%</p>
            <p>Wind: {w.wind_spd}mph {w.wind_cdir}, gust speed {w.wind_gust_spd}mph</p>
            <LocationForm location={location}
                            updateLocation={updateLocation} />
        </div>
    );
};

export default WeatherBar;