import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import GameList from './components/GameList';
import SearchBar from './components/SearchBar';
import PopularGames from './components/PopularGames';
import './styles/App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (term) => {
    setSearchTerm(term);
    navigate('/search');
  };

  return (
    <div className="app-container">
      <SearchBar onSearch={handleSearch} />
      <Routes>
        <Route path="/" element={<PopularGames />} />
        <Route path="/search" element={<GameList searchTerm={searchTerm} />} />
      </Routes>
      <footer>
        <p>&copy; 2024 My Game Library</p>
      </footer>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
