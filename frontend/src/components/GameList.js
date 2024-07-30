import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GameCard from './GameCard';
import '../styles/GameList.css';

const GameList = ({ searchTerm }) => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      if (searchTerm) {
        try {
          const response = await axios.get(`/api/search?query=${searchTerm}`);
          setGames(response.data);
        } catch (error) {
          console.error('Error fetching search results:', error);
        }
      }
    };

    fetchGames();
  }, [searchTerm]);

  return (
    <div className="game-list">
      <div className="game-card-list">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
};

export default GameList;
