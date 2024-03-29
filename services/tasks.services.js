const Tasks = require ('../db/models').Tasks;
const teamsServices = require('./teams.services');
const boom = require('@hapi/boom');

class tasksServices  {
    constructor() {

    }
    //to get my single tasks
    static async getMyTasks(user){
        const tasks = await Tasks.findAll({
            where: {
                userId: user.sub,
                teamId: null
            }
        });
        return tasks;
    }
    // to get a single task
    static async getTask(user, taskId){
        const task = await Tasks.findOne({
            where: {
                id: taskId
            }
        });
        if (!task){
            throw boom.badRequest('task not found');
        }
        else if (task.userId == user.sub){
            return task;
        }
        else{
            throw boom.badRequest('You are not the owner of this task');
        }
    }
    


    // to create a single task
    static async createTask(task, user){
        const newTask = await Tasks.create({
            ...task,
            userId: user.sub
        });
        return newTask;
    }

    // to create a teams tasks
    static async createTeamTasks(task, user, teamId){
        let witness = await this.verifyTeam(user, teamId);
        if (witness == false){
            throw boom.badRequest('You are not a member of this team');
        }else{
            const newTask = await Tasks.create({
                ...task,
                teamId: teamId,
                userId: user.sub
            });
            return newTask;
        }
        
        
    }

    // to get team tasks
    static async getTeamTasks(user, teamId){
        let witness = await this.verifyTeam(user, teamId);
        if (witness == false){
            throw boom.badRequest('You are not a member of this team');
        }else{
            const tasks = await Tasks.findAll({
                where: {
                    teamId: teamId
                }
            });
            return tasks;
        }
        
        
    }

    // to update a task
    static async updateTask(task, user, taskId){
        const taskToUpdate = await Tasks.findOne({
            where: {
                id: taskId
            }
        });
        const witness = await this.verifyTeam(user, taskToUpdate.teamId);
        if (!taskToUpdate){
            throw boom.badRequest('task not found');
        }
        else if (witness == false){
            throw boom.badRequest('You are not a member of this team');
        }
        else{
            if (taskToUpdate.userId == user.sub){
                const updatedTask = await Tasks.update(
                    {
                        ...task
                    },
                    {
                        where: {
                            id: taskId
                        }
                    }
                );
                return updatedTask;
            }else{
                throw boom.badRequest('You are not the owner of this task');
            }
        }
    }

    // to delete a task 
    static async deleteTask(user, taskId){
        const taskToDelete = await Tasks.findOne({
            where: {
                id: taskId
            }
        });
        const witness = await this.verifyTeam(user, taskToDelete.teamId);
        if (!taskToDelete){
            throw boom.badRequest('task not found');
        }
        else if (witness == false){
            throw boom.badRequest('You are not a member of this team');
        }
        else{
            if (taskToDelete.userId == user.sub){
                const deletedTask = await Tasks.destroy({
                    where: {
                        id: taskId
                    }
                });
                return deletedTask;
            }else{
                throw boom.badRequest('You are not the owner of this task');
            }
        }
    }

    // to verify if user belongs to a team
    static async verifyTeam(user, teamId){
        if (teamId == null){
            return true;
        }
        const teams = await teamsServices.getMyTeams(user.sub);
        let witness = false;
        for (let team of teams ) {
            if (team.teamId == teamId){
                witness = true;
                break;
            }else{
                continue;
            }
        }
        return witness;
    }
}

module.exports = tasksServices;