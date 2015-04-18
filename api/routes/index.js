var users = require('./users.routes');
var experts = require('./experts.routes');
var questions = require('./questions.routes');
var answers = require('./answers.routes.js');

module.exports = function(app, config) {
  users(app, config);
  questions(app, config);
  experts(app, config);
  answers(app, config);
};
