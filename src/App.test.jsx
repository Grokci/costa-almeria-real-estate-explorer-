import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

describe('Costa de Almeria property map app', () => {
  test('renders the main heading and OpenStreetMap action', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: /costa de almería over a real openstreetmap basemap/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /open full map/i })).toHaveAttribute('href', expect.stringContaining('openstreetmap.org'));
  });

  test('updates the selected place when a list item is clicked', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /san juan de los terreros/i }));

    const selectedPlaceHeadings = screen.getAllByRole('heading', { level: 2, name: /san juan de los terreros/i });
    expect(selectedPlaceHeadings.length).toBeGreaterThan(0);
    expect(screen.getByText(/far-east lifestyle market close to the murcia border/i)).toBeInTheDocument();
  });

  test('shows built-in checks including map url built', () => {
    render(<App />);

    expect(screen.getByText(/map url built/i)).toBeInTheDocument();
    expect(screen.getAllByText('PASS').length).toBeGreaterThan(0);
  });
});
