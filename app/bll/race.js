'use strict'

const raceRepository = require('../repository/race');

const _ = require('lodash');

exports.create = function* (race) {
  const newRace = yield raceRepository.create(race);
  return newRace;
};

exports.getTrackIdsWeatherCount = function* (weather) {
  let trackIdsWeatherCount = yield raceRepository.getTrackIdsWeatherCount(weather);
  trackIdsWeatherCount = _.sortBy(trackIdsWeatherCount, item => item.weatherCount);
  trackIdsWeatherCount = trackIdsWeatherCount.reverse();

  return trackIdsWeatherCount;
};
