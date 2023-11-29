const passport = require('passport');

const localStrategy = require ('./strategy/local.strategy.js');

const jwtStrategy = require ('./strategy/jwt.strategy.js');

passport.use(localStrategy);
passport.use(jwtStrategy);

 