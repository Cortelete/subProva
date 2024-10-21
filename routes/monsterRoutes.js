const express = require('express');
const router = express.Router();
const Monster = require('../models/Monster');

// Criar Monster
router.post('/monsters', async (req, res) => {
  const { name, atkPoints, expReward } = req.body;
  try {
    const monster = await Monster.create({
      name,
      atkPoints,
      expReward: expReward || 0,
      defeated: false
    });
    res.status(201).json(monster);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar monstro.' });
  }
});

// Listar todos os Monsters
router.get('/monsters', async (req, res) => {
  try {
    const monsters = await Monster.find();
    res.status(200).json(monsters);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar monstros.' });
  }
});

// Listar Monster específico
router.get('/monsters/:id', async (req, res) => {
  const monsterId = req.params.id;
  try {
    const monster = await Monster.findById(monsterId);
    if (!monster) return res.status(404).json({ error: 'Monstro não encontrado.' });
    res.status(200).json(monster);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar o monstro.' });
  }
});

// Atualizar Monster
router.put('/monsters/:id', async (req, res) => {
  const monsterId = req.params.id;
  const updates = req.body;
  try {
    const monster = await Monster.findByIdAndUpdate(monsterId, updates, { new: true });
    if (!monster) return res.status(404).json({ error: 'Monstro não encontrado.' });
    res.status(200).json(monster);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar o monstro.' });
  }
});

// Deletar Monster
router.delete('/monsters/:id', async (req, res) => {
  const monsterId = req.params.id;
  try {
    const monster = await Monster.findByIdAndDelete(monsterId);
    if (!monster) return res.status(404).json({ error: 'Monstro não encontrado.' });
    res.status(200).json({ message: 'Monstro deletado com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar o monstro.' });
  }
});

module.exports = router;
