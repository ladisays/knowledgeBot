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

  app.route('/users/:uid/skills/:action')
  .post(function (req, res) {
    var uid = req.params.uid;
    var i, action = req.params.action;
    var updatedSkills = [], skills = req.body.skills;

    root.child('users').child(uid).once('value', function(snap) {
      if (!snap.val()) {
        return res.status(404).send('User not found!');
      }

      var user = snap.val();
      if (user.skills) {
        if (action === 'add') {
          skills = _.union(user.skills, skills);
        }
        if (action === 'remove') {
          skills = _.difference(user.skills, skills);
        }
      }

      root.child('users').child(uid).child('skills').set(skills, function (err) {
        if (!err) {
          res.json({response: 'Successfully updated skills', skills: skills});
        }
        else {
          res.json({error: 'Could not update skills'});
        }
      });
    });
  });
};
