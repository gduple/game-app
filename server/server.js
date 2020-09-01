// import dotenv module in this file
require('dotenv').config();

// import express module into file
const express = require('express');

// import express body-parser module
const bodyParser = require('body-parser');

// import cookie parser from express framework
const cookieParser = require('cookie-parser');

// create variable set to new express instance
const app = express();

// import path module to serve static assets
const path = require('path');

// utilize cookie-parser middleware from express framework
app.use(cookieParser());

// utilize body parser on incoming requests to server
app.use(bodyParser.json());

// utilize the urlencoder from express framework
app.use(bodyParser.urlencoded({ extended: false }));

// require DB and API routers in server file to properly route request through server
const database = require('../routes/dbRoutes');
const api = require('../routes/apiRoutes');

// set port for server to run on with backup port
const port = process.env.PORT || 3000;

// dummy data to test routes
const groupName = "Don't Phase Me Bros.";
const projectName = 'Game Time';
const dummyData = {
  group: `${groupName}`,
  project: `${projectName}`,
};

// use router to direct to dbRoutes file
app.use('/', database);

// use router to direct to apiRoutes file
app.use('/api', api);

// create variables to rep static file paths to be served
const DIST_DIR = path.join(__dirname, '../dist');
const HTML_FILE = path.join(DIST_DIR, 'index.html');

// middleware to server static files
app.use(express.static(DIST_DIR));

// A Test Route
app.get('/test', (req, res) => {
  res.send(dummyData); // used to test server
});

// route serving static files
app.get('/*', (req, res) => {
  res.sendFile(HTML_FILE);
});

// set server to listen for events on PORT
app.listen(port, () => {
  console.log(`This server only listens to:${port}`);
});
