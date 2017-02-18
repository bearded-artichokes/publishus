var express = require('express');
var parser = require('body-parser');
var mysql = require('mysql');

/******** TEST CODE ***********/
var GitServer = require('git-server');

var newUser = {
    username:'demo',
    password:'demo'
}
var newRepo = {
    name:'asdf',
    anonRead:false,
    users: [
        { user:newUser, permissions:['R','W'] }
    ]
}
server = new GitServer([ newRepo ]);
// server.on('commit', function(update, repo) {
//     // do some logging or other stuff
//     update.accept() //accept the update.
// });
// server.on('post-update', function(update, repo) {
//     //do some deploy stuff
// });

/******** TEST CODE ***********/

var path = require('path');
var schema = require('../db/schema.js')

var app = express();

// middleware - parse JSON
app.use(parser.json());

// serve static client-facing files
app.use(express.static(path.resolve(__dirname, '../public')));

// spin up server
app.listen('3000', function() {
  console.log('Listening on port 3000');
});

// export app
module.exports = app;
