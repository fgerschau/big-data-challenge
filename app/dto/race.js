const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const race = {
  created: Date,
  driven: Date,
  trackId: Number,
  challengerId: Number,
  opponentId: Number,
  money: Number,
  fuelConsumption: Number,
  winnerId: Number,
  status: String,
  weather: String, // can have the values [ "rainy", "sunny", "", "snowy", "thundery" ] (empty string when the race was not driven)
  forecast: Object,
};

const raceSchema = new Schema(race);

// Creates indexes on require only if they did not exist previously
raceSchema.index({ weather: 1 });
raceSchema.index({ winnerId: 1 });

module.exports = mongoose.model('race', raceSchema);
