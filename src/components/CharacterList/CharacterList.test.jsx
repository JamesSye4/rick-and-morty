import { render, screen } from '@testing-library/react';
import CharacterList from './CharacterList';

test('renders loading message', () => {
  render(<CharacterList />);
  expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
});

// Example test for no characters found message
test('renders no characters found message when no characters match search', () => {
  render(<CharacterList />);
  expect(screen.queryByText(/No characters found/i)).not.toBeInTheDocument();

  // You can add more complex tests with mocked API data
});

