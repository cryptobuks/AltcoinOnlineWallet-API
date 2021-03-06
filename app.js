

var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var routes = require('./routes/index');

var app = express();

var config = require("./config.json");


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(session({secret: config.sessioncode, cookie: { maxAge: 60000000 }}));
app.use(function(req, res, next) {
    
    res.emsg = function(msg){
        res.json({status:1, msg: msg});
    };

    res.smsg = function(msg){
        res.json({status:0, msg: msg});
    };

    next();
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());
app.use(function(req, res, next){
    // res.locals.token = req.csrfToken();
    res.locals.user = req.session.user;
    if(config.session.indexOf(req.path) > -1) {
        return req.session.user ? next() : res.redirect("/signin");
    }

    next();
});
app.use('/', routes);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('global/error', {
            message: err.message,
            error: err
        });
    });
}

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('global/error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 1337);

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});

