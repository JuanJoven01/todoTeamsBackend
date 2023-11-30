const express = require('express');
const router = express.Router();

const sendRecoveryPassword = require('../services/users.service').sendRecoveryPassword;
const recoveryPassword = require('../services/users.service').recoveryPassword;

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

router.post('/change-pass', async (req, res) => {
  try {
    const token = req.query.token;
    const user = await recoveryPassword(token, newPassword);
    res.json(user);
  } catch (error) {
    next(error);
  }
})



module.exports = router;