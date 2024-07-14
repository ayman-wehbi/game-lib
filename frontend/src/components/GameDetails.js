import React, { useState, useEffect } from 'react';
import { getGameDetails } from '../services/api';
import '../styles/GameDetails.css';

const GameDetails = () => {
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const gameId = sessionStorage.getItem('gameID');

  useEffect(() => {
    if (gameId) {
      getGameDetails(gameId)
        .then(data => {
          setGame(data);
          setLoading(false);
        })
        .catch(error => {
          setError(error);
          setLoading(false);
        });
    }
  }, [gameId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    game && (
      <div className="game-details">
        <div className="row">
          <div className="col-md-4">
            <img className="rounded" src={game.image.medium_url} alt={game.name} />
          </div>
          <div className="col-md-8">
            <h2>{game.name}</h2>
            <p>{game.deck || 'No description available'}</p>
            <ul className="list-group">
              <li className="list-group-item"><strong>Platforms:</strong> {game.platforms.map(p => p.name).join(', ') || 'N/A'}</li>
              <li className="list-group-item"><strong>Genres:</strong> {game.genres.map(g => g.name).join(', ') || 'N/A'}</li>
              <li className="list-group-item"><strong>Themes:</strong> {game.themes.map(t => t.name).join(', ') || 'N/A'}</li>
              <li className="list-group-item"><strong>Developers:</strong> {game.developers.map(d => d.name).join(', ') || 'N/A'}</li>
              <li className="list-group-item"><strong>Publishers:</strong> {game.publishers.map(p => p.name).join(', ') || 'N/A'}</li>
              <li className="list-group-item">
                {game.expected_release_year ? (
                  <strong>Expected release year: {game.expected_release_year}</strong>
                ) : game.original_release_date ? (
                  <strong>Original release date: {game.original_release_date}</strong>
                ) : (
                  <strong>Release date: N/A</strong>
                )}
              </li>
            </ul>
            <a href={game.site_detail_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">View on Giantbomb</a>
            <a href="search.html" className="btn btn-link">Go Back To Search</a>
          </div>
        </div>
      </div>
    )
  );
};

export default GameDetails;
