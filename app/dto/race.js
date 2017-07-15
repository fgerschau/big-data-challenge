const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const race = {
  created: Date,
  driven: Date,
  trackId: Number,
  challengerId: Number,
  money: Number,
  fuelConsumption: Number,
  winnerId: Number,
  status: String,
  weather: String,
};

const raceSchema = new Schema(race);

module.exports = mongoose.model('race', raceSchema);
