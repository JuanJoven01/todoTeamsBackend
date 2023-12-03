const express = require('express');
const router = express.Router();
const tasksServices = require('../services/tasks.services.js');
const validatorHandler = require('../middlewares/validator.handler.js');
const { createTasksSchema, updateTasksSchema, getTasksSchema } = require('../schemas/tasks.schema.js'); 
const passport = require('passport');


router.get('/', 
  passport.authenticate('jwt', { session: false}),
  validatorHandler(getTasksSchema, 'body'),
  async (req, res, next) => {
  try {
    const  user = req.user;
    const tasks = await tasksServices.getMyTasks(user)
    res.json(tasks);
  } catch (error) {
    next(error)
  }
});

router.post('/create-single-task',
  passport.authenticate('jwt', { session: false}),
  validatorHandler(createTasksSchema, 'body'),
  async (req, res, next) => {
  try {
    const task = req.body;
    const user = req.user;
    const newTask = await tasksServices.createTask(task, user);
    res.status(201).json(newTask);
  } catch (error) {
    next(error)
  }
});

router.post ('/create-team-tasks/:teamId',
  passport.authenticate('jwt', { session: false}),
  validatorHandler(createTasksSchema, 'body'),
  async (req, res, next) => {
  try {
    const task = req.body;
    const user = req.user;
    const teamId = req.params.teamId;
    const newTask = await tasksServices.createTeamTasks(task, user, teamId);
    res.status(201).json(newTask);
  } catch (error) {
    next(error)
  }
});

router.get ('/get-team-tasks/:teamId',
  passport.authenticate('jwt', { session: false}),
  async (req, res, next) => {
  try {
    const user = req.user;
    const teamId = req.params.teamId;
    const tasks = await tasksServices.getTeamTasks(user, teamId);
    res.status(201).json(tasks);
  } catch (error) {
    next(error)
  }
});

router.put ('/update-task/:taskId',
  passport.authenticate('jwt', { session: false}),
  validatorHandler(updateTasksSchema, 'body'),
  async (req, res, next) => {
  try {
    const user = req.user;
    const taskId = req.params.taskId;
    const task = req.body;
    const updatedTask = await tasksServices.updateTask(user, taskId, task);
    res.status(201).json(updatedTask);
  } catch (error) {
    next(error)
  }
});

router.delete ('/delete-task/:taskId',
  passport.authenticate('jwt', { session: false}),
  async (req, res, next) => {
  try {
    const user = req.user;
    const taskId = req.params.taskId;
    const deletedTask = await tasksServices.deleteTask(user, taskId);
    res.status(201).json(deletedTask);
  } catch (error) {
    next(error)
  }
});



module.exports = router;