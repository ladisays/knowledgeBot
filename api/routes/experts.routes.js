var Firebase = require('firebase'),
    needle 	 = require('needle'),
    _ 		 = require('lodash')
    request  = require('request');

module.exports = function(app, config) {
    var root = new Firebase(config.firebase.rootRefUrl);

    app.route('/experts').get(function(req, res, next) {
        root.child('users').on('value', function(snap) {
            var data   = snap.val(),
                skills = {},
                expertMatch  = {};

            // Waiting to get tags from Seun Martins to help in filtering experts
            var tagsFromQuestion = ['Javascript', 'CSS', 'PHP', 'Java', 'Scala'];

            for (var i in data) {
                if (data.hasOwnProperty(i)) {
                    var tagsMatchSkill = _.intersection(data[i].skills, tagsFromQuestion);
                    if (tagsMatchSkill.length > 0) {
                        expertMatch['user'] = data[i];
                        send(expertMatch, function(error, status, body) {
                            if (error) {
                              return next(error);
                            } else if (status !== 200) {
                              // inform user that our Incoming WebHook failed
                              return next(new Error('Incoming WebHook: ' + status + ' ' + body));
                            } else {
                              return res.status(200).end();
                            }
                        });
                    }
                }
            }

        });
    });
};


function send (payload, cb) {
  console.log('payload: ', payload);
  var uri = ' https://yodabot.herokuapp.com/experts';
 
  request({
    uri: uri,
    method: 'POST',
    json: payload
  }, function (error, response, body) {
    console.log('response: ', response.statusCode);
    console.log('body: ', body);
    if (error) {
      return cb(error);
    }
 
    cb(null, response.statusCode, body);
  });
}

