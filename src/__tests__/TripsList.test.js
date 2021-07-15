import React from 'react';
import { render, screen } from '@testing-library/react';
import TripsList from '../TripsList';

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
    Map: () => ({}),
}));  

const trips = [{tripId: 1, 
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

test('renders', () => {
    render(<TripsList trips={trips}/>);
});

test('matches snapshot', () => {
    const {asFragment} = render(<TripsList trips={trips}/>);
    expect(asFragment()).toMatchSnapshot();
});

test('renders no trips', () => {
    render(<TripsList trips={'no trips'}/>);
    expect(screen.getByText(/no trips/)).toBeInTheDocument;
    expect(screen.queryByText(/Show Trip/)).not.toBeInTheDocument;
});
