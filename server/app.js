'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');

const usersRouter = require('./routes/users');

const app = express();

app.use(logger('dev'));

//Enable CORS
app.use(
  cors({
    credentials: true,
    origin: (origin, callback) => {
      if (!origin || [ 'http://localhost:4200', 'http://localhost:3000' ].includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed to send request from origin.'));
      }
    }
  })
);

//Parse application/json
app.use(
  bodyParser.json({
    limit: '10mb'
  })
);

//Parse application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    limit: '10mb',
    extended: true
  })
);

app.use('/users', usersRouter);

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), '0.0.0.0', () => {
  console.log(new Date() + `Listening on port ${app.get('port')}`);
});
