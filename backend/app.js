
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { searchGames, getPopularGames } = require('./services/api'); // Import the getPopularGames function

const app = express();

app.use(bodyParser.json());
app.use(cors()); // Add CORS support for development purposes

// Route to search for games
app.get('/api/search', async (req, res) => {
  const searchText = req.query.query; // Get the search text from the query parameters
  try {
    if (!searchText) {
      throw new Error('Search text is required');
    }
    const games = await searchGames(searchText);
    res.json(games);
  } catch (error) {
    console.error('Error during search:', error);
    res.status(500).json({ error: error.message });
  }
});

// Route to get popular games
app.get('/api/popular', async (req, res) => {
  try {
    const games = await getPopularGames();
    res.json(games);
  } catch (error) {
    console.error('Error fetching popular games:', error);
    res.status(500).json({ error: error.message });
  }
});

const port = process.env.PORT || 3001; // Changed to 3001 to avoid conflicts with React dev server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
