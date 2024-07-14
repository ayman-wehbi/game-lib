const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { searchGames } = require('./services/api'); // Import the searchGames function

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

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
