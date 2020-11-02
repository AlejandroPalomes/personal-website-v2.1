const Sequelize = require('sequelize');
const db = require('../config/db-connect')

const Projects = db.define('projects', {
    ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
    collaborators: {
        type: Sequelize.STRING
    },
    repo: {
        type: Sequelize.STRING
    },
    preview: {
        type: Sequelize.STRING
    },
    show: {
        type: Sequelize.INTEGER
    },
    completion_date: {
        type: Sequelize.INTEGER
    },
    created_at: {
        type: Sequelize.DATE
    },
    updated_at: {
        type: Sequelize.DATE
    },
})

module.exports = Projects;