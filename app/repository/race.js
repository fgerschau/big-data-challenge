'use strict'

const raceModel = require('../dto/race');

exports.create = function* (race) {
  return yield raceModel.create(race);
};
