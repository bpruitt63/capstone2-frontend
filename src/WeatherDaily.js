import React from 'react';
import {makeReadableDate} from './static/helpers';

/** Component for a single day's weather forecast */
function WeatherDaily({daily}) {

    const ICON_URL = 'https://www.weatherbit.io/static/img/icons/'
    const date = makeReadableDate(daily.valid_date);

    return (
        <div>
            <p>{date}</p>
            <img src={`${ICON_URL}${daily.weather.icon}.png`} 
                alt={daily.weather.description} />
            <p>{daily.weather.description}</p>
            <p>High: {daily.high_temp}, feels like {daily.app_max_temp}</p>
            <p>Low: {daily.low_temp}, feels like {daily.app_min_temp}</p>
            <p>Precipitation chance: {daily.pop}%</p>
            <p>Wind: {daily.wind_spd}mph {daily.wind_cdir}, gust speed {daily.wind_gust_spd}mph</p>
        </div>
    );
};

export default WeatherDaily;