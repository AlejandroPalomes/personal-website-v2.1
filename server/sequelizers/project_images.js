const Sequelize = require('sequelize');
const db = require('../config/db-connect')

const Project_Images = db.define('project_images', {
    project_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    image_id: {
        type: Sequelize.STRING
    }
})

module.exports = Project_Images;