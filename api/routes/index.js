var answers = require('./answers.routes.js');

module.exports = function(app, config) {
  answers(app, config);

  app.post('/answers',function(req, res){
    console.log("mehn");
     // res.sendFile("index.html",{root:'./public'});
  });
};
