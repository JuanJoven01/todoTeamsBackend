const express = require('express');
const router = express.Router();

const Users = require('../db/models').Users;
const usersServices = require('../services/users.service');

const boom = require('@hapi/boom');

const {createUserSchema, updateUserSchema, getSingleUserSchema} = require('../schemas/users.schemas');

const validatorHandler = require('../middlewares/validator.handler');


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
    const newUser = await usersServices.newUser(user);
    res.json(newUser);
  } catch (error) {
    next(error);
  }
})

module.exports = router;