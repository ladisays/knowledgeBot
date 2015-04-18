var Firebase 	= require('firebase'),
	needle 		= require('needle'),
	_ 			= require('lodash');

module.exports = function(app, config) {
  var root = new Firebase(config.firebase.rootRefUrl);

  app.route('/experts').get(function(req, res) {
  	root.child('users').on('value', function(snap) {
  		console.log('data: ', snap.val());
  		res.json({experts: snap.val()});
  	});
  });
};