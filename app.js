const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const FileStore = require('session-file-store')(session);
require('dotenv').config()
const adminRouter = require('./routes/admin');
const storeFrontRouter = require('./routes/storefront');
const MiddlewareServiceProvider = require('./app/http/providers/MiddlewareServiceProvider');
const ValidationError = require('./app/exceptions/ValidationError');
const app = express();

const FileStoreConfig = {
    path: path.join(__dirname, '/storage/sessions'),
}

app.use(session({
    store: new FileStore(FileStoreConfig),
    secret: process.env.SECRET,
    cookie: {maxAge: 10800000},
    resave: true,
    saveUninitialized: true
}))

new MiddlewareServiceProvider(app).register();

// view engine setup
app.set('views', path.join(__dirname, 'resources/views'));
app.set('view engine', 'ejs');



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('node_modules/bootstrap/dist'));

app.use('/', storeFrontRouter);
app.use('/admin', adminRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    if (err instanceof ValidationError) {
        return err.render(req, res);
    }
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
