var Firebase = require('firebase');

module.exports = function(app, config) {
  app.route('/answers').post(function (req, res) {
    var root = new Firebase(config.firebase.rootRefUrl);
    var answer = req.body;
    console.log(answer);
    answer['created_at'] = Firebase.ServerValue.TIMESTAMP;

    root.child('questions').once('value', function (snap) {
      if (!snap.val()) {
        return 'There are no questions';
      }
      var qid, collection = snap.val();

      for (qid in collection) {
        if (qid.toString().substr(-8).toLowerCase() == answer.qid) {
          // console.log(qid, collection[qid]);
          root.child('questions').child(qid).child('answers').push(answer, function (err) {
            if (!err) {
              var updatedQue = collection[qid];
              updatedQue['answer'] = answer;
              console.log('\n');
              console.log(updatedQue);
              return res.json(updatedQue);
            }
            else {
              return res.json('Unable to add answer');
            }
          });
        }
      }
    });
  });
};
