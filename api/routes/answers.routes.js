var Firebase = require('firebase');

module.exports = function(app, config) {
  app.route('/answers').post(function(req, res) {
    var root = new Firebase(config.firebase.rootRefUrl);
//    req.body = "what is the name of the first pilot"
    var answer = {};
    answer.question = req.body.question_id.toString();
    answer.content = req.body.content;
    answer.yoda    = req.body.user;
    answer.created_at = Firebase.ServerValue.TIMESTAMP;
    root.child('answers').push(answer);
    root.child('questions').child(answer.question).child('answers').push(answer);
    // res.body = req.body;
    res.json ( answer );
  });
};
