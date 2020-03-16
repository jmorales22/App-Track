const express = require('express'),
    session = require('express-session'),
    FileStore = require('session-file-store')(session),
    path = require('path'), 
    cookieParser = require('cookie-parser'),
    logger = require('morgan'),
    es6Renderer = require('express-es6-template-engine');

const indexRouter = require('./routes/index'),
    signupRouter = require('./routes/user'),
    reviewRouter = require('./routes/review'),
    mainRouter = require('./routes/main'),
    app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public', express.static('public'));
app.use(session({
    secret: 'get rad',
    resave: false,
    saveUninitialized: true,
    is_logged_in: false
    })
);

app.engine('html', es6Renderer);
app.set('views', './views');
app.set('view engine', 'html');

app.use('/', indexRouter);
app.use('/users', signupRouter);
app.use('/review', reviewRouter);
app.use('/main', mainRouter);


module.exports = app;