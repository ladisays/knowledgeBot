var Firebase = require('firebase');

module.exports = function(app, config) {
  app.route('/answers').post(function(req, res) {
    var root = new Firebase(config.firebase.rootRefUrl);
    var answer = {};
    answer.question = req.body.question_id.toString();
    answer.content = req.body.content;
    answer.yoda_name    = req.body.name;
    answer.yoda_id      = req.body.id;
    answer.yoda_email   = req.body.email_address;
    answer.created_at = Firebase.ServerValue.TIMESTAMP;
    root.child('questions').child(answer.question).child('answers').push(answer);
    res.json ( answer );
  });
};
