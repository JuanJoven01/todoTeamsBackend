const Users = require('../db/models').Users;

const bcrypt = require('bcrypt');

const sendUserMail = require ('../utils/mail/activeUser.mail')

const jwt = require('jsonwebtoken');

const boom = require('@hapi/boom');

class usersServices {
    constructor() {

    }
// To create a new user, password is encrypted
    static async newUser (user, host){
        const repeatedUser = await Users.findOne({
            where: {
                name: user.name
            }
        });

        const repeatedMail = await Users.findOne({
            where: {
                mail: user.mail
            }
        });

        if (repeatedUser || repeatedMail) {
            throw boom.badRequest('User or Email already exists');
        }else{
            let pass = user.password;
            pass = await bcrypt.hash(pass, 10);
            const newUser = await Users.create({
                ...user,
                password: pass
            });
            
            newUser.password = 'password is hidden';
    // To send a email with activation code
            let payload = {
                sub : newUser.id,
                name : newUser.name,
                mail : newUser.mail
            }

            let token = jwt.sign(payload, process.env.JWT_KEY, {expiresIn: '15m'});
            
            await sendUserMail(newUser.mail, 
                'Activation link', 
                'Your activation link is: ' + host + '/activate-user?token=' + token );

            await Users.update({
                code: token
            },
            {
                where: {
                    name: newUser.name
                }
            });
            
            return newUser;
        }
        
    }

    // To activate a user, we need to validate the token
    static async activateUser (token){
        try {
            let payload = jwt.verify(token, process.env.JWT_KEY);
            if (!payload) {
                throw boom.badRequest('Invalid token');
            }else{
                let user = await Users.findByPk(payload.sub);
                if (user.code === null && user.isActive === true) {
                    throw boom.badRequest('User already activated');
                }
                else if (user.code === null && user.isActive === false) {
                    throw boom.badRequest('User has not requested activation');
                }
                else if (user.code !== token) {
                    throw boom.badRequest('Invalid token');
                }else{
                    await Users.update(
                        {
                        isActive: true,
                        code: null
                        },
                        {
                        where: {
                            id: payload.sub
                        }
                        }
                    );

                    user.password = 'password is hidden';
                    user.code = 'code is hidden'
                    user.isActive = true;
                    return user;
                }
            }
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                boom.badRequest('Token expired');
              } else {
                throw error
              }
        }
        
    }

    // To resend activation code, we need to validate the user

    static async resendActivationCode (mail, host){
        try {
            if (!mail || !host){
                throw boom.badRequest('invalid Mail or host')
            }else{
                const user = await Users.findOne({
                    where: {
                        mail: mail
                    }
                });
                if (!user) {
                    throw boom.badRequest('Invalid user');
                }
                else if (user.isActive === true) {
                    throw boom.badRequest('User already activated');
                }
    
                else {
                    let payload = {
                        sub : user.id,
                        name : user.name,
                        mail : user.mail
                    }
            
                    let token = jwt.sign(payload, process.env.JWT_KEY, {expiresIn: '15m'});
                    
                    await sendUserMail(user.mail, 
                        'Activation link', 
                        'Your activation link is: ' +
                        host + '/activate-user?token=' + token );
            
                    await Users.update({
                        code: token
                    },
                    {
                        where: {
                            name: user.name
                        }
                    });
                    
                    return user;
                }
            }
            

            
        } catch (error) {
            throw error;
        }
        
    }

    // To send a recovery password link, we need to validate the user

    static async sendRecoveryPassword (mail, host){
        try {
            if (!mail | !host){
                throw boom.badRequest('invalid User or host')
                }else{
                const user = await Users.findOne({
                    where: {
                        mail: mail
                    }
                });
                if (!user) {
                    throw boom.badRequest('Invalid user');
                }
                else {
                    let payload = {
                        sub : user.id,
                        name : user.name,
                        mail : user.mail
                    }
            
                    let token = jwt.sign(payload, process.env.JWT_KEY, {expiresIn: '15m'});
                    
                    await sendUserMail(user.mail, 
                        'Recovery link', 
                        'Your recovery link to the user '+ user.name + ' is: ' +
                        host + 'recovery/change-pass?token=' + token );
            
                    await Users.update({
                        code: token
                    },
                    {
                        where: {
                            name: user.name
                        }
                    });

                    user.password = 'Password is hidden'

                    return user;
                }
                }
            
        } catch (error) {
            throw error;
        }
    }

    // To recovery password, we need to validate the token

    static async recoveryPassword (token, newPassword){
        try {
            let payload = jwt.verify(token, process.env.JWT_KEY);
            if (!payload) {
                throw boom.badRequest('Invalid token');
            }else{
                let user = await Users.findByPk(payload.sub);
                if (user.code === null) {
                    throw boom.badRequest('User has not requested recovery');
                }
                else if (user.code !== token) {
                    throw boom.badRequest('Invalid token');
                }else{
                    newPassword = await bcrypt.hash(newPassword, 10);
                    await Users.update(
                        {
                        code: null,
                        password: newPassword
                        },
                        {
                        where: {
                            id: payload.sub
                        }
                        }
                    );

                    user.password = 'password is hidden';
                    user.code = 'code is hidden'
                    return user;
                }
            }
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                boom.badRequest('Token expired');
              } else {
                throw error
              }
        }
        
    }

    //To login with the local strategy
    static async getSingleUser (name){
        const user = await Users.findOne({
            where: {
                name: name
            }
        });
        if (!user) {
            throw boom.badRequest('Invalid user');
        }
        else{
            return user;
        }
        
    }
}

module.exports = usersServices;