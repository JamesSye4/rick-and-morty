import React, { useEffect, useState } from 'react';
import { fetchCharacters } from '../../api/rickAndMortyAPI';
import CharacterCard from '../CharacterCard/CharacterCard';
import SearchBar from '../SearchBar/SearchBar';
import './CharacterList.css';

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);  // New state for error handling
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const getCharacters = async () => {
      try {
        const data = await fetchCharacters();
        setCharacters(data.results);
        setFilteredCharacters(data.results);  // Initialize filtered characters
      } catch (error) {
        console.error('Failed to fetch characters:', error);
        setError('Failed to load characters. Please try again later.');  // Set error message
        setCharacters([]);  // Clear characters if there is an error
      } finally {
        setLoading(false);
      }
    };

    getCharacters();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = characters.filter((character) =>
      character.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredCharacters(filtered);
  };

  const resetSearch = () => {
    setSearchTerm('');
    setFilteredCharacters(characters);
  };

  if (loading) return <p>Loading...</p>;

  // Display error message if there was an error during the API call
  if (error) return <p className="error-message">{error}</p>;

  if (!loading && filteredCharacters.length === 0) {
    return (
      <div>
        <p>No characters found. Try a different search term.</p>
        <button onClick={resetSearch}>Reset</button>
      </div>
    );
  }

  return (
    <div className="character-list">
      <SearchBar onSearch={handleSearch} />
      {filteredCharacters.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </div>
  );
};

export default CharacterList;
