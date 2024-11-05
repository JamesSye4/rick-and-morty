import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from './SearchBar';

test('updates search term on user input', () => {
  const mockOnSearch = vi.fn();  // Use `vi.fn()` from Vitest instead of `jest.fn()`
  render(<SearchBar onSearch={mockOnSearch} />);

  const input = screen.getByPlaceholderText(/Search characters.../i);

  // Simulate user typing "Morty"
  fireEvent.change(input, { target: { value: 'Morty' } });

  expect(mockOnSearch).toHaveBeenCalledWith('Morty');  // Check if onSearch was called
});

