import React from 'react';
import WeatherDaily from './WeatherDaily';

/** Component showing 16 day weather forecast for specified location */
function WeatherForecast({weather, units}) {
 
    /** Gives loading or error message if weather prop is
     * undefined or error string
     */
    if (!weather) return <p>Getting weather</p>;
    if (weather === 'API error') return <p>API Error</p>;
    if (weather === 'Bad location') {
        return (
            <div>
                <p>That place doesn't exist!</p>
            </div>
        );
    };

    const countryDisplay = Number.isInteger(+weather.data.state_code) ? 
                            weather.data.country_code : weather.data.state_code;

    return (
        <div className='container'>
            <h3>Upcoming Weather for {weather.data.city_name}
                , {countryDisplay} 
            </h3>
            {weather.data.data.map((w) => 
                <WeatherDaily daily={w} key={w.valid_date} units={units} />
            )}
        </div>
    );
};

export default WeatherForecast;