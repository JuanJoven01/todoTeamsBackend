const express = require ('express')
const router = express.Router()
const passport = require('passport');
const teamsServices = require ('../services/teams.services')
const usersServices = require ('../services/users.service')



// To get all my Teams
router.get ('/my-teams',
passport.authenticate('jwt', { session: false}),
    async (req, res, next) => {
        try {
            const user = req.user
            const teams = await teamsServices.getMyTeams(user.sub)
            res.json(teams)
        } catch (error) {
            next(error)
        }
    }
)

// To send a invitation to my team, we need the user name(as username) and the team Id (should be provided by the front end)

router.post ('/invite', 
passport.authenticate('jwt', { session: false}),
    async (req, res, next) => {
        try {
            const body = req.body
            const user = req.user
            const invitedUserId = await usersServices.getSingleUser(body.username);
            const invitation = await teamsServices.inviteUserToTeam(user.sub, invitedUserId.id, body.teamId);
            res.json(invitation)
        } catch (error) {
            next(error)
        }
    }
)

router.get('/my-invitations',
passport.authenticate('jwt', { session: false}),
    async (req, res, next) => {
        try {
            const user = req.user
            const invitations = await teamsServices.getMyInvitations(user.sub)
            res.json(invitations)
        } catch (error) {
            next(error)
        }   
    }
)
// To accept the invitation, we need the invitation id
router.patch('/accept-invitation/:id',
    passport.authenticate('jwt', { session: false}),
    async (req, res, next) => {
        try {
            const user = req.user
            const invitation = await teamsServices.acceptInvitation(user.sub, req.params.id)
            res.json(invitation)
        } catch (error) {
            next(error)
        } 
    }
)




module.exports = router