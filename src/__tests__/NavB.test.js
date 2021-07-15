import React from 'react';
import { render, screen } from '@testing-library/react';
import NavB from '../NavB';
import { BrowserRouter } from 'react-router-dom';

test('renders', () => {
    render(<BrowserRouter><NavB/></BrowserRouter>);
    expect(screen.getByText(/Boatey/)).toBeInTheDocument;
});

test('renders logged out', () => {
    render(<BrowserRouter><NavB isMobile={false}/></BrowserRouter>);
    expect(screen.getByText(/Log In/)).toBeInTheDocument;
});

test('renders logged out Mobile', () => {
    render(<BrowserRouter><NavB isMobile={true}/></BrowserRouter>);
    expect(screen.getByText(/Options/)).toBeInTheDocument;
    expect(screen.getByText(/Log In/)).not.toBeInTheDocument;
});

test('renders logged in', () => {
    render(<BrowserRouter><NavB isMobile={false} username={'test'}/></BrowserRouter>);
    expect(screen.getByText(/test/)).toBeInTheDocument;
});

test('renders logged in Mobile', () => {
    render(<BrowserRouter><NavB isMobile={true} username={'test'}/></BrowserRouter>);
    expect(screen.getByText(/Options/)).toBeInTheDocument;
    expect(screen.getByText(/test/)).not.toBeInTheDocument;
});

test('matches snapshot', () => {
    const {asFragment} = render(<BrowserRouter><NavB/></BrowserRouter>);
    expect(asFragment()).toMatchSnapshot();
});