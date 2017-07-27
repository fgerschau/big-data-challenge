module.exports = function (app) {
  const raceController = require('../app/controller/race');
  app.post('/api/race', raceController.create);
};
