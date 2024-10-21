const mongoose = require('mongoose');

const monsterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  atkPoints: { type: Number, required: true },
  expReward: { type: Number, default: 0 },
  defeated: { type: Boolean, default: false }
});

const Monster = mongoose.model('Monster', monsterSchema);
module.exports = Monster;
