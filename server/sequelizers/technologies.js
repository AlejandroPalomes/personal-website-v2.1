const Sequelize = require('sequelize');
const db = require('../config/db-connect');
const Projects = require('./projects');
const Project_Tech = require('./technologies');

const Technologies = db.define('technologies', {
    ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING
    }
})

Projects.belongsToMany(Technologies, {
    through: 'project_tech',
    foreignKey: 'project_id'
});
Technologies.belongsToMany(Projects, {
    through: 'project_tech',
    foreignKey: 'tech_id'
});

module.exports = Technologies;