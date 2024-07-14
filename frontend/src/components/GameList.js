import React, { useState, useEffect } from 'react';
import GameItem from './GameItem';
import { searchGames } from '../services/api';
import '../styles/GameList.css';

const GameList = ({ searchTerm }) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (searchTerm) {
      setLoading(true);
      searchGames(searchTerm)
        .then(data => setGames(data))
        .catch(error => setError(error))
        .finally(() => setLoading(false));
    }
  }, [searchTerm]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="game-list">
      {games.map(game => (
        <GameItem key={game.id} game={game} />
      ))}
    </div>
  );
};

export default GameList;
