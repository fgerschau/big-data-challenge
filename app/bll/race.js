'use strict'

const raceRepository = require('../repository/race');

exports.create = function* (race) {
  const newRace = yield raceRepository.create(race);
  return newRace;
};
