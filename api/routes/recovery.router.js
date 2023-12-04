const express = require('express');
const router = express.Router();

const validatorHandler = require('../middlewares/validator.handler');
const sendRecoveryPassword = require('../services/users.service').sendRecoveryPassword;
const recoveryPassword = require('../services/users.service').recoveryPassword;
const updateUserSchema = require('../schemas/users.schemas').updateUserSchema;


// To send a recovery password link, we need to validate the user with the mail
router.post('/', async (req, res) => {
  try {
    const mail = req.body.mail;
    const host = req.headers.host;
    const user = await sendRecoveryPassword(mail, host);
    res.json(user);
  } catch (error) {
    next(error);
  }
})

// To recovery password, we need to validate the token

router.post('/change-pass',
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const token = req.query.token;
      const user = req.body;
      const newUser = await recoveryPassword(token, user.password);
      res.json(newUser);
    } catch (error) {
      next(error);
    }
})



module.exports = router;