var express = require('express');
var parser = require('body-parser');
var mysql = require('mysql');
var passport = require('passport');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var path = require('path');

var schema = require('../db/schema.js')
var authRouter = require('./routers/authRouter.js');
var docRouter = require('./routers/docRouter.js');

var port = process.env.PORT || 3000;

var app = express();


//=================== Middleware ===================
//==================================================
// serve static client-facing files
app.use(express.static(path.resolve(__dirname, '../public')));

//parse requests
app.use(parser.json());
app.use(parser.urlencoded({
  extended: true
}));

// read cookies (needed for auth)
app.use(cookieParser()); 
// required for passport
app.use(session({
  secret: 'kenny',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
require('./auth/passport.js')(passport);

//================== set up routes ==================

// process input routes from the client
app.use('/api/auth', authRouter);
app.use('/api/doc', docRouter);

//===wildcard route=====
// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.use('*', function (request, response){
  response.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'))
})


//====================================================
//====================================================



// spin up server
app.listen(port, function() {
  console.log('Listening on port ', port);
});

// export app
module.exports = app;
