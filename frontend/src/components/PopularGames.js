import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GameCard from './GameCard';
import '../styles/PopularGames.css';

const PopularGames = () => {
  const [popularGames, setPopularGames] = useState([]);

  useEffect(() => {
    const fetchPopularGames = async () => {
      try {
        const response = await axios.get('/api/popular');
        console.log('Popular Games:', response.data); // Log the response data
        setPopularGames(response.data);
      } catch (error) {
        console.error('Error fetching popular games:', error);
      }
    };

    fetchPopularGames();
  }, []);

  return (
    <div className="popular-games">
      <div className="game-card-list">
        {popularGames.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
};

export default PopularGames;
