'use strict'

const raceModel = require('../dto/race');

exports.create = function* (race) {
  return yield raceModel.create(race);
};

exports.getTrackIdsWeatherCount = function* (weather, options) {
  const query = [
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
  ];

  if (options.sort) {
    const sort = {
      $sort: {
        weatherCount: -1,
      },
    };

    query.push(sort);
  }

  return yield raceModel.aggregate(query);
};

exports.deleteAll = function* () {
  yield raceModel.remove({});
};

exports.getTopTenRacers = function* () {
  return yield raceModel.aggregate([
    {
      $group: {
        _id: '$winnerId',
        racesWon: {
          $sum: 1,
        },
      },
    }, {
      $project: {
        racesWon: 1,
        winnerId: 1,
      },
    }, {
      $sort: {
        racesWon: -1,
      },
    }, {
      $skip: 1,
    }, {
      $limit: 10,
    },
  ]);
};

exports.countRacesPerMonth = function* () {
  const query = [
    {
      $match: {
        driven: {
          $ne: null,
        },
      },
    }, {
      $group: {
        _id: {
          $month: '$driven',
        },
        races: {
          $sum: 1,
        },
      },
    },
  ];

  return yield raceModel.aggregate(query);
};

exports.getTopTenTotalMoneyRacers = function* () {
  const query = [
    {
      $group: {
        _id: '$winnerId',
        totalMoneyWon: {
          $sum: '$money',
        },
      },
    }, {
      $sort: {
        totalMoneyWon: -1,
      },
    }, {
      $skip: 1,
    }, {
      $limit: 10,
    },
  ];

  return yield raceModel.aggregate(query);
};
