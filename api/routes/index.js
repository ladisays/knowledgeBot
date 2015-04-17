var users = require('./users.routes');

module.exports = function(app, config) {
  users(app, config);

  app.get('/*',function(req, res){
    res.sendFile("index.html",{root:'./public'});
  });
};