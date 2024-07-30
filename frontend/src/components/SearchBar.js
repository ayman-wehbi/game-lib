import React, { useState } from 'react';
import '../styles/SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchText.trim() !== '') {
      onSearch(searchText);
    } else {
      alert('Please enter a search term');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Search for games..."
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;