module.exports = function (app) {
  const raceController = require('../app/controller/race');
  app.post('/race', raceController.create);
};
