var Firebase = require('firebase'),
needle = require('needle');
_ = require('lodash');

module.exports = function(app, config) {
  var root = new Firebase(config.firebase.rootRefUrl);
  app.route('/users/register').post(function (req, res) {
    var user = req.body;

    root.child('users').child(user.slack).once('value', function (snap) {
      if(snap.val()) {
        return res.json({error: 'User already exists!'});
      }
      else {
        root.child('users').child(user.slack).set(user, function (err) {
          if (!err) {
            return res.json({response: 'User has been registered successfully - ' + user});
          };
        });
      }
    });
  });

  app.route('/users/skills').post(function (req, res) {
    var data = req.body;
    root.child('users').orderByChild('username')
    .startAt(data.slack).endAt(data.slack)
    .on('value', function (snap) {
      if(snap.val()) {
        console.log(data);
        var user = snap.val();
        var id = (_.keys(user))[0];
        var skills = data.skills;
        if(user[id].skills) {
          skills = _.union(user[id].skills, skills);
        }
        root.child('users').child(id).child('skills').set(skills, function (err) {
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
