var express = require('express');
var parser = require('body-parser');
var mysql = require('mysql');

var path = require('path');
var schema = require('../db/schema.js')

var app = express();

// middleware - parse JSON
app.use(parser.json());

// serve static client-facing files
app.use(express.static(path.resolve(__dirname, '../public')));

// spin up server

// ---------------------------------------------------------------------------

var NodeGit = require("nodegit");
// the path to the git repo I want to make/use
var pathToRepo = require("path").resolve("src/repos");

// // Create a new git repo
// var isBare = 0; // lets create a .git subfolder
// NodeGit.Repository.init(pathToRepo, isBare).then(function (repo) {
  
// });


// I manually added a 'testFile.txt' file to the repo.
// The following code adds the file to the index and commits the change

// the following code adapted from:
// https://github.com/nodegit/nodegit/blob/master/examples/add-and-commit.js
// and
// http://stackoverflow.com/questions/23870374/nodegit-how-to-modify-a-file-and-push-the-changes

var repo, index, oid;
NodeGit.Repository.open(pathToRepo).then(function (repoResult) {
  // Inside of this function we have an open repo
  repo = repoResult;
  return repo.index();
  })
  .then(function(indexResult) {
    index = indexResult;
  })
  .then(function() {
    // this file is in the root of the directory and doesn't need a full path
    return index.addByPath('testFile.txt');
  })
  .then(function() {
    return index.write();
  })
  .then(function() {
    return index.writeTree();
  })
  .then(function(oidResult) {
    oid = oidResult;
    return NodeGit.Reference.nameToId(repo, "HEAD");
  })
  .then(function(head) {
    return repo.getCommit(head);
  })
  .then(function(parent) {
    return repo.createCommit("HEAD", NodeGit.Signature.now('Simon','simon@gmail.com'), NodeGit.Signature.now('Simon','simon@gmail.com'), "message", oid, [parent]);
  })
  .done(function(commitId) {
    console.log("New Commit: ", commitId);
  });

// ---------------------------------------------------------------------------

app.listen('3000', function() {
  console.log('Listening on port 3000');
});

// export app
module.exports = app;
