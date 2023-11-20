const tasksRouter = require('./tasks.router');
const usersRouter = require('./users.router');

function routerApi(app){
    app.use('/tasks', tasksRouter)
    app.use('/users', usersRouter)
}

module.exports = routerApi;