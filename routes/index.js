const singleTasksRouter = require('./singleTasks.router');
const loginRouter = require('./login.router');
const teamsRouter = require('./teams.router');
const newUserRouter = require('./newUser.router');
const newTeamRouter = require('./newTeam.router');
const recoveryRouter = require('./recovery.router');

const checkApiKey = require('../middlewares/auth.handler');


function routerApi(app,){
    app.use(checkApiKey);
    app.use('/login', loginRouter)
    app.use('/single-tasks', singleTasksRouter)
    app.use('/teams', teamsRouter)
    app.use('/new-user', newUserRouter)
    app.use('/new-team', newTeamRouter)
    app.use('/recovery', recoveryRouter)
}

module.exports = routerApi;