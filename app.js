const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes/routes');

const app = express();

const PORT = 5000;

const mongodbUrl = 'mongodb://admin:admin12345@ds135036.mlab.com:35036/bright';

mongoose.connect(mongodbUrl, { useNewUrlParser: true }, (err) => {
    if (err) throw err;
    console.log('app.js: database connected');
})

app.use(express.urlencoded({ extended: false }))

app.use(bodyParser.json());

app.use(cors());

app.use('/', routes);


app.listen(PORT, () => {
    console.log(`Server is running on :${PORT}`);
})