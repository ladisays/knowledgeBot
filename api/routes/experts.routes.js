'use strict';

var Firebase = require('firebase'),
    needle   = require('needle'),
   _         = require('lodash'),
   request   = require('request'),
   config    = require('../../config/config');

var root = new Firebase(config.development.firebase.rootRefUrl);

module.exports = function(tag, res, next) {
  root.child('users').on('value', function(snap) {
    var data      = snap.val(),
      skills      = {},
      expertMatch = {},
      tags        = [];

    tags.push(tag);

    for (var i in data) {
      if (data.hasOwnProperty(i)) {
        var tagsMatchSkill = _.intersection(data[i].skills, tags);
        if (tagsMatchSkill.length > 0) {
          expertMatch['user'] = data[i];
          send(expertMatch, function(error, status, body) {
            if (error) {
              return next(error);
            } else if (status !== 200) {
              // inform user that our Incoming WebHook failed
              return next(new Error('Incoming WebHook: ' + status + ' ' + body));
            } else {
              console.log('status: ', status);
              return ;
            }
          });
        }
      }
    }

  });
}

function send(expert, cb) {
  console.log('expert: ', expert);
  var uri = ' https://yodabot.herokuapp.com/experts';

  request({
    uri: uri,
    method: 'POST',
    json: expert
  }, function(error, response, body) {
    console.log('response: ', response.statusCode);
    console.log('body: ', body);
    if (error) {
      return cb(error);
    }

    cb(null, response.statusCode, body);
  });
}
