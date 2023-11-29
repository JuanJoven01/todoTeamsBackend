const joi = require('joi');

const title = joi.string().min(4).max(30);
const description = joi.string().max(300);
const completed = joi.boolean()
const deadline = joi.date()
const finishedAt = joi.date()
const categoryId = joi.number()
const userId = joi.number()
const teamId = joi.number()

const createTasksSchema = joi.object({
    title: title.required(),
    description,
    completed,
    deadline,
    finishedAt,
    categoryId,
    userId: userId.required(),
    teamId,
});

const updateTasksSchema = joi.object({
    title,
    description,
    completed,
    deadline,
    finishedAt,
    categoryId,
    userId,
    teamId,
});

const getTasksSchema = joi.object({
    userId,
    teamId
});

module.exports = {createTasksSchema, updateTasksSchema, getTasksSchema};