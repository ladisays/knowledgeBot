var Firebase = require('firebase'),
    needle = require('needle'),
    _ = require('lodash');

module.exports = function(app, config) {
    var root = new Firebase(config.firebase.rootRefUrl);

    app.route('/experts').get(function(req, res) {
        root.child('users').on('value', function(snap) {
            var data = snap.val(),
                skills = {},
                match = [];

            // Waiting to get tags from Seun Martins to help in filtering experts
            var tagsFromQuestion = ['Javascript', 'CSS', 'PHP', 'Java', 'Scala'];

            for (var i in data) {
                if (data.hasOwnProperty(i)) {
                    var tagsMatchSkill = _.intersection(data[i].skills, tagsFromQuestion);
                    if (tagsMatchSkill.length > 0) {
                        res.json({
                            matches: data[i].slack
                        });
                    }
                }
            }

        });
    });
};
