const express = require('express');
const router = express.Router();

const Teams = require('../db/models').Teams;

router.get('/', async (req, res) => {
  try {
    const teams = await Teams.findAll();
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

router.post('/', async (req, res) => {
  try {
    const team = await Teams.create(req.body);
    res.status(201).json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

module.exports = router;