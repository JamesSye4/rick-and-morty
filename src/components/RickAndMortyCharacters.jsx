import React, { useEffect, useState } from "react";
import "../styles/App.css";


function RickAndMortyCharacters() {
  const [characters, setCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [page, setPage] = useState(1); // New state for page number
  const [hasMore, setHasMore] = useState(true); // New state to check if more pages are available

  // Function to fetch character data with pagination
  const fetchCharacters = async () => {
    setLoading(true);
    setError(null); // Reset error before making API call

    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
      if (!response.ok) {
        throw new Error("Failed to fetch characters.");
      }
      const data = await response.json();
      setCharacters((prevCharacters) => [...prevCharacters, ...data.results]); // Append new characters
      setHasMore(data.info.next !== null); // Check if there are more pages
    } catch (err) {
      setError(err.message); // Set the error message
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, [page]); // Fetch characters whenever the page changes

  const handleCharacterClick = (character) => {
    setSelectedCharacter(character);

    const episodeUrls = character.episode;
    Promise.all(episodeUrls.map((url) => fetch(url).then((res) => res.json())))
      .then((episodeData) => {
        setEpisodes(episodeData);
      })
      .catch((err) => {
        console.error("Error fetching episodes:", err);
      });
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
      setPage((prevPage) => prevPage + 1); // Load the next page
    }
  };

  // Filter characters based on the search term
  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Render loading spinner if data is still loading
  if (loading && characters.length === 0) {
    return <div className="spinner">Loading...</div>;
  }

  // If there's an error, display the error message and retry button
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

  // If no characters match the search term
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
          <p><strong>Status:</strong> {selectedCharacter.status}</p>
          <p><strong>Species:</strong> {selectedCharacter.species}</p>
          <p><strong>Origin:</strong> {selectedCharacter.origin.name}</p>
          <p><strong>Gender:</strong> {selectedCharacter.gender}</p>

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
