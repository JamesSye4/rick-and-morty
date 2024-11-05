import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import CharacterCard from './CharacterCard';

test('renders character name', () => {
  const character = { id: 1, name: 'Rick Sanchez', image: '', species: 'Human' };

  render(
    <Router>
      <CharacterCard character={character} />
    </Router>
  );

  expect(screen.getByText(/Rick Sanchez/i)).toBeInTheDocument();
});

