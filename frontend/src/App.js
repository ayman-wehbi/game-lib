import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GameList from './components/GameList';
import SearchBar from './components/SearchBar';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={
            <>
              <SearchBar onSearch={setSearchTerm} />
              <GameList searchTerm={searchTerm} />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
