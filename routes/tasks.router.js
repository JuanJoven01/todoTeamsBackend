const express = require('express');
const router = express.Router();

const Tasks = require('../db/models').Tasks;

router.get('/', async (req, res) => {
  try {
    const tasks = await Tasks.findAll();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;