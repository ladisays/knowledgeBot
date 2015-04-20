var users = require('./users.routes');
var questions = require('./questions.routes');
var answers = require('./answers.routes.js');
var experts = require('./experts.routes.js');


module.exports = function(app, config) {
  users(app, config);
  questions(app, config);
  answers(app, config);
  experts(app, config);
};
