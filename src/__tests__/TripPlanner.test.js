import React from 'react';
import { render, screen, fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
import TripPlanner from '../TripPlanner';
import { BrowserRouter } from 'react-router-dom';
import MarinasApi from '../MarinasApi';
import BoateyApi from '../BoateyApi';


jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
    Map: () => ({}),
}));  

jest.mock('../MarinasApi');

jest.mock('../BoateyApi');

const marinasRes = {data: {data: [{id: 'test1', 
                                    kind: 'marina',
                                    name: 'Test Location',
                                    review_count: 0,
                                    web_url: 'https://google.com',
                                    location: {lat: 40, lon: 10},
                                    fuel: {has_diesel: false,
                                            has_propane: false,
                                            has_gas: true}},
                                    {id: 'test2', 
                                    kind: 'ramp',
                                    name: 'Test Location 2',
                                    review_count: 0,
                                    web_url: 'https://google.com',
                                    location: {lat: 50, lon: 15},
                                    fuel: {has_diesel: false,
                                            has_propane: false,
                                            has_gas: false}}]}};

const tripsRes = [{tripId: 1, 
                    tripName: 'test1', 
                    distance: '1000', 
                    tripRating: 1, 
                    locations: [{locationId: "testLoc1", 
                                locationPosition: 0, 
                                locationName: 'testLocName1'},
                                {locationId: "testLoc2", 
                                locationPosition: 1, 
                                locationName: 'testLocName2'}]},
                    {tripId: 2, 
                    tripName: 'test2', 
                    distance: '1000', 
                    tripRating: null, 
                    locations: [{locationId: "testLoc2", 
                                locationPosition: 0, 
                                locationName: 'testLocName2'},
                                {locationId: "testLoc1", 
                                locationPosition: 1, 
                                locationName: 'testLocName1'}]}];

test('renders', async () => {
    MarinasApi.getPoints.mockResolvedValue(marinasRes);
    BoateyApi.getUserTrips.mockResolvedValue(tripsRes);
    BoateyApi.getRecentTrips.mockResolvedValue(tripsRes);
    render(<BrowserRouter><TripPlanner/></BrowserRouter>);
    await waitForElementToBeRemoved(() => screen.getByText(/Loading.../));
});

test('matches snapshot', async () => {
    MarinasApi.getPoints.mockResolvedValue(marinasRes);
    BoateyApi.getUserTrips.mockResolvedValue(tripsRes);
    BoateyApi.getRecentTrips.mockResolvedValue(tripsRes);
    const {asFragment} = render(<BrowserRouter><TripPlanner/></BrowserRouter>);
    await waitForElementToBeRemoved(() => screen.getByText(/Loading.../));
    expect(asFragment()).toMatchSnapshot();
});

test('renders logged out', async () => {
    MarinasApi.getPoints.mockResolvedValue(marinasRes);
    BoateyApi.getUserTrips.mockResolvedValue(tripsRes);
    BoateyApi.getRecentTrips.mockResolvedValue(tripsRes);
    render(<BrowserRouter><TripPlanner/></BrowserRouter>);
    await waitForElementToBeRemoved(() => screen.getByText(/Loading.../));
    expect(screen.getByText(/to create your own trips./)).toBeInTheDocument;
    expect(screen.queryByText(/Show Saved Trips/)).not.toBeInTheDocument;
    expect(screen.getByText(/Test Location 2/)).toBeInTheDocument;
});

test('renders logged in', async () => {
    MarinasApi.getPoints.mockResolvedValue(marinasRes);
    BoateyApi.getUserTrips.mockResolvedValue(tripsRes);
    BoateyApi.getRecentTrips.mockResolvedValue(tripsRes);
    render(<BrowserRouter><TripPlanner username={'test'}/></BrowserRouter>);
    await waitForElementToBeRemoved(() => screen.getByText(/Loading.../));
    expect(screen.queryByText(/to create your own trips./)).not.toBeInTheDocument;
    expect(screen.getByText(/Show Saved Trips/)).toBeInTheDocument;
    expect(screen.getByText(/Test Location 2/)).toBeInTheDocument;
});

test('toggles shown trips logged out', async () => {
    MarinasApi.getPoints.mockResolvedValue(marinasRes);
    BoateyApi.getUserTrips.mockResolvedValue(tripsRes);
    BoateyApi.getRecentTrips.mockResolvedValue(tripsRes);
    render(<BrowserRouter><TripPlanner/></BrowserRouter>);
    await waitForElementToBeRemoved(() => screen.getByText(/Loading.../));
    expect(screen.queryByText(/test1/)).not.toBeInTheDocument;
    expect(screen.queryByText(/Show Saved Trips/)).not.toBeInTheDocument;
    fireEvent.click(screen.getByText(/Show Recent Trips/));
    expect(screen.getByText(/test1/)).toBeInTheDocument;
    fireEvent.click(screen.getByText(/Hide Recent Trips/));
    expect(screen.queryByText(/test1/)).not.toBeInTheDocument;
});

test('toggles shown trips logged in', async () => {
    MarinasApi.getPoints.mockResolvedValue(marinasRes);
    BoateyApi.getUserTrips.mockResolvedValue(tripsRes);
    BoateyApi.getRecentTrips.mockResolvedValue(tripsRes);
    render(<BrowserRouter><TripPlanner username={'test'}/></BrowserRouter>);
    await waitForElementToBeRemoved(() => screen.getByText(/Loading.../));
    expect(screen.queryByText(/test1/)).not.toBeInTheDocument;
    fireEvent.click(screen.getByText(/Show Saved Trips/));
    expect(screen.getByText(/test1/)).toBeInTheDocument;
    fireEvent.click(screen.getByText(/Hide Saved Trips/));
    expect(screen.queryByText(/test1/)).not.toBeInTheDocument;
});