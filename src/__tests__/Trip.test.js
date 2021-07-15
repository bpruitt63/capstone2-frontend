import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Trip from '../Trip';

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
    Map: () => ({}),
}));  

const trip = {tripId: 1, 
                tripName: 'test1', 
                distance: '1000', 
                tripRating: 1, 
                locations: [{locationId: "testLoc1", 
                            locationPosition: 0, 
                            locationName: 'testLocName1'},
                            {locationId: "testLoc2", 
                            locationPosition: 1, 
                            locationName: 'testLocName2'}]};

test('renders', () => {
    render(<Trip trip={trip}/>);
});

test('matches snapshot', () => {
    const {asFragment} = render(<Trip trip={trip}/>);
    expect(asFragment()).toMatchSnapshot();
});

test('renders recent trip', () => {
    render(<Trip trip={trip}/>);
    expect(screen.getByText(/Show Trip/)).toBeInTheDocument;
    expect(screen.queryByText(/Delete Trip/)).not.toBeInTheDocument;
});

test('renders user trip', () => {
    render(<Trip trip={trip} username={'test'}/>);
    expect(screen.getByText(/Show Trip/)).toBeInTheDocument;
    expect(screen.getByText(/Delete Trip/)).toBeInTheDocument;
});

test('shows details', () => {
    render(<Trip trip={trip}/>);
    fireEvent.click(screen.getByText(/Show Trip/));
    expect(screen.getByText(/testLocName1/)).toBeInTheDocument;
    expect(screen.getByText(/testLocName2/)).toBeInTheDocument;
    expect(screen.queryByText(/Show Trip/)).not.toBeInTheDocument;
    fireEvent.click(screen.getByText(/Hide Trip/));
    expect(screen.queryByText(/testLocName1/)).not.toBeInTheDocument;
    expect(screen.queryByText(/testLocName2/)).not.toBeInTheDocument;
    expect(screen.getByText(/Show Trip/)).toBeInTheDocument;
});