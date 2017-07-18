'use strict'

const raceBll = require('../app/bll/race');
const config = require('../config/config.json');
const db = require('../config/database');
const parseSerializedForecastArray = require('./helpers').parseSerializedForecastArray;

const co = require('co');
const bluebird = require('bluebird');
const fs = bluebird.promisifyAll(require('fs'));
const log4js = require('log4js');
const logger = log4js.getLogger('SCRIPT');
const path = require('path');
const csvtojson = bluebird.promisifyAll(require('csvtojson'));

function handleError(err) {
  if (err) {
    logger.error(err);
    process.exit(0);
  }
}

function* getFilePath() {
  logger.info('Obtaining file path');
  const filesDir = path.join(__dirname, '../tmp/');
  const filePath = yield fs.readdirAsync(filesDir).then(files => path.join(filesDir, files[0]));
  logger.info(`done! -> File path ${filePath}`);
  return filePath;
}

function checkDate(date) {
  date = new Date(date);
  return date.getTime() ? date : null;
}

function parseAndCheckNumber(num, type) {
  num = type === 'float' ? parseFloat(num, 10) : parseInt(num, 10);
  return isNaN(num) ? null : num;
}

function mapRace(race) {
  return {
    created: race.race_created ? checkDate(race.race_created) : null,
    driven: race.race_driven ? checkDate(race.race_driven) : null,
    trackId: race.track_id ? parseAndCheckNumber(race.track_id) : null,
    challengerId: race.challenger ? parseAndCheckNumber(race.challenger) : null,
    opponentId: race.opponent ? parseAndCheckNumber(race.opponent) : null,
    money: race.money ? parseAndCheckNumber(race.money, 'float') : 0,
    fuelConsumption: race.fuel_consumption ? parseAndCheckNumber(race.fuel_consumption, 'float') : null,
    winnerId: race.winner ? parseAndCheckNumber(race.winner) : null,
    status: race.status,
    forecast: parseSerializedForecastArray(race.forecast),
    weather: race.weather,
  };
}

function processCSV(filePath) {
  let i = 0;
  const converterOptions = {
    delimiter: ';',
  };

  return new Promise((resolve, reject) => {
    const data = [];

    csvtojson(converterOptions)
      .fromFile(filePath)
      .on('json', (json) => {
        ++i;
        if (i % 500 === 0) {
          logger.info(`${i} lines read`);
        }
        const race = mapRace(json);
        data.push(race);
      })
      .on('done', (err) => {
        logger.info(`${i} lines read`);
        if (err) {
          reject(err);
        }

        resolve(data);
      });
  });
}

function main() {
  co(function* () {
    logger.info('#### Loading CSV race file ####');

    const filePath = yield getFilePath();

    logger.info('Processing CSV');
    const raceData = yield processCSV(filePath);
    logger.info('Done!');

    logger.info('Inserting racedata into database');
    logger.info('  Connecting to database');
    db.connect(config);
    logger.info('  Done!');

    const dataLength = raceData.length;
    logger.info(`## Inserting ${dataLength} races into database ##`);
    for (let i = 0; i < dataLength; i++) {
      if (i % 500 === 0) {
        logger.info(`Progress: ${i}/${dataLength}`);
      }

      const race = raceData[i];
      yield raceBll.create(race);
    }

    logger.info('Done!');

    process.exit(0);
  }).catch(handleError);
}

module.exports = main();
