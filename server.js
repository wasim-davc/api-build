const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;
const compression = require('compression');

app.use(compression());

//static path
app.use(express.static(path.join(__dirname, 'build')));

//https redirect
app.enable('trust proxy')
app.use((req, res, next) => {
  req.secure ? next() : res.redirect('https://' + req.headers.host + req.url)
})

//www redirect
app.get('/*', function(req, res, next) {
  if (req.headers.host.match(/^www/) !== null ) {
    res.redirect('http://' + req.headers.host.replace(/^www\./, '') + req.url);
  } else {
    next();     
  }
})


//server the index page
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


//set port for server
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});