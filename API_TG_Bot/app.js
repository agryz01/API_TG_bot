require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const routes = require('./routes');

const { MONGODB_URL } = require('./utils/mongoConfig');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());
app.use(cookieParser());

mongoose.connect(MONGODB_URL);

app.use(routes);

app.listen(PORT, () => {
});