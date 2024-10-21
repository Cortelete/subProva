const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({
  name: { type: String, required: true },
  atkPoints: { type: Number, required: true },
  expPoints: { type: Number, default: 0 },
  monsterDefeated: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Monster' }]
});

const Hero = mongoose.model('Hero', heroSchema);
module.exports = Hero;
