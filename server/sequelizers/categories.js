const Sequelize = require('sequelize');
const db = require('../config/db-connect');
const Projects = require('./projects');
// const Project_Tech = require('./technologies');

const Categories = db.define('categories', {
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

Projects.belongsToMany(Categories, {
    through: 'project_cat',
    foreignKey: 'project_id'
});
Categories.belongsToMany(Projects, {
    through: 'project_cat',
    foreignKey: 'category_id'
});

module.exports = Categories;