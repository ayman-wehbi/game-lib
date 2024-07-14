import React from 'react';
import '../styles/GameItem.css';

const GameItem = ({ game }) => {
  return (
    <div className="game-item">
      <h2>{game.name}</h2>
      <img src={game.image.small_url} alt={game.name} />
      <p>{game.deck}</p>
    </div>
  );
};

export default GameItem;
