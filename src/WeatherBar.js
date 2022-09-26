import React, {useState} from 'react';
import {Collapse} from 'reactstrap';
import './static/styles/WeatherBar.css';


/** Component displayed at top of all pages, showing today's weather 
 * for current location.
 */
function WeatherBar({location, weather, isMobile, units}) {

    const [isOpen, setIsOpen] = useState(false);

    /** Toggles collapsible weather on small screens */
    const toggle = () => setIsOpen(!isOpen);

    /** Gives loading or error message if weather prop is
     * undefined or error string
     */
    if (!weather) return <p className='WeatherBar'>Getting weather</p>;
    if (weather === 'API error') return <p className='WeatherBar'>API Error</p>;
    if (weather === 'Bad location') {
        return (
            <div>
                <p className='WeatherBar'>That place don't exist!</p>
            </div>
        );
    };

    const w = weather.data.data[0];
    const countryDisplay = Number.isInteger(+weather.data.state_code) ? 
                            location.country : weather.data.state_code || weather.data.country_code;
    const ICON_URL = 'https://www.weatherbit.io/static/img/icons/'

    return (
        <>
        {!isMobile &&
            <div className='WeatherBar'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-3 align-self-start'>
                            <img src={`${ICON_URL}${w.weather.icon}.png`} 
                                    alt={w.weather.description}
                                    className='WeatherBarImage' />
                            <p>{w.weather.description}</p>
                        </div>
                        <div className='col-9'>
                            <div className='row'>
                                <div className='row'>
                                    <h5 className='col-8'>Today's weather for {weather.data.city_name} 
                                        , {countryDisplay}.</h5>
                                </div>
                                <div className='col-3 align-self-start'>
                                    <p>High: {w.high_temp}</p>
                                    <p className='test'>Feels like: {w.app_max_temp}</p>
                                </div>
                                <div className='col-3 align-self-start'>
                                    <p>Low: {w.low_temp}</p>
                                    <p>Feels like: {w.app_min_temp}</p>
                                </div>
                                <div className='col-3 align-self-start'>
                                    <p>Precipitation:</p>
                                    <p>{w.pop}%</p>
                                </div>
                                <div className='col-3 align-self-start'>
                                    <p>Wind: {w.wind_spd}
                                        {units === 'i' ? 'mph ' : 'km/h '}
                                        {w.wind_cdir}
                                    </p>
                                    <p>Gust: {w.wind_gust_spd}
                                        {units === 'i' ? 'mph ' : 'km/h '}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }
        {isMobile &&
            <div className='WeatherBar'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-4'>
                            <img src={`${ICON_URL}${w.weather.icon}.png`} 
                                    alt={w.weather.description}
                                    className='WeatherBarImage' />
                            {isOpen && 
                                <p>{w.weather.description}</p>
                            }
                        </div>
                        <div className='col-4 align-self-center'>
                            <p><b>{weather.data.city_name} 
                                    , {weather.data.state_code || location.country}</b>
                            </p>
                            <button className='dropdown-toggle WeatherBarToggle' onClick={toggle}>
                                {isOpen ? 'See Less' : 'See More'}
                            </button>
                        </div>
                        <div className='col-4 align-self-end'>
                            <p>High
                                <span><br/>{w.high_temp}</span>
                            </p>
                            {isOpen &&
                                <p>Feels like
                                    <span><br/>{w.app_max_temp}</span>
                                </p>
                            }
                        </div>
                    </div>
                    <Collapse isOpen={isOpen}>
                        <div className='row second'>
                            <p className='col-4 align-self-start'>Precipitation
                                <span><br/>{w.pop}%</span>
                            </p>
                            <div className='col-4 align-self-start'>
                                <p>Wind
                                    <span><br/>{w.wind_spd}
                                        {units === 'i' ? 'mph ' : 'km/h '}
                                        {w.wind_cdir}
                                    </span>
                                </p>
                                <p>Gust
                                    <span><br/>{w.wind_gust_spd}
                                        {units === 'i' ? 'mph ' : 'km/h '}
                                    </span>
                                </p>
                            </div>
                            <div className='col-4 align-self-start'>
                                <p>Low
                                    <span><br/>{w.low_temp}</span>
                                </p>
                                <p>Feels like
                                    <span><br/>{w.app_min_temp}</span>
                                </p>
                            </div>
                        </div>
                    </Collapse>
                </div>
            </div>
        }
        </>
    );
};

export default WeatherBar;