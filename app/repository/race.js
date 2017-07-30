'use strict'

const raceModel = require('../dto/race');

exports.create = function* (race) {
  return yield raceModel.create(race);
};

exports.getTrackIdsWeatherCount = function* (weather) {
  return yield raceModel.aggregate([
    {
      $match: {
        weather,
      },
    }, {
      $group: {
        _id: '$trackId',
        weatherCount: {
          $sum: 1,
        },
      },
    }, {
      $project: {
        trackId: '$_id',
        weatherCount: 1,
      },
    },
  ]);
};

exports.deleteAll = function* () {
  yield raceModel.remove({});
};
