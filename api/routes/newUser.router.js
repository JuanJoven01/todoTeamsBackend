const express = require('express');
const router = express.Router();
const {createUserSchema} = require('../schemas/users.schemas');
const activateUser = require('../services/users.service').activateUser;
const validatorHandler = require('../middlewares/validator.handler');
const resendActivationCode = require('../services/users.service').resendActivationCode;
const usersServices = require('../services/users.service');

// To create a new user, we need to validate the body of the request.
router.post('/', 
validatorHandler(createUserSchema, 'body'),
async (req, res, next) => {
  try {
    const user = await req.body;
    const host = req.headers.host;
    const newUser = await usersServices.newUser(user, host);
    res.json(newUser);
  } catch (error) {
    next(error);
  }
})

// to activate a user, we need to validate the token
router.post('/activate-user', async (req, res, next) => {
    try {
        const token =  req.query.token;
        user = await activateUser(token);
        res.json(user);
    } catch (error) {
        next(error);
    }
    })

// To resend activation code, we need to validate the user
router.post('/resend-activation', async (req, res, next) => {
    try {
        const mail =  req.body.mail;
        const host = req.headers.host;
        user = await resendActivationCode(mail, host);
        res.json(user);
    } catch (error) {
        next(error);
    }
    })

module.exports = router;