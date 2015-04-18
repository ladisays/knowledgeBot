var Firebase = require('firebase');

module.exports = function(app, config) {
  app.route('/answers').post(function(req, res) {
    var root = new Firebase(config.firebase.rootRefUrl);
    var answer = {};
    var answer.yoda = {};
    answer.question = req.body.question_id.toString();
    answer.content = req.body.content;
    answer.yoda.name    = req.body.name;
    answer.yoda.id      = req.body.id;
    answer.yoda.email   = req.body.email_address;
    answer.created_at = Firebase.ServerValue.TIMESTAMP;
    root.child('questions').child(answer.question).child('answers').push(answer);
    res.json ( answer );
  });
};
