const Tasks = require ('../db/models').Tasks;

class singleTasksServices  {
    constructor() {

    }

    static async getAllTasks(userId){
        const tasks = await Tasks.findAll({
            where: {
                userId: userId
            }
        });
        return tasks;
    }

    static async createTask(task){
        await Tasks.create(task);
        return task;
    }

    static async updateTask(taskId, task){
        const taskToUpdate = await Tasks.findByPk(taskId);
        await taskToUpdate.update(task);
        return taskToUpdate;
    }

    static async deleteTask(taskId){
        const taskToDelete = await Tasks.findByPk(taskId);
        await taskToDelete.destroy();
        return taskToDelete;
    }
}

module.exports = singleTasksServices;