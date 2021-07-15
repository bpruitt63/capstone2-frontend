import React from 'react';
import { render, screen } from '@testing-library/react';
import RegisterForm from '../RegisterForm';

test('renders', () => {
    render(<RegisterForm/>);
    expect(screen.getByText(/Create a new Boatey account/)).toBeInTheDocument;
    expect(screen.queryByText(/Username/)).toBeInTheDocument;
});

test('matches snapshot', () => {
    const {asFragment} = render(<RegisterForm/>);
    expect(asFragment()).toMatchSnapshot();
});