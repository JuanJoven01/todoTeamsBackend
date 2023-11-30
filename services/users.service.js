const Users = require('../db/models').Users;

const bcrypt = require('bcrypt');

const sendUserMail = require ('../utils/mail/activeUser.mail')

const jwt = require('jsonwebtoken');

class usersServices {
    constructor() {

    }
// To create a new user, password is encrypted
    static async newUser (user, host){
        let pass = await user.password;
        pass = await bcrypt.hash(pass, 10);
        await Users.create({
            ...user,
            password: pass
        });
        user.password = 'password is hidden';
// To send a email with activation code
        let payload = {
            sub : user.id,
            name : user.name,
            email : user.email
        }

        let token = jwt.sign(payload, process.env.JWT_KEY, {expiresIn: '15m'});
        
        await sendUserMail(user.email, 
            'Activation link', 
            'Your activation link is: ',
            host + '/activate-user?token=' + token );

        return user;
    }

    // To activate a user, we need to validate the token
    static async activateUser (token){
        let payload = jwt.verify(token, process.env.JWT_KEY);
        let user = await Users.findByPk(payload.sub);
        await user.update({
            active: true
        });
        user.password = 'password is hidden';
        return user;
    }

    static async getAllUsers (){
        const users = await Users.findAll();
        return users;
    }

    static async getSingleUser (name){
        const user = await Users.findOne({
            where: {
                name: name
            }
        });
        return user;
    }

    static async sendActivationCode (user){
        mail = await user.email;
        sendUserMail(code, email);

    }
}

module.exports = usersServices;