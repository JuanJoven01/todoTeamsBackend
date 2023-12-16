const Teams = require('../db/models').Teams;
const boom = require('@hapi/boom');
const Users_Teams = require('../db/models').Users_Teams;
const Invitations = require('../db/models').Invitations;



class teamsServices {
    constructor() {
    }

    // To get all my Teams

    static async getMyTeams(theUserId){
        const teams = await Users_Teams.findAll({
            where: {
                userId: theUserId
            },
            include: [{
                association: 'teams',
            }]
        });
        
        return teams;
    }
    // Function to create a new Team
    static async createTeam(team, user){
        team.admin = user.username;
        const newTeam = await Teams.create(
            team
        );
        await Users_Teams.create({
            userId: user.sub,
            teamId: newTeam.id
        });
        return newTeam;
    }

    // To invite a user to my team, we need the user name and the team Id
    static async inviteUserToTeam(userId, invitedUserId, teamId){
        const invitation = await Invitations.create({
            senderId: userId,
            receiverId: invitedUserId,
            teamId: teamId
        });
        return invitation;
    }

    // to get my invitations
    static async getMyInvitations(userId){
        const invitations = await Invitations.findAll({
            where: {
                receiverId: userId,
                status: 'pending'
            },
            include: [{
                association: 'teams',
            }]
        });
        return invitations;
    }


    // to accept an invitation
    static async acceptInvitation(userId, invitationId){
        const invitation = await Invitations.findByPk(invitationId);
        if (invitation.receiverId === userId){
            await Users_Teams.create({
                userId: userId,
                teamId: invitation.teamId
            });
            await Invitations.update(
                {
                    status: 'accepted',
                },
                {
                    where: {
                        id: invitationId
                    }
                }
            );
            
            return 'Invitation accepted'
        }else{
            throw boom.badRequest('Invalid invitation')
        }
    }
   

}

module.exports = teamsServices;