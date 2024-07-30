// backend/services/api.js
const axios = require('axios');

const API_URL = 'https://www.giantbomb.com/api';
const API_KEY = 'd19b6191e7653374a8923323ad9c924aba3db55c';

// Function to search for games
const searchGames = async (searchText) => {
  const limit = 50;
  const url = `${API_URL}/search/?api_key=${API_KEY}&format=json&query=${searchText}&resources=game&limit=20`;
  console.log('searchGames URL:', url); // Log the URL for debugging

  try {
    const response = await axios.get(url);
    console.log('Search Response data:', response.data); // Log the response data

    // Sort games by release date in descending order (latest to earliest)
    const sortedGames = response.data.results.sort((a, b) => new Date(b.original_release_date) - new Date(a.original_release_date));

    return sortedGames.map((game) => ({
      id: game.id,
      name: game.name,
      deck: game.deck,
      image: game.image,
      platforms: game.platforms,  // Ensure release date is included
    }));
  } catch (error) {
    handleError(error);
  }
};

// Function to get popular games
const getPopularGames = async () => {
  const url = `${API_URL}/games/?api_key=${API_KEY}&format=json&sort=original_release_date:desc&limit=10`;
  console.log('getPopularGames URL:', url); // Log the URL for debugging
  
  try {
    const response = await axios.get(url);
    console.log('Response data:', response.data); // Log the response data
    return response.data.results.map((game) => ({
      id: game.id,
      name: game.name,
      deck: game.deck,
      image: game.image,
      platforms: game.platforms,
      original_release_date: game.original_release_date, // Ensure there's an image URL
    }));
  } catch (error) {
    handleError(error);
  }
};

const handleError = (error) => {
  if (error.response) {
    console.error('Error response data:', error.response.data);
    console.error('Error response status:', error.response.status);
    console.error('Error response headers:', error.response.headers);
  } else if (error.request) {
    console.error('Error request data:', error.request);
  } else {
    console.error('Error message:', error.message);
  }
  console.error('Error config:', error.config);
  throw error;
};

module.exports = { searchGames, getPopularGames };
