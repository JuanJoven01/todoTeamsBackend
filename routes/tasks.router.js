const express = require('express');
const router = express.Router();

const Tasks = require('../db/models').Tasks;

router.get('/', async (req, res) => {
  try {
<<<<<<< HEAD
    const tasks = await models.Tasks.findAll();
=======
    const tasks = await Tasks.findAll();
>>>>>>> 88548b3 (Review files)
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;