// CharacterList.jsx
import React, { useEffect, useState } from "react";
import "../styles/App.css";

function RickAndMortyCharacters() {
  const [characters, setCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Fetch characters from API
  const fetchCharacters = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
      if (!response.ok) {
        throw new Error("Failed to fetch characters.");
      }
      const data = await response.json();
      setCharacters((prevCharacters) => [...prevCharacters, ...data.results]);
      setHasMore(data.info.next !== null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, [page]);

  // Log for debugging
  console.log("Characters:", characters);
  console.log("Search Term:", searchTerm);

  const handleCharacterClick = (character) => {
    setSelectedCharacter(character);
    Promise.all(character.episode.map((url) => fetch(url).then((res) => res.json())))
      .then(setEpisodes)
      .catch(console.error);
  };

  const handleCloseDetails = () => {
    setSelectedCharacter(null);
    setEpisodes([]);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  const loadMoreCharacters = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  // Filter only by character name
  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading && characters.length === 0) {
    return <div className="spinner">Loading...</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <p>Error: {error}</p>
        <button onClick={fetchCharacters} className="retry-button">
          Retry
        </button>
      </div>
    );
  }

  if (!loading && filteredCharacters.length === 0) {
    return (
      <div className="no-characters">
        <p>No characters found.</p>
        <button className="clear-button" onClick={handleClearSearch}>
          Clear Search
        </button>
      </div>
    );
  }

  return (
    <div className="character-container">
      <h2>Rick and Morty Characters</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search characters..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
        <button className="clear-button" onClick={handleClearSearch}>
          Clear Search
        </button>
      </div>

      <div className="character-list">
        {filteredCharacters.map((character) => (
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
          <button className="back-button" onClick={handleCloseDetails}>
            Back
          </button>
          <h3>{selectedCharacter.name}</h3>
          <img src={selectedCharacter.image} alt={selectedCharacter.name} />
          <p>
            <strong>Status:</strong> {selectedCharacter.status}
          </p>
          <p>
            <strong>Species:</strong> {selectedCharacter.species}
          </p>
          <p>
            <strong>Origin:</strong> {selectedCharacter.origin.name}
          </p>
          <p>
            <strong>Gender:</strong> {selectedCharacter.gender}
          </p>

          <h4>Episodes:</h4>
          <ul className="episode-list">
            {episodes.map((episode) => (
              <li key={episode.id}>
                {episode.name} (Air Date: {episode.air_date})
              </li>
            ))}
          </ul>
        </div>
      )}

      {loading && <div className="spinner">Loading...</div>}
    </div>
  );
}

export default RickAndMortyCharacters;


