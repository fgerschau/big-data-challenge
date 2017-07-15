'use strict'

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
    throw new Error();
  }
}

function* getFilePath() {
  logger.info('Obtaining file path');
  const filesDir = path.join(__dirname, '../tmp/');
  const filePath = yield fs.readdirAsync(filesDir).then(files => path.join(filesDir, files[0]));
  logger.info(`done! -> File path ${filePath}`);
  return filePath;
}

function processCSV(filePath) {
  let i = 0;
  const converterOptions = {
    delimiter: ';',
  };

  return new Promise((resolve, reject) => {
    csvtojson(converterOptions)
      .fromFile(filePath)
      .on('json', (json) => {
        ++i;
        if (i % 500 === 0) {
          logger.info(`${i} lines read`);
        }
      })
      .on('done', (err) => {
        if (err) {
          reject(err);
        }
        resolve();
      });
  });
}

function main() {
  co(function* () {
    logger.info('Loading CSV race file');

    const filePath = yield getFilePath();

    logger.info('Converting CSV to JSON');
    yield processCSV(filePath);
  }).catch(handleError);
}

module.exports = main();
