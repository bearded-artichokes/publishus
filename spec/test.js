import request from 'supertest';
import chai from 'chai';
import session from 'supertest-session';
import { app } from '../src/server/server';

var promisify = require("promisify-node");
var fse = promisify(require('fs-extra'));

fse.ensureDir = promisify(fse.ensureDir);



/*********************************************/
/////////////////////////
//  NODE GIT FUNCTIONS //
/////////////////////////


var NodeGit = require("nodegit");
// the path to the git repo I want to make/use
var pathToRepo = require("path").resolve("../repos");

var testRepos = '../repos/testRepo';


// // Create a new git repo
var isBare = 0; // lets create a .git subfolder
NodeGit.Repository.init(pathToRepo, isBare).then(function (repo) {
  repo.index().then(function(index) {

  })   
});

// I manually added a 'testFile.txt' file to the repo.
// The following code adds the file to the index and commits the change

// the following code adapted from:
// https://github.com/nodegit/nodegit/blob/master/examples/add-and-commit.js
// and
// http://stackoverflow.com/questions/23870374/nodegit-how-to-modify-a-file-and-push-the-changes


var expect = chai.expect;

describe('Creates a new repo', function() {
  beforeEach(function() {

  });

  afterEach(function() {

  });

  xdescribe('Repo exists', function() {
    it('should respond to users with 201 status code', function(done) {
      
      done();
    });
  });

});


/**********************************





// // Used when head is not estalbished (i.e. first commit)
// var repo, index, oid;
// NodeGit.Repository.open(pathToRepo).then(function (repoResult) {
//   // Inside of this function we have an open repo
//   repo = repoResult;
//   return repo.index();
//   })
//   .then(function(indexResult) {
//     index = indexResult;
//   })
//   .then(function() {
//     // this file is in the root of the directory and doesn't need a full path
//     return index.addByPath('testFile.txt');
//   })
//   .then(function() {
//     return index.write();
//   })
//   .then(function() {
//     return index.writeTree();
//   })
//   .then(function(oid) {
//     return repo.createCommit("HEAD", NodeGit.Signature.now('Simon','simon@gmail.com'), NodeGit.Signature.now('Simon','simon@gmail.com'), "message", oid, []);
//   })
//   .done(function(commitId) {
//     console.log("New Commit: ", commitId);
//   });

// Used for commits after head is already established
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
*******************************/



