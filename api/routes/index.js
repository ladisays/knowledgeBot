var users = require('./users.routes');
var experts = require('./experts.routes');

module.exports = function(app, config) {
  users(app, config);
  experts(app, config);
};