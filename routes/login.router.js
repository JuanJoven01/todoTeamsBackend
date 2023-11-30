const express = require('express');
const router = express.Router();
const passport = require('passport');
require('dotenv').config()
const jwt = require('jsonwebtoken');


// Login route
router.post('/', 
  passport.authenticate('local', { session: false}),
  async (req, res, next) => {
    try {
      user = req.user;
      user.password = 'password is hidden';
      user.mail = 'mail is hidden';
      const payload = {
        sub: user.id,
        username: user.name
      }
      const token = await jwt.sign(payload, process.env.JWT_KEY);
      res.json({
        token,
        user
      });
    } catch (error) {
      next(error); 
    }
});

module.exports  = router;