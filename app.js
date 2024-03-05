require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
const sessions = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var middleware = require('./app/http/controllers/middleware');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var categoryRouter = require('./routes/category');

var app = express();

app.use(
  sessions({
    secret: process.env.COOKIE_SECRET,
    cookie: { maxAge: 86400*1000 },
    resave: false,
    saveUninitialized: true
  })
)

app.use(middleware.adminCheck)

// view engine setup
app.set('views', path.join(__dirname, 'resources/views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('node_modules/bootstrap/dist'));

app.use('/', indexRouter);
app.use('/', require('./routes/category'));
app.use('/', require('./routes/admin'));
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
