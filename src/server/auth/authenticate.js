var bcryptOriginal = require('bcrypt');
var Promise = require('bluebird');

var User = require('../../db/schema.js').User;

var bcrypt = Promise.promisifyAll(bcryptOriginal);

exports.auth = function (req, res, next) {
  !req.isAuthenticated() ? req.send(401) : next();
}

exports.login = function (req, res, next) {
  //console.log ('REQ.SESSION FROM LOGIN', req.session);
  //console.log('REQ.SESSION.USERNAME');
  //console.log('req.user.username  ', req.user.username);
  console.log('USERNAME from login  ', req.user.username);
  req.session.username = req.user.username;
  //console.log('REQ.SESSION.USERNAME:  ', res.session.username)
  // res.redirect('/');
  res.send({ status: 'successful' });
}

exports.register = function (req, res, next) {
  //console.log('REQ from REGISTER', req.body);
  var username = req.body.username;
  var password = req.body.password;
  var email = req.body.email;

  User.findOne({ where: {username: username} })
    .then(function(err, user) {
      if (!user) {
        return bcrypt.genSaltAsync()
          .then(function(salt) {
            return bcrypt.hashAsync(password, salt);
          }).then(function(hashedPassword) {
            User.build({ 
              username: username,
              password: hashedPassword,
              email: email
            })
            .save()
            .then(function(user) {
              next();
            })
            .catch(function(err) {
              res.status(400).end();
            });
          });
        } else {
          res.status(409).end('user exists');
        }
    })
}


exports.logout = function (req, res, next) {
  req.session.destroy(function(err) {
    res.clearCookie('connect.sid');
    res.end('Logged out');
    // res.redirect('/auth/login');
  });
  
  
}
