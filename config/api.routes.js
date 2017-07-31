module.exports = function (app) {
  const raceController = require('../app/controller/race');
  app.post('/api/race', raceController.create);
  app.get('/api/race/tracks/weather-count/:weather', raceController.getTrackIdsWeatherCount);
  app.get('/api/race/racers/top-ten', raceController.getTopTenRacers);
  app.get('/api/race/count-per-month', raceController.countRacesPerMonth);
  app.get('/api/race/top-ten-earning-racers', raceController.getTopTenTotalMoneyRacers);
  app.get('/api/race/tracks/top-ten-races-count', raceController.getTracksWithMostRacesDriven);
};
