import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DeleteModal from '../DeleteModal';


test('renders', () => {
    render(<DeleteModal/>);
    expect(screen.queryByText(/Are you sure you want to permanently delete this trip/)).not.toBeInTheDocument;
    const toggleButton = screen.getByText(/Delete Trip/);
    fireEvent.click(toggleButton);
    expect(screen.getByText(/Are you sure you want to permanently delete this trip/)).toBeInTheDocument;
});

test('matches snapshot', () => {
    const {asFragment} = render(<DeleteModal/>);
    expect(asFragment()).toMatchSnapshot();
});