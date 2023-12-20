const {Strategy} = require('passport-local');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const getSingleUser = require('../../../services/users.service').getSingleUser;

const localStrategy = new Strategy( 
    {
        usernameField: 'name',
        passwordField: 'password'
    },
    async (name, password, done)=> {
    try {
        const user = await getSingleUser(name);
        
        if (!user) {
            return done(boom.unauthorized('User not found'), false)
        }
        if (!(await bcrypt.compare(password, user.password))) {
            return done(boom.unauthorized('Incorrect password'), false)
        }
        return done(null, user)

    } catch (error) {
        return done(boom.internal, false)
    }

})

module.exports = localStrategy;

