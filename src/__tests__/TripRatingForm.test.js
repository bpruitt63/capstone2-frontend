import React from 'react';
import { render, screen } from '@testing-library/react';
import TripRatingForm from '../TripRatingForm';

test('renders', () => {
    render(<TripRatingForm trip={{tripRating: 3}}/>);
    expect(screen.getByText(/Rate This Trip:/)).toBeInTheDocument;
});

test('matches snapshot', () => {
    const {asFragment} = render(<TripRatingForm trip={{tripRating: 3}}/>);
    expect(asFragment()).toMatchSnapshot();
});