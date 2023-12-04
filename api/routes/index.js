const tasksRouter = require('./tasks.router');
const loginRouter = require('./login.router');
const teamsRouter = require('./teams.router');
const newUserRouter = require('./newUser.router');
const newTeamRouter = require('./newTeam.router');
const recoveryRouter = require('./recovery.router');

const checkApiKey = require('../middlewares/auth.handler');


function routerApi(app,){
    app.use(checkApiKey);
    app.use('/api/login', loginRouter)
    app.use('/api/tasks', tasksRouter)
    app.use('/api/teams', teamsRouter)
    app.use('/api/new-user', newUserRouter)
    app.use('/api/new-team', newTeamRouter)
    app.use('/api/recovery', recoveryRouter)
}

module.exports = routerApi;