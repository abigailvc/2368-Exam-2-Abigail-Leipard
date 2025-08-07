// CIS 2368 - Summer 2025 - Exam 2
// Some parts of the server setup (such as EJS configuration and route structure) are adapted from Homework 3.

const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));

const API_KEY = "1f1492a4c61cc4c96f5c7fe2"; // Replace with your actual key if needed
const apiUrl = `https://v6.exchangerate-api.com/v6/NEW_API_KEY_HERE/latest/USD`;

// Root route renders the landing page with a Load button
app.get("/", (req, res) => {
  res.render("index", { loaded: false, conversions: null });
});

// Load route fetches exchange rate data and renders results
app.get("/convert", async (req, res) => {
  try {
    const response = await axios.get(API_URL);
    const rates = response.data.conversion_rates;

    const allCurrencies = Object.keys(rates);
    const shuffled = allCurrencies.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);

    const conversions = selected.map(code => {
      return {
        code: code,
        rate: rates[code],
        converted: (1 * rates[code]).toFixed(2)
      };
    });

    res.render("index", { loaded: true, conversions });
  } catch (error) {
    console.error("Error fetching currency data:", error);
    res.status(500).send("An error occurred while retrieving data.");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
