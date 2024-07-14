const axios = require('axios');

const API_URL = 'https://www.giantbomb.com/api';
const API_KEY = 'd19b6191e7653374a8923323ad9c924aba3db55c';

// Function to search for games
const searchGames = async (searchText) => {
  const url = `${API_URL}/search/?api_key=${API_KEY}&format=json&query=${searchText}&resources=game`;
  console.log('searchGames URL:', url); // Log the URL for debugging

  try {
    const response = await axios.get(url);
    console.log('Response data:', response.data); // Log the response data
    return response.data.results;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
      console.error('Error response headers:', error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Error request data:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error message:', error.message);
    }
    console.error('Error config:', error.config);
    throw error;
  }
};

module.exports = { searchGames };
