const express = require('express');
const router = express.Router();
const singleTasksServices = require('../services/singleTasks.services.js');
const validatorHandler = require('../middlewares/validator.handler.js');
const { createTasksSchema, updateTasksSchema, getTasksSchema } = require('../schemas/tasks.schema.js'); 
const checkApiKey = require('../middlewares/auth.handler.js');


router.get('/', 
  checkApiKey,
  async (req, res, next) => {
  try {
    const tasks = await singleTasksServices.getAllTasks(1)
    res.json(tasks);
  } catch (error) {
    next(error)
  }
});

router.post( '/',
  validatorHandler(createTasksSchema, 'body'),
  async (req, res, next) => {
  try {
    const task = await req.body;
    const newTask = await singleTasksServices.createTask(task)
    res.json(newTask);
  } catch (error) {
    next(error)
  }
});

router.put('/:id', 
validatorHandler(updateTasksSchema, 'body'),
async (req, res, next) => {
  try {
    const task =  req.body;
    const taskId =  req.params.id;
    const updatedTask = await singleTasksServices.updateTask(taskId, task)
    res.json(updatedTask);
  } catch (error) {
    next(error)
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const taskId =  req.params.id;
    const deletedTask = await singleTasksServices.deleteTask(taskId)
    res.json(deletedTask);
  } catch (error) {
    next(error);
  }
})

module.exports = router;