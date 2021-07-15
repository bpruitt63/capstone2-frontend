import React from 'react';
import { render, screen } from '@testing-library/react';
import LocationForm from '../LocationForm';

test('renders', () => {
    render(<LocationForm/>);
    expect(screen.getByText(/Set Location/)).toBeInTheDocument;
});

test('matches snapshot', () => {
    const {asFragment} = render(<LocationForm/>);
    expect(asFragment()).toMatchSnapshot();
});