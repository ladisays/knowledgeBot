var Firebase = require('firebase');


module.exports = function(app, config) {
  var questions = new Firebase(config.firebase.rootRefUrl + 'questions');

  app.route('/questions').post(function(req, res) {
    //parse data from bot
    var question = req.body;
    // put on req
    req.question = question;
    questions.push(question, function(error) {
      if (error !== null) {
        throw new Error('An error occured');
      }
      //check if question/similar question

      // call solomon controller func from solomon
      return res.json({ok: 'ok'});
    });
  });

  app.route('/questions').delete(function(req, res) {
    var question = req.body;
    questions.push(question);
  });
};
