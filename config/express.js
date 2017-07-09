'use strict';

const compression = require('compression');
const favicon = require('serve-favicon');
const serveStatic = require('serve-static');
const bodyParser = require('body-parser');
const log4js = require('log4js');

const logger = log4js.getLogger('access');
const config = require('./config.json');


module.exports = (app) => {
  app.set('port', config.port);

  app.set('views', `${config.root}/app/views`);
  app.set('view engine', 'pug');

  app.use(compression());
  app.use(serveStatic(`${config.root}/public`));
  app.use(favicon(`${config.root}/public/images/favicon.png`));

  app.use(log4js.connectLogger(logger, { level: 'auto', format: ':method :url :status - :response-time ms' }));

  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
};
