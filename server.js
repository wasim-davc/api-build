const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;
const compression = require('compression');
const redirectToHTTPS = require('express-http-to-https').redirectToHTTPS

app.use(compression());

//https redirect
app.use(redirectToHTTPS([/localhost:(\d{4})/], 301));

//static path
app.use(express.static(path.join(__dirname, 'build')));

//server the index page
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


//set port for server
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});