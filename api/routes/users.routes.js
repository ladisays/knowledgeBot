var Firebase = require('firebase');
var users = require('../controllers/users.controllers');

module.exports = function(app, config) {
  app.route('/users/register').post(function(req, res) {
    var root = new Firebase(config.firebase.rootRefUrl);
    console.log(root);
  });
};