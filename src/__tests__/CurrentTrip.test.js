import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CurrentTrip from '../CurrentTrip';


test('renders', () => {
    render(<CurrentTrip currentTrip={[]}/>);
});

test('matches snapshot', () => {
    const {asFragment} = render(<CurrentTrip currentTrip={[]}/>);
    expect(asFragment()).toMatchSnapshot();
});

test('renders w/ trip', () => {
    render(<CurrentTrip currentTrip={[{name: "test", 
                                        location:[20, 25], 
                                        id: 'testId',
                                        totalDistance: 0},
                                    {name: "test2", 
                                        location:[30, 35], 
                                        id: 'testId2',
                                        totalDistance: 33}]} />);
    expect(screen.getByText(/test2/)).toBeInTheDocument;
    expect(screen.getByText(/0.03/)).toBeInTheDocument;
});

test('deletes trip', () => {
    render(<CurrentTrip currentTrip={[{name: "test", 
                                        location:[20, 25], 
                                        id: 'testId',
                                        totalDistance: 0},
                                    {name: "test2", 
                                        location:[30, 35], 
                                        id: 'testId2',
                                        totalDistance: 33}]} />);
    const deleteButton = screen.getByText(/Delete Current Trip/);
    fireEvent.click(deleteButton);
    expect(screen.getByText(/test2/)).not.toBeInTheDocument;
    expect(screen.getByText(/0.03/)).not.toBeInTheDocument;
});

test('tripRatingForm shows only with trip', () => {
    render(<CurrentTrip currentTrip={[{name: "test", 
                                        location:[20, 25], 
                                        id: 'testId',
                                        totalDistance: 0},
                                    {name: "test2", 
                                        location:[30, 35], 
                                        id: 'testId2',
                                        totalDistance: 33}]} />);
    expect(screen.getByText(/Save Trip/)).toBeInTheDocument;
    const deleteButton = screen.getByText(/Delete Current Trip/);
    fireEvent.click(deleteButton);
    expect(screen.queryByText(/Save Trip/)).not.toBeInTheDocument;
});