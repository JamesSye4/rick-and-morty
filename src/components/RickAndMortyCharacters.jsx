//RickAndMortyCharacters.jsx
import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar/SearchBar";
import "../styles/App.css";

function RickAndMortyCharacters() {
  const [characters, setCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Fetch characters from the API with optional search term
  const fetchCharacters = async () => {
    setLoading(true);
    setError(null);

    try {
      const searchQuery = searchTerm ? `&name=${searchTerm}` : "";
      const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}${searchQuery}`);
      
      if (!response.ok) throw new Error("Failed to fetch characters.");

      const data = await response.json();
      setCharacters((prev) => (page === 1 ? data.results : [...prev, ...data.results]));
      setHasMore(data.info.next !== null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, [page, searchTerm]);

  // Handle changes in search term
  const handleSearch = (term) => {
    setSearchTerm(term);
    setPage(1); // Reset to page 1 on new search
    setCharacters([]); // Clear characters on new search
  };

  const handleCharacterClick = (character) => {
    setSelectedCharacter(character);
    Promise.all(character.episode.map((url) => fetch(url).then((res) => res.json())))
      .then(setEpisodes)
      .catch(console.error);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setPage(1);
    setCharacters([]); // Clear characters on clear
  };

  const loadMoreCharacters = () => {
    if (hasMore && !loading) setPage((prev) => prev + 1);
  };

  // Render the loading state, error, and filtered characters
  return (
    <div className="character-container">
      <h2>Rick and Morty Characters</h2>
      <SearchBar onSearch={handleSearch} onClear={handleClearSearch} searchTerm={searchTerm} />
      {error && <p className="error">{error}</p>}
      {loading && <div className="spinner">Loading...</div>}

      <div className="character-list">
        {characters.map((character) => (
          <div
            className="character-card"
            key={character.id}
            onClick={() => handleCharacterClick(character)}
          >
            <h3>{character.name}</h3>
            <img src={character.image} alt={character.name} />
          </div>
        ))}
      </div>

      {hasMore && !loading && (
        <button onClick={loadMoreCharacters} className="load-more-button">
          Load More
        </button>
      )}

      {selectedCharacter && (
        <div className="character-details">
          <button className="back-button" onClick={() => setSelectedCharacter(null)}>
            Back
          </button>
          <h3>{selectedCharacter.name}</h3>
          <img src={selectedCharacter.image} alt={selectedCharacter.name} />
          <p><strong>Status:</strong> {selectedCharacter.status}</p>
          <p><strong>Species:</strong> {selectedCharacter.species}</p>
          <p><strong>Origin:</strong> {selectedCharacter.origin.name}</p>
          <p><strong>Gender:</strong> {selectedCharacter.gender}</p>
          <h4>Episodes:</h4>
          <ul className="episode-list">
            {episodes.map((episode) => (
              <li key={episode.id}>{episode.name} (Air Date: {episode.air_date})</li>
            ))}
          </ul>
        </div>
      )}

      {loading && <div className="spinner">Loading...</div>}
    </div>
  );
}

export default RickAndMortyCharacters;

