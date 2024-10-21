const mongoose = require('mongoose');

const combatSchema = new mongoose.Schema({
  hero: { type: mongoose.Schema.Types.ObjectId, ref: 'Hero', required: true },
  monster: { type: mongoose.Schema.Types.ObjectId, ref: 'Monster', required: true }
});

const Combat = mongoose.model('Combat', combatSchema);
module.exports = Combat;
