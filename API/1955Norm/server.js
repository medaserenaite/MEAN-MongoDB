const express = require('express');
const MongoClient = require ('mongodb').MongoClient;
const path = require('path');

const app = express();
const PORT = 8000;

const bodyParser = require('body-parser');
app.use(bodyParser.json());

require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);

app.listen(4200, () => {
  console.log(`Listening on port 4200`);
})