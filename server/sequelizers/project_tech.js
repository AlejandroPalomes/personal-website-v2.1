const Sequelize = require('sequelize');
const db = require('../config/db-connect');

const Project_Tech = db.define('project_tech', {
    project_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    tech_id: {
        type: Sequelize.INTEGER
    }
},{
    freezeTableName: true,
})


module.exports = Project_Tech;