const taskRouter = require('./tasks.router');

function routerApi(app){
    app.use('/tasks', taskRouter)
}

module.exports = routerApi;