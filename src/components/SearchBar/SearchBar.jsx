import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    onSearch(term);  // Pass the search term to the parent component
  };

  return (
    <input
      type="text"
      value={searchTerm}
      onChange={handleSearch}
      placeholder="Search characters..."
      className="search-bar"
    />
  );
};

export default SearchBar;

