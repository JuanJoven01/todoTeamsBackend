const Users = require('../db/models').Users;


class usersServices {
    constructor() {

    }

    async newUser (user){
        await Users.create(user);
        return user;
    }
}

module.exports = usersServices;