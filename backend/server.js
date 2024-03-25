const express = require('express');
const compression = require('compression')
const helmet = require('helmet');
const cors = require('cors');
const app = express();
app.use(compression())
app.use(helmet());
app.use(cors());

const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const http = require('http');

// Models
require('./server/model/station');
require('./server/model/value');

// DB connection
require('./server/config/connection');

// Routes
const stationsRouter = require('./server/routes/stations');
const valuesRouter = require('./server/routes/values');

// View Engine
app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/stations', stationsRouter);
app.use('/values', valuesRouter);
//app.use('/api/stations', stationsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

// Create HTTP server
http.createServer(app).listen(3001);
module.exports = app;
