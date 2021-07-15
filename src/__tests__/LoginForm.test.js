import React from 'react';
import { render, screen } from '@testing-library/react';
import LoginForm from '../LoginForm';

test('renders', () => {
    render(<LoginForm isMobile={false}/>);
    expect(screen.getByText(/Log In/)).toBeInTheDocument;
    expect(screen.queryByText(/username/)).not.toBeInTheDocument;
});

test('renders mobile', () => {
    render(<LoginForm isMobile={true}/>);
    expect(screen.getByText(/Log In/)).toBeInTheDocument;
    expect(screen.queryByText(/username/)).toBeInTheDocument;
});

test('matches snapshot', () => {
    const {asFragment} = render(<LoginForm/>);
    expect(asFragment()).toMatchSnapshot();
});