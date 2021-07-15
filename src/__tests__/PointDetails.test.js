import React from 'react';
import { render, screen } from '@testing-library/react';
import PointDetails from '../PointDetails';
import BoateyApi from '../BoateyApi';
import { BrowserRouter } from 'react-router-dom';

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
    Map: () => ({}),
}));

jest.mock('../BoateyApi');

const point = {id: 'test1', 
                kind: 'marina',
                name: 'Test Location',
                review_count: 0,
                web_url: 'https://google.com',
                location: {lat: 40, lon: 10},
                fuel: {has_diesel: false,
                        has_propane: false,
                        has_gas: true},
                images: {data: []}};

test('renders', () => {
    render(<BrowserRouter><PointDetails point={point}/></BrowserRouter>);
});

test('matches snapshot', () => {
    const {asFragment} = render(<BrowserRouter><PointDetails point={point}/></BrowserRouter>);
    expect(asFragment()).toMatchSnapshot();
});

test('renders recent trip', () => {
    render(<BrowserRouter><PointDetails point={point}/></BrowserRouter>);
    expect(screen.getByText(/Propane:/)).toBeInTheDocument;
    expect(screen.queryByText(/Rating:/)).not.toBeInTheDocument;
});

test('renders user trip', async () => {
    BoateyApi.getRatings.mockResolvedValue({overallRating: '4.50', userRating: '#'});
    render(<BrowserRouter><PointDetails point={point} username={'test'}/></BrowserRouter>);
    await screen.findByText('4.50');
    expect(screen.getByText(/Propane:/)).toBeInTheDocument;
    expect(screen.getByText(/4.50/)).toBeInTheDocument;
    expect(screen.getByText(/#/)).toBeInTheDocument;
    expect(screen.getByText(/Submit Rating/)).toBeInTheDocument;
});