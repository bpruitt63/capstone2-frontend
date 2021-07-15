import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../Home';
import { BrowserRouter } from 'react-router-dom';

test('renders', () => {
    render(<BrowserRouter><Home/></BrowserRouter>);
    expect(screen.getByText(/Create a Boatey account/)).toBeInTheDocument;
});

test('renders logged in', () => {
    render(<BrowserRouter><Home username={'test'}/></BrowserRouter>);
    expect(screen.getByText(/Welcome back, test/)).toBeInTheDocument;
});

test('matches snapshot', () => {
    const {asFragment} = render(<BrowserRouter><Home/></BrowserRouter>);
    expect(asFragment()).toMatchSnapshot();
});