var Firebase = require('firebase'),
needle = require('needle');
_ = require('lodash');

module.exports = function(app, config) {
  var root = new Firebase(config.firebase.rootRefUrl);
  app.route('/users/register').post(function(req, res) {
    var base = 'https://api.github.com';
    // Get data from the request body
    var data = req.body;
    data.skills = true;
    // Ensure user does not exist in the firebase
    root.child('users').orderByChild('username')
    .startAt(data.slack).endAt(data.slack)
    .on('value', function(snap) {
      if(snap.val()) {
        res.json({'error': 'This user already exists'});
        var user = snap.val();
        if(user.github === data.github) {
          res.json({'error': 'You have already signed up'});
        }
      } else {
        root.child('users').push(data, function(err) {
          if(!err) {
            res.json({response: 'Successfully saved your data'});
          }
        });
      }
    });
    // needle.get(base + '/users/' + data.github + '/repos', function(error, response) {
    //   console.log(base + '/users/' + data.github + '/repos');
    //   var valid = [];
    //   if (!error && response.statusCode == 200) {
    //     var repos = response.body;
    //     console.log(repos);
    //     _.forEach(repos, function(repo) {
    //       if(!repo.private && !repo.fork) {
    //         console.log(repo.name);
    //         valid.push(repo.name);
    //       }
    //     });
    //     var languages = [];
    //     _.forEach(valid, function(rep) {
    //       needle.get(base + '/repos/' + data.github + '/' + rep + '/languages', function(error, lang) {
    //         if (!error && lang.statusCode == 200) {
    //           languages = _.union(languages, _.keys(lang.body));
    //         }
    //       });
    //     });
    //   }
    // });
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
        res.json({'error': 'This user does not exists'});
      }
    });
  });
};