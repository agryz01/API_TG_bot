const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const { MONGODB_URL } = require('./utils/mongoConfig');

const app = express();

const { PORT = 3000 } = process.env;
mongoose.connect(MONGODB_URL);

app.use(routes);

app.listen(PORT, () => {
});