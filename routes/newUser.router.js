const express = require('express');
const router = express.Router();
const usersServices = require('../services/users.service');
const boom = require('@hapi/boom');
const {createUserSchema, updateUserSchema, getSingleUserSchema} = require('../schemas/users.schemas');

const validatorHandler = require('../middlewares/validator.handler');

// To get all users, preferably don't use this in production

router.get('/', async (req, res, next) => {
  try {
    const users = await usersServices.getAllUsers();  
    res.json(users);
  } catch (error) {
    next(error);
  }
})
// To create a new user, we need to validate the body of the request.
router.post('/', 
validatorHandler(createUserSchema, 'body'),
async (req, res, next) => {
  try {
    const user = await req.body;
    const host = await req.headers.host;
    const newUser = await usersServices.newUser(user, host);
    res.json(newUser);
  } catch (error) {
    next(error);
  }
})

module.exports = router;