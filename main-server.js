// app created for CIS 2368 - Summer 2025 - Exam 2
// builds a basic currency conversion interface using ExchangeRate-API

// some structure and EJS setup reused from HW3, credit noted for academic integrity
const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 3000;

// EJS setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// homepage route
app.get('/', (req, res) => {
    res.render('index');
});

// GET route for conversions after "Load" is clicked
app.get('/convert', async (req, res) => {
    try {
        // using exchangerate-api to get currency list and rates
        const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
        const rates = response.data.rates;

        const currencies = Object.keys(rates);

        // randomly choose 3 currencies (not USD)
        const shuffled = currencies.filter(curr => curr !== 'USD').sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 3);

        const results = selected.map(code => ({
            code,
            rate: rates[code]
        }));

        res.render('conversions', { results });
    } catch (error) {
        console.error('Error fetching data:', error.message);
        res.send('There was a problem fetching the currency data. Try again later.');
    }
});

// start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
