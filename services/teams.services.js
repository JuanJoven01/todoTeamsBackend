const Teams = require('../db/models').Teams;
const boom = require('@hapi/boom');
const Users_Teams = require('../db/models').Users_Teams;



class teamsServices {
    constructor() {
    }

    static async getMyTeams(){
        const teams = await Teams.findAll();
        return teams;
    }

    static async createTeam(team, user){
        team.admin = user.username;
        console.log(team)
        console.log(user)
        const newTeam = await Teams.create(
            team
        );
        console.log(newTeam)
        await Users_Teams.create({
            userId: user.sub,
            teamId: newTeam.id
        });
        return newTeam;
    }

    

}

module.exports = teamsServices;