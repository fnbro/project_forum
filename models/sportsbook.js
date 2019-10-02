const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const sportsbookSchema = new Schema({
  team1: String,
  team2: String,
  result: String,
  userid: { type: Schema.Types.ObjectId, ref: 'User' }


}, {
  timestamps: true
});

const Sportsbook = mongoose.model("Sportsbook", sportsbookSchema);

module.exports = Sportsbook;