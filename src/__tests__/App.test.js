import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../App';
import { BrowserRouter } from 'react-router-dom';


jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  Map: () => ({}),
}));


test('renders', () => {
  render(<BrowserRouter>
          <App />
        </BrowserRouter>);
  const attribution = screen.getByText(/Weather info supplied by/);
  expect(attribution).toBeInTheDocument();
});
