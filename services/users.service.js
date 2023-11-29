const Users = require('../db/models').Users;

const bcrypt = require('bcrypt');

class usersServices {
    constructor() {

    }

    static async newUser (user){
        let pass = await user.password;
        pass = await bcrypt.hash(pass, 10);
        await Users.create({
            ...user,
            password: pass
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
}

module.exports = usersServices;