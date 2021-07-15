import React from 'react';
import { render, screen, fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
import Point from '../Point';
import MarinasApi from '../MarinasApi';
import { BrowserRouter } from 'react-router-dom';

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
    Map: () => ({}),
}));

jest.mock('../MarinasApi');

const searchedPoint = {id: 'test1', 
                kind: 'marina',
                name: 'Test Location',
                review_count: 0,
                web_url: 'https://google.com',
                location: {lat: 40, lon: 10},
                fuel: {has_diesel: false,
                        has_propane: false,
                        has_gas: true},
                images: {data: []}};

const savedPoint = {locationId: 'test2',
                    locationPosition: 0, 
                    locationName: 'Test Location 2'};

test('renders', () => {
    render(<BrowserRouter><Point point={searchedPoint}/></BrowserRouter>);
});

test('matches snapshot', () => {
    const {asFragment} = render(<BrowserRouter><Point point={searchedPoint}/></BrowserRouter>);
    expect(asFragment()).toMatchSnapshot();
});

test('renders point of interest', () => {
    render(<BrowserRouter><Point point={searchedPoint} searchHere={{}}/></BrowserRouter>);
    expect(screen.getByText(/Marina/)).toBeInTheDocument;
    expect(screen.getByText(/Center Search Here/)).toBeInTheDocument;
});

test('renders recent trip point and shows details', async () => {
    MarinasApi.getOnePoint.mockResolvedValue(searchedPoint);
    render(<BrowserRouter><Point point={savedPoint} isSaved={true}/></BrowserRouter>);
    expect(screen.queryByText(/Marina/)).not.toBeInTheDocument;
    expect(screen.getByText(/Test Location 2/)).toBeInTheDocument;
    fireEvent.click(screen.getByText(/Show Details/));
    await waitForElementToBeRemoved(() => screen.getByText(/Show Details/));
    expect(screen.getByText(/Fuel available/)).toBeInTheDocument;
    expect(screen.queryByText(/Your Rating:/)).not.toBeInTheDocument;
});

test('renders user trip point and shows details', async () => {
    MarinasApi.getOnePoint.mockResolvedValue(searchedPoint);
    render(<BrowserRouter><Point point={savedPoint} isSaved={true} username={'test'}/></BrowserRouter>);
    expect(screen.queryByText(/Marina/)).not.toBeInTheDocument;
    expect(screen.getByText(/Test Location 2/)).toBeInTheDocument;
    fireEvent.click(screen.getByText(/Show Details/));
    await waitForElementToBeRemoved(() => screen.getByText(/Show Details/));
    expect(screen.getByText(/Fuel available/)).toBeInTheDocument;
    expect(screen.getByText(/Your Rating:/)).toBeInTheDocument;
});