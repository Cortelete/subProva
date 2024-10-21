const express = require('express');
const router = express.Router();
const Hero = require('../models/Hero');
const Monster = require('../models/Monster');
const Combat = require('../models/Combat');

// Criar Combat
router.post('/combat', async (req, res) => {
  const { heroId, monsterId } = req.body;
  try {
    const hero = await Hero.findById(heroId);
    const monster = await Monster.findById(monsterId);

    if (!hero || !monster) {
      return res.status(404).json({ error: 'Herói ou monstro não encontrado.' });
    }

    if (monster.defeated || hero.atkPoints < monster.atkPoints) {
      return res.status(400).json({ error: 'Herói não pode vencer o combate.' });
    }

    hero.expPoints += monster.expReward;
    hero.monsterDefeated.push(monsterId);
    monster.defeated = true;

    await hero.save();
    await monster.save();

    const combat = await Combat.create({ hero: heroId, monster: monsterId });
    res.status(201).json(combat);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao iniciar o combate.' });
  }
});

module.exports = router;
