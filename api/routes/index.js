var users = require('./users.routes');
var questions = require('./questions.routes');

module.exports = function(app, config) {
  users(app, config);
  questions(app, config);

  app.get('/*',function(req, res){
    res.sendFile("index.html",{root:'./public'});
  });
};
