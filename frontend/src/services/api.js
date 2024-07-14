import axios from 'axios';

// Function to search for games
export const searchGames = async (searchText) => {
  const response = await axios.get('http://localhost:3000/api/search', {
    params: {
      query: searchText,
    },
  });
  return response.data;
};
