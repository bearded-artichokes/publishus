import request from 'supertest';
import chai from 'chai';
import session from 'supertest-session';
import { app } from '../src/server/server';

var expect = chai.expect;

describe('Bill Collection Tests', function() {
  var agent = request.agent(app);
  var testSession;

  beforeEach(function() {
    testSession = session(app);
  });

  xdescribe('Post', function() {
    it('should respond to users with 201 status code', function(done) {
      agent
        .post('/bills')
        .send({userID: '58896f88d975771793e866bb', total: 39.10, people: [], info: ''})
        .end(function(err, res) {
          expect(res.statusCode).to.equal(201);
          expect(res.text).to.equal('Bill saved');
          done();
        });
    });
  });
  xdescribe('Get Own Bills', function() {
    it('should respond to users with an array of their bills', function(done) {
      agent
        .get('/bills')
        .send({userID: '58896f88d975771793e866bb'})
        .end(function(err, res) {
          done();
        });
    });
  });
});


/**********************************


var NodeGit = require("nodegit");
// the path to the git repo I want to make/use
var pathToRepo = require("path").resolve("src/repos");

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







xdescribe('Authentication Test', function() {
  var agent = request.agent(app);
  var testSession;

  beforeEach(function() {
    testSession = session(app);
  });

  describe('Login', function() {
    it('testSession should sign in', function(done) {
      testSession.post('/auth/login')
        .send({ username: 'tom', password: 'tom' })
        .expect(302)
        .end(done);
    });

    it('returns a status code of 302 for redirect', function(done) {
      agent
        .post('/auth/login')
        .send({ username: 'tom', password: 'tom' })
        .end(function(err, res) {
          expect(res.statusCode).to.equal(302);
          expect(res.headers['set-cookie']).to.not.equal([]);
          expect(res.headers['set-cookie']).to.not.equal(undefined);
          done();
        });
    });
    
    it('get request to login returns a status code of 404', function(done) {
      agent
        .get('/auth/login')
        .end(function(err, res) {
          expect(res.statusCode).to.deep.equal(404);
          done();
        });
    });
  });

  describe('Logout', function() {
    var authenticatedSession;

    beforeEach(function(done) {
      testSession.post('/auth/login')
        .send({ username: 'tom', password: 'tom' })
        .expect(302)
        .end(function(err) {
          if (err) return done(err);

          authenticatedSession = testSession;
          return done();
        });
    });
    

    it('destroys the session on logout', function(done) {
      var sessionCookie = testSession.cookies.find(cookie => cookie.name === 'connect.sid');
      expect(sessionCookie).to.not.equal(undefined);
      expect(sessionCookie).to.not.equal(null);

      testSession.post('/auth/logout') 
        .send()
        .expect(302)
        .end(function(err) {
          sessionCookie = testSession.cookies.find(cookie => cookie.name === 'connect.sid');
          expect(sessionCookie).to.equal(undefined);
          done();
        });
    });
  });

  describe('Register', function() {
    it('should respond to existing users with 409 status code', function(done) {
      agent
        .post('/auth/register')
        .send({ username: 'gret', password: 'kjejje' })
        .end(function(err, res) {
          expect(res.statusCode).to.equal(409);
          expect(res.text).to.equal('user exists');
          done();
        });
    });
  });
});
