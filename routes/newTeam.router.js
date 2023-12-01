const express = require('express');
const router = express.Router();
const passport = require('passport');
const boom = require('@hapi/boom');

const validatorHandler = require('../middlewares/validator.handler');
const createTeamSchema = require('../schemas/teams.schema').createTeamSchema;

 //function create a new team by the services
const teamsServices = require('../services/teams.services');

// to get my teams
// router.get('/', async (req, res) => {
//   try {
//     const team = await Teams.create(req.body);
//     res.status(201).json(team);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// })

// to create a new team
router.post('/', 
passport.authenticate('jwt', { session: false}),
validatorHandler(createTeamSchema, 'body'),
  async (req, res, next) => {
    try {
      const team = req.body;
      const user = req.user;
      const newTeam = await teamsServices.createTeam(team, user);
      res.json (newTeam)
    } catch (error) {
      next(error);
    }
})

module.exports = router;