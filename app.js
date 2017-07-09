'use strict'

const path = require('path');
const http = require('http');
const express = require('express');
const logger = require('log4js').getLogger();

const config = require('./config/config.json');
const db = require('./config/database');

config.root = path.join(__dirname);

db.connect(config);

const app = express();

require('./config/express')(app);
require('./config/api.routes')(app);
require('./config/front.routes')(app);

const port = config.port;
http.createServer(app).listen(port);
logger.info('####################################');
logger.info('##                                ##');
logger.info('##         Server started         ##');
logger.info('##                                ##');
logger.info('####################################');
logger.info('App started in port:', port);
logger.info('Node version:', process.version);
