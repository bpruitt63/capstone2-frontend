import React from 'react';
import { render, screen } from '@testing-library/react';
import PointRatingForm from '../PointRatingForm';

test('renders', () => {
    render(<PointRatingForm point={{id: 'test'}}/>);
    expect(screen.getByText(/Rate This Location:/)).toBeInTheDocument;
});

test('matches snapshot', () => {
    const {asFragment} = render(<PointRatingForm point={{id: 'test'}}/>);
    expect(asFragment()).toMatchSnapshot();
});