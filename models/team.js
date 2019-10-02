const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const teamSchema = new Schema({
  TeamId: Number,
  TeamName: String,
  ShortName: String,
  TeamIconUrl: String,
  TeamGroupName: String
});

const Team = mongoose.model("Team", teamSchema);
module.exports = Team;