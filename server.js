const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;
const compression = require('compression');

app.use(compression());

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