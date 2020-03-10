const express = require('express'),
    session = require('express-session'),
    FileStore = require('session-file-store')(session),
    path = require('path'), 
    cookieParser = require('cookie-parser'),
    logger = require('morgan'),
    es6Renderer = require('express-es6-template-engine');

const indexRouter = require('./routes/index');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    store: new FileStore(),
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

module.exports = app;
