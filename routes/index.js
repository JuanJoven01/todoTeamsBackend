const singleTasksRouter = require('./singleTasks.router');
const loginRouter = require('./login.router');
const teamsRouter = require('./teams.router');
const newUserRouter = require('./newUser.router');
const newTeamRouter = require('./newTeam.router');
const recoveryRouter = require('./recovery.router');
const activateUserRouter = require('./activateUser.router');


function routerApi(app){
    app.use('/login', loginRouter)
    app.use('/single-tasks', singleTasksRouter)
    app.use('/teams', teamsRouter)
    app.use('/newUser', newUserRouter)
    app.use('/newTeam', newTeamRouter)
    app.use('/recovery', recoveryRouter)
    app.use('/activate-user', activateUserRouter)
}

module.exports = routerApi;