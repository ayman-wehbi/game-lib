import React, { useState } from 'react';
import '../styles/GameCard.css';

const GameCard = ({ game }) => {
  const placeholderImage = 'path/to/placeholder-image.jpg'; // Path to a placeholder image in case the game image is missing
  const [showAllPlatforms, setShowAllPlatforms] = useState(false);

  const handleMouseEnter = () => {
    setShowAllPlatforms(true);
  };

  const handleMouseLeave = () => {
    setShowAllPlatforms(false);
  };

  const platforms = game.platforms || [];
  const displayedPlatforms = platforms.slice(0, 3);
  const hiddenPlatforms = platforms.slice(3);

  return (
    <div className="game-card">
      <img src={game.image.small_url || placeholderImage} alt={game.name} className="game-card-image" />
      <div className="game-card-content">
        <h2 className="game-card-title">{game.name}</h2>
        <p className="game-card-description">{game.deck}</p>
      </div>
      <div className="game-card-platforms">
        {displayedPlatforms.map((platform) => (
          <span key={platform.id} className="platform-tag">{platform.name}</span>
        ))}
        {hiddenPlatforms.length > 0 && (
          <span
            className="platform-tag more-platforms"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            ...
            {showAllPlatforms && (
              <div className="tooltip">
                {hiddenPlatforms.map((platform) => (
                  <span key={platform.id} className="platform-tag">{platform.name}</span>
                ))}
              </div>
            )}
          </span>
        )}
      </div>
    </div>
  );
};

export default GameCard;
