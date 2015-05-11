var Firebase = require('firebase'),
needle = require('needle');
_ = require('lodash');

module.exports = function(app, config) {
  var root = new Firebase(config.firebase.rootRefUrl);
  app.route('/users/register').post(function(req, res) {
    var data = req.body;
    data.skills = true;
    root.child('users').orderByChild('slack')
    .startAt(data.slack).endAt(data.slack)
    .on('value', function(snap) {
      if(snap.val()) {
        res.json({error: 'This user already exists'});
      } else {
        root.child('users').push(data, function(err) {
          if(!err) {
            res.json({response: 'Successfully saved your data'});
          }
        });
      }
    });
  });

  app.route('/users/skills').post(function(req, res) {
    var data = req.body;
    root.child('users').orderByChild('username')
    .startAt(data.slack).endAt(data.slack)
    .on('value', function(snap) {
      if(snap.val()) {
        console.log(data);
        var user = snap.val();
        var id = (_.keys(user))[0];
        var skills = data.skills;
        if(user[id].skills) {
          skills = _.union(user[id].skills, skills);
        }
        root.child('users').child(id).child('skills').set(skills, function(err) {
          if(!err) {
            res.json({response: 'Successfully updated you skills'});
          }
        });
      } else {
        res.json({error: 'This user does not exists'});
      }
    });
  });
};
