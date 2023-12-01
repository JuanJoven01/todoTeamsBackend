const joy = require('joi');

const admin = joy.string()
const alias = joy.string().min(4).max(15);

const createTeamSchema = joy.object({
    alias: alias.required(),
    admin: admin
});

const updateTeamSchema = joy.object({
    alias : alias,
    admin: admin
});

module.exports = { createTeamSchema, updateTeamSchema };