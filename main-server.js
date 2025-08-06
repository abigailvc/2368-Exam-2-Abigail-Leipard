// Server file to launch the currency conversion app

const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Setting up EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Telling Express where static files like CSS will be served from
app.use(express.static(path.join(__dirname, 'public')));

// Routing to homepage
app.get('/', (req, res) => {
  res.render('index');
});

// Starting the server on localhost
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
