const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet')

/* Import the routers */
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/sms');

const app = express();

/* Use the helmet library for Basic Auth handling (will do HMAC as well) */
app.use(helmet());

/* Pug (response layouts) set up */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/* Set up logging and other resources */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* Use the defined routes */
app.use('/', indexRouter);
app.use('/sms', usersRouter);

/* catch 404 and forward to error handler */
app.use((req, res, next) => {
  next(createError(404));
});

/* Define the error handler */
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error', { title: 'API error', error: 'HTTP status ' + err.status, other: 'This endpoint does not exist - please check URL' });
  console.log(req.url)
  res.status(err.status).send({"result" : "Fail", "reason":"End point " + req.url + " does not exist"});
});

/* Have the router listen on port 8080 */
app.listen(8080, '0.0.0.0');

/* Export the application */
module.exports = app;
