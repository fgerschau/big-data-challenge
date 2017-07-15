const logger = require('log4js').getLogger();

function handleError(err) {
  logger.error(err);
  throw new Error(err);
}

exports.handleError = handleError;
