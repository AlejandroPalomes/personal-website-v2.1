const Sequelize = require('sequelize');
const db = require('../config/db-connect');
const Projects = require('./projects');

const Images = db.define('images', {
    ID: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING
    }
})

Projects.belongsToMany(Images, {
    through: 'project_images',
    foreignKey: 'project_id'
});
Images.belongsToMany(Projects, {
    through: 'project_images',
    foreignKey: 'image_id'
});

module.exports = Images;