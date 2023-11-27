const Tasks = require ('../db/models').Tasks;

class tasksServices {
    constructor() {

    }

    async getAllTasks(){
        const tasks = await Tasks.findAll();
        return tasks;
    }

    async createTask(task){

        await Tasks.create(task);
        return task;

    }

    async updateTask(taskId, task){
        const taskToUpdate = await Tasks.findByPk(taskId);
        await taskToUpdate.update(task);
        return taskToUpdate;
    }

    async deleteTask(taskId){
        const taskToDelete = await Tasks.findByPk(taskId);
        await taskToDelete.destroy();
        return taskToDelete;
    }
}

module.exports = tasksServices;