const express = require('express');
const router = express.Router();

const Users = require('../db/models').Users;
const usersServices = require('../services/users.service');

router.get('/', async (req, res) => {
  try {
    const users = await usersServices();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

router.post('/', async (req, res) => {
  try {
    const user = await req.body;
    await Users.create(user);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

module.exports = router;