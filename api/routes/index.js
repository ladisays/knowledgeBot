var users = require('./users.routes');
var questions = require('./questions.routes');
var answers = require('./answers.routes.js');

module.exports = function(app, config) {
  users(app, config);
  questions(app, config);
  answers(app, config);
  app.route('/').get(function (req, res) {
  	res.send('I am alive');
  });
};
