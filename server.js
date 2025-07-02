const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

app.get('/rate', async (req, res) => {
  try {
    const response = await axios.get('https://api.currencyfreaks.com/v2.0/rates/latest?symbols=XAU,CAD,USD', {
      headers: {
        // CurrencyFreaks does not require API key in headers, uses query param instead
        // So the key is in the URL as ?apikey=...
      },
      params: {
        apikey: process.env.API_KEY
      }
    });

    // Return only the rates object to the frontend
    res.json(response.data.rates);
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch exchange rate' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
