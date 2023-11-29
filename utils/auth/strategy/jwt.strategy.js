const {Strategy, ExtractJwt} = require('passport-jwt');
require('dotenv').config()

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_KEY
}

const jwtStrategy = new Strategy(
    options,
    async (payload, done) => {
        try {
            return done(null, payload.sub)
        } catch (error) {
            return done(error)
        }
    }
)

module.exports = jwtStrategy;