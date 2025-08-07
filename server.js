// server.js
const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware setup
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Render the homepage on load
app.get('/', (req, res) => {
  res.render('index');
});

// This route returns 3 random exchange rates to the frontend
app.get('/get-rates', async (req, res) => {
  try {
    const url = 'https://v6.exchangerate-api.com/v6/cb1d0861b7f003a6bec09003/latest/USD';
    const response = await axios.get(url);
    const rates = response.data.conversion_rates;

    // Reused array filtering and randomization logic from Homework 3 (User: Abigail)
    const foreignCurrencies = Object.keys(rates).filter(code => code !== 'USD');

    const selected = [];
    while (selected.length < 3) {
      const random = foreignCurrencies[Math.floor(Math.random() * foreignCurrencies.length)];
      if (!selected.includes(random)) selected.push(random);
    }

    // Format the response for each selected currency
    const results = selected.map(code => {
      const rate = rates[code];
      const cost = (100 / rate).toFixed(2); // Cost to buy 100 units of that currency
      return {
        code,
        rate,
        cost
      };
    });

    res.json(results);
  } catch (err) {
    console.error('Error fetching API:', err);
    res.status(500).json({ error: 'API fetch failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
