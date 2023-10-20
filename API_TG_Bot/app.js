require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
// const { errors } = require('celebrate');
const { handlerErrors } = require('./middlewares/handlerErrors');

const { MONGODB_URL } = require('./utils/mongoConfig');

const { PORT = 3001 } = process.env;

const app = express();

app.use(express.json());
app.use(cookieParser());

mongoose.connect(MONGODB_URL);

const allowedCors = [
    'http://localhost:3000'
  ];
  
  app.use((req, res, next) => {
    const { origin } = req.headers;
    const { method } = req;
    const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
    const requestHeaders = req.headers['access-control-request-headers'];
    if (allowedCors.includes(origin)) {
      res.header('Access-Control-Allow-Origin', origin);
      res.header('Access-Control-Allow-Credentials', true);
    }
    if (method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
      res.header('Access-Control-Allow-Headers', requestHeaders);
      return res.end();
    }
    return next();
  });

app.use(routes);

// app.use(errors());
app.use(handlerErrors);

app.listen(PORT, () => {
});