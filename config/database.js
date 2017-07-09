const mongoose = require('mongoose');

exports.connect = function (config) {
  const connectionOptions = {
    useMongoClient: true,
  };

  mongoose.createConnection(config.db, connectionOptions);
  const db = mongoose.connection;
  db.on('error', (err) => {
    throw new Error(`Unable to connect to database at ${config.db}: ${err}`);
  });
};
