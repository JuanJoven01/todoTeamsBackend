const express = require('express');
const router = express.Router();

const models = require('../db/models/index');

router.get('/', async (req, res) => {
  try {
    const tasks = await models.Tasks.findAll();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;