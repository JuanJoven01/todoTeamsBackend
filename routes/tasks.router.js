const express = require('express');
const router = express.Router();

const tasksServices = require('../services/tasks.services');

router.get('/', async (req, res) => {
  try {
    const tasks = await tasksServices.getAllTasks()
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const task = await req.body;
    const newTask = await tasksServices.createTask(task)
    res.json(newTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const task = await req.body;
    const taskId = await req.params.id;
    const updatedTask = await tasksServices.updateTask(taskId, task)
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const taskId = await req.params.id;
    const deletedTask = await tasksServices.deleteTask(taskId)
    res.json(deletedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

module.exports = router;