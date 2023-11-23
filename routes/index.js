const tasksRouter = require('./tasks.router');
const loginRouter = require('./login.router');
const teamsRouter = require('./teams.router');
const newUser = require('./newUser.router');
const newTeam = require('./newTeam.router');

function routerApi(app){
    app.use('/', loginRouter)
    app.use('/tasks', tasksRouter)
    app.use('/teams', teamsRouter)
    app.use('/newUser', newUser)
    app.use('/newTeam', newTeam)
    

}

module.exports = routerApi;