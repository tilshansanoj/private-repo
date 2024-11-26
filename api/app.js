var express = require('express');
var app = express();
var uuid = require('node-uuid');

const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DB,
});


app.get('/api/status', function (req, res) {
  pool.connect((err, client, done) => {
    if (err) {
      console.error('error fetching client from pool', err);
      return;
    }
    client.query('SELECT now() as time', [], function (err, result) {
      //call `done()` to release the client back to the pool
      done();


      if (err) {
        console.error('error running query', err);
        return;
      }
      return res.json({
        request_uuid: uuid.v4(),
        time: result.rows[0].time

      });
    });
  });
});

  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handlers

  // development error handler
  // will print stacktrace
  if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      res.json({
        message: err.message,
        error: err
      });
    });
  }

  // production error handler
  // no stacktraces leaked to user
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: {}
    });
  });


  module.exports = app;
