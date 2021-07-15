import React from 'react';
import { render, screen } from '@testing-library/react';
import TripNameForm from '../TripNameForm';

test('renders', () => {
    render(<TripNameForm/>);
    expect(screen.getByText(/Save Trip/)).toBeInTheDocument;
});

test('matches snapshot', () => {
    const {asFragment} = render(<TripNameForm/>);
    expect(asFragment()).toMatchSnapshot();
});