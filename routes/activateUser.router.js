const express = require('express');
const router = express.Router();
const activateUser = require('../services/users.service').activateUser;

router.post('/', async (req, res, next) => {
    try {
        const token =  req.query.token;
        user = await activateUser(token);
        res.json(user, 'User activated');
    } catch (error) {
        next(error);
    }
    })