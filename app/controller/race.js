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
