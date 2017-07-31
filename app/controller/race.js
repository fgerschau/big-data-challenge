'use strict'

const raceBll = require('../bll/race');
const handleError = require('./util').handleError;

const co = require('co');

exports.create = function (req, res) {
  co(function* () {
    const race = req.body;
    yield raceBll.create(race);
    res.send(race);
  }).catch(handleError);
};

exports.getTrackIdsWeatherCount = function (req, res) {
  co(function* () {
    const weather = req.params.weather;
    const options = req.query.options || {};

    const trackIdsWeatherCount = yield raceBll.getTrackIdsWeatherCount(weather, options);
    res.send(trackIdsWeatherCount);
  }).catch(handleError);
};

exports.getTopTenRacers = function (req, res) {
  co(function* () {
    const topTenRacers = yield raceBll.getTopTenRacers();
    res.send(topTenRacers);
  }).catch(handleError);
};
