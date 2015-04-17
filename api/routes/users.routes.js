var users = require('../controllers/users.controllers');


module.exports = function(app, config) {

  app.route('/users').get(users.all);
  //     .post(users.create);

  // app.route('/verticals/:id')
  //     .get(users.getOne)
  //     .put(users.update)
  //     .delete(users.delete);

  // app.param('id', users.verticalById);
};