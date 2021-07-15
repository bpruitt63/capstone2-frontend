import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import WeatherDaily from '../WeatherDaily';

const daily = {wind_spd: 10, wind_gust_spd: 15, wind_cdir: 'N',
                        high_temp: 80, app_max_temp: 90, low_temp: 60, 
                        app_min_temp: 55, pop: 15, valid_date: '2012-01-01',
                        weather: {
                            icon: 'none',
                            description: 'test description'
                        }};

test('renders', () => {
    render(<WeatherDaily daily={daily}/>);
});

test('matches snapshot', () => {
    const {asFragment} = render(<WeatherDaily daily={daily}/>);
    expect(asFragment()).toMatchSnapshot();
});

test('renders w/ correct date', () => {
    render(<WeatherDaily daily={daily}/>);
    expect(screen.getAllByText(/January 01, 2012/)).toBeInTheDocument;
});

test('toggles', () => {
    render(<WeatherDaily daily={daily}/>);
    expect(screen.getAllByText(/80/)).toBeInTheDocument;
    expect(screen.queryByText(/90/)).not.toBeInTheDocument;
    expect(screen.getByText(/See More/)).toBeInTheDocument;
    const toggleButton = screen.getByText(/See More/);
    fireEvent.click(toggleButton);
    expect(screen.getByText(/80/)).toBeInTheDocument;
    expect(screen.getByText(/90/)).toBeInTheDocument;
    expect(screen.queryByText(/See More/)).not.toBeInTheDocument;
    expect(screen.getByText(/See Less/)).toBeInTheDocument;
});