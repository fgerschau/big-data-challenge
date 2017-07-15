const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const logger = require('log4js').getLogger();

exports.connect = function (config) {
  const connectionOptions = {
    useMongoClient: true,
  };

  mongoose.connect(config.db, connectionOptions);
  const db = mongoose.connection;
  db.on('error', (err) => {
    logger.error(err);
    throw new Error(`Unable to connect to database at ${config.db}: ${err}`);
  });

  db.once('open', () => {
    logger.info(`Successfully connected to database at ${config.db}!`);
  });

  mongoose.set('debug', false);
};
