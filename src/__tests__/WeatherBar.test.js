import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import WeatherBar from '../WeatherBar';

const weather = {data: {city_name: 'testCity',
                        state_code: 'OH',
                        data: [{wind_spd: 10, wind_gust_spd: 15, wind_cdir: 'N',
                        high_temp: 80, app_max_temp: 90, low_temp: 60, 
                        app_min_temp: 55, pop: 15,
                        weather: {
                            icon: 'none',
                            description: 'test description'
                        } }]}};

test('renders', () => {
    render(<WeatherBar weather={weather}/>);
});

test('matches snapshot', () => {
    const {asFragment} = render(<WeatherBar weather={weather}/>);
    expect(asFragment()).toMatchSnapshot();
});

test('renders non mobile', () => {
    render(<WeatherBar weather={weather} isMobile={false}/>);
    expect(screen.getByText(/Today's weather for testCity, OH./)).toBeInTheDocument;
    expect(screen.queryByText(/See More/)).not.toBeInTheDocument;
});

test('renders mobile', () => {
    render(<WeatherBar weather={weather} isMobile={true}/>);
    expect(screen.queryByText(/Today's weather for testCity, OH./)).not.toBeInTheDocument;
    expect(screen.getByText(/testCity, OH/)).toBeInTheDocument;
    expect(screen.getByText(/See More/)).toBeInTheDocument;
});

test('toggles mobile collapse', () => {
    render(<WeatherBar weather={weather} isMobile={true}/>);
    expect(screen.queryByText(/test description/)).not.toBeInTheDocument;
    expect(screen.getByText(/See More/)).toBeInTheDocument;
    const toggle = screen.getByText(/See More/);
    fireEvent.click(toggle);
    expect(screen.getByText(/test description/)).toBeInTheDocument;
    fireEvent.click(toggle);
    expect(screen.queryByText(/test description/)).not.toBeInTheDocument;
});

test('renders with error', () => {
    render(<WeatherBar weather={'Bad location'}/>);
    expect(screen.getByText(/That place don't exist!/)).toBeInTheDocument;
});