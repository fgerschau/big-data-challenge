'use strict'

const raceRepository = require('../repository/race');

const _ = require('lodash');

exports.create = function* (race) {
  const newRace = yield raceRepository.create(race);
  return newRace;
};

exports.getTrackIdsWeatherCount = function* (weather, options) {
  let trackIdsWeatherCount = yield raceRepository.getTrackIdsWeatherCount(weather, options);
  trackIdsWeatherCount = _.sortBy(trackIdsWeatherCount, item => item.weatherCount);
  trackIdsWeatherCount = trackIdsWeatherCount.reverse();

  return trackIdsWeatherCount;
};

exports.deleteAll = function* () {
  yield raceRepository.deleteAll();
};

exports.getTopTenRacers = function * () {
  const topTenRacers = yield raceRepository.getTopTenRacers();
  return topTenRacers;
};

exports.countRacesPerMonth = function* () {
  const racesPerMonth = yield raceRepository.countRacesPerMonth();
  return racesPerMonth;
};

exports.getTopTenTotalMoneyRacers = function* () {
  const topTen = yield raceRepository.getTopTenTotalMoneyRacers();
  return topTen;
};

exports.getTracksWithMostRacesDriven = function* () {
  const tracks = yield raceRepository.getTracksWithMostRacesDriven();
  return tracks;
};
