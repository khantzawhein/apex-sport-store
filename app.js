const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const FileStore = require('session-file-store')(session);
require('dotenv').config();
const adminRouter = require('./routes/admin');
const storeFrontRouter = require('./routes/storefront');
const MiddlewareServiceProvider = require('./app/http/providers/MiddlewareServiceProvider');
const ValidationError = require('./app/exceptions/ValidationError');
const axios = require('axios');
const app = express();
global.__basedir = __dirname;

const FileStoreConfig = {
  path: path.join(__dirname, '/storage/sessions')
};

app.use(
  session({
    store: new FileStore(FileStoreConfig),
    secret: process.env.SECRET,
    cookie: { maxAge: 10800000 },
    resave: true,
    saveUninitialized: true
  })
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

new MiddlewareServiceProvider(app).register();

// view engine setup
app.set('views', path.join(__dirname, 'resources/views'));
app.set('view engine', 'ejs');

app.use('/', storeFrontRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(async function (err, req, res, next) {
  if (err instanceof ValidationError) {
    return err.render(req, res);
  }

  if (req.originalUrl.startsWith('/admin')) {
    return res.status(500).json({ message: err.message, err });
  }
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  const {
    data: { data }
  } = await axios.get(`https://api.giphy.com/v1/gifs/random?api_key=${process.env.GIPHY_KEY}&rating=3&tag=funny-dogs`);
  const gif = data.images.fixed_height.url;
  // render the error page
  res.status(err.status || 500);
  res.render('error', { gif, title: 'Error' });
});

module.exports = app;
