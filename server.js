const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;
const env = process.env.NODE_ENV || "production";
const compression = require('compression');

app.use(compression());

app.use((req, res, next) => {
  if(env === "production"){
    if (req.headers.host.slice(0, 4) === "www.") {
      var newHost = req.headers.host.slice(4);
      res.redirect(301, req.protocol + "://" + newHost + req.originalUrl);
    }
    else {
      next();
    }
  }
});

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