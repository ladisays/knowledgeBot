var Firebase = require('firebase');
var async = require('async');
var _ = require('lodash');

module.exports = function(app, config) {
  var root = new Firebase(config.firebase.rootRefUrl);

  app.route('/questions').post(function(req, res) {
    //parse data from bot
    var parseQue = function(callback) {
      var data = JSON.parse(req.body);
      var question = {};
      question.body = data.body;
      question.tags = data.tags;
      question.userId = data.id;
      callback(null, question);
      console.log(question);
    };

    var checkDupQues = function(question, callback) {
      root.child('questions')
        .once('value', function(snap) {
          if (snap.val()) {
            var ques = _.toArray(snap.val());
            if (question.length < 10) {
              return callback(new Error('Invalid Question'));
            }
            console.log(question);
            var regexp = new RegExp(question.body.substr(0, 10), 'i');
            var match = _.find(ques, function(que) {
              return regexp.test(que.body);
            });
            if (typeof match === 'object') {
              return callback('Question exists');
            } else {
              callback(null, question);
            }
          }
        }, function(error) {
          callback(error);
        });
    };

    var saveQue = function(question, callback) {
      root.child('questions').push(question, function(error) {
        if (error) {
          return callback(error);
        }
        callback(null, question);
      });
    };
    var getLatestQue = function(status, callback) {
      root.child('questions').limitToLast(1).once('child_added', function(snapshot) {
        callback(null, snapshot.val());
      });
    };

    async.waterfall([
      parseQue,
      checkDupQues,
      saveQue,
      getLatestQue
    ], function(err, newQue) {
      if (err) {
        return res.send(500, {
          error: err
        });
      }
      res.json({
        status: 200,
        data: newQue
      });
    });
  });

  app.route('/questions').delete(function(req, res) {
    // var question = req.body;
    // questions.push(question);
  });
};
