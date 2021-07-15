import React from 'react';
import { render, screen } from '@testing-library/react';
import WeatherForecast from '../WeatherForecast';

const weather = {data: {city_name: 'testCity',
                        state_code: 'OH',
                        data: [{wind_spd: 10, wind_gust_spd: 15, wind_cdir: 'N',
                        high_temp: 80, app_max_temp: 90, low_temp: 60, 
                        app_min_temp: 55, pop: 15, valid_date: '2012-01-01',
                        weather: {
                            icon: 'none',
                            description: 'test description'
                        } }]}};

test('renders', () => {
    render(<WeatherForecast weather={weather}/>);
    expect(screen.getByText(/Upcoming Weather for testCity, OH/)).toBeInTheDocument;
});

test('matches snapshot', () => {
    const {asFragment} = render(<WeatherForecast weather={weather}/>);
    expect(asFragment()).toMatchSnapshot();
});

test('renders with error', () => {
    render(<WeatherForecast weather={'API error'}/>);
    expect(screen.getByText(/API Error/)).toBeInTheDocument;
});