//SearchBar.jsx
import React, { useState } from 'react';

const SearchBar = ({ onSearch, searchTerm, onClear }) => {
  const [term, setTerm] = useState(searchTerm);

  const handleChange = (event) => {
    const newTerm = event.target.value;
    setTerm(newTerm);
    onSearch(newTerm); // Pass the search term to the parent
  };

  const handleClear = () => {
    setTerm("");
    onSearch("");
    onClear(); // Call the parent’s clear function
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        value={term}
        onChange={handleChange}
        placeholder="Search characters..."
        className="search-bar"
      />
      {term && (
        <button onClick={handleClear} className="clear-button">
          Clear
        </button>
      )}
    </div>
  );
};

export default SearchBar;
