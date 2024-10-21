const express = require('express');
const router = express.Router();
const Hero = require('../models/Hero');

// Criar Hero
router.post('/heroes', async (req, res) => {
  const { name, atkPoints } = req.body;
  try {
    const hero = await Hero.create({ name, atkPoints, expPoints: 0, monsterDefeated: [] });
    res.status(201).json(hero);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar herói.' });
  }
});

// Listar todos os Heros
router.get('/heroes', async (req, res) => {
  try {
    const heroes = await Hero.find();
    res.status(200).json(heroes);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar heróis.' });
  }
});

// Listar Hero específico e trazer monstros derrotados
router.get('/heroes/:id', async (req, res) => {
  const heroId = req.params.id;
  try {
    const hero = await Hero.findById(heroId).populate('monsterDefeated');
    if (!hero) return res.status(404).json({ error: 'Herói não encontrado.' });
    res.status(200).json(hero);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar o herói.' });
  }
});

// Atualizar Hero
router.put('/heroes/:id', async (req, res) => {
  const heroId = req.params.id;
  const updates = req.body;
  try {
    const hero = await Hero.findByIdAndUpdate(heroId, updates, { new: true });
    if (!hero) return res.status(404).json({ error: 'Herói não encontrado.' });
    res.status(200).json(hero);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar o herói.' });
  }
});

// Deletar Hero
router.delete('/heroes/:id', async (req, res) => {
  const heroId = req.params.id;
  try {
    const hero = await Hero.findByIdAndDelete(heroId);
    if (!hero) return res.status(404).json({ error: 'Herói não encontrado.' });
    res.status(200).json({ message: 'Herói deletado com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar o herói.' });
  }
});

module.exports = router;
