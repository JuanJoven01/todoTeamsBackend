const joi = require('joi');

const name = joi.string().min(4).max(15);
const password = joi.string().min(8).max(16)
const mail = joi.string().email()
const code = joi.string()
const isActive = joi.boolean()

const createUserSchema = joi.object({
    name: name.required(),
    password: password.required(),
    mail: mail.required(),
    code,
    isActive
});

const updateUserSchema = joi.object({
    name : name.required(),
    password : password.required(),
    mail,
    code,
    isActive
});

const getSingleUserSchema = joi.object({
    name : name.required(),
});

module.exports = {createUserSchema, updateUserSchema, getSingleUserSchema};