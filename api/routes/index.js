var users = require('./users.routes');
var experts = require('./experts.routes');
var questions = require('./questions.routes');

module.exports = function(app, config) {
  users(app, config);
  questions(app, config);
  // experts(app, config);
};

