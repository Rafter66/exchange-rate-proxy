const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

app.get('/rate', async (req, res) => {
  try {
    const response = await axios.get('https://api.api-ninjas.com/v1/exchangerate?pair=USD_CAD', {
      headers: {
        'X-Api-Key': process.env.API_KEY
      }
    });
    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch exchange rate' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
