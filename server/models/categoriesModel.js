const Categories = require('../sequelizers/categories');
const Images = require('../sequelizers/images')
const Projects = require('../sequelizers/projects');
const Project_Images = require('../sequelizers/project_images');
const Project_Tech = require('../sequelizers/project_tech')
const Technologies = require('../sequelizers/technologies');

module.exports = {
  getAllCategories(){
    return new Promise ((resolve, reject) => {
      Categories.findAll({
        attributes: ['ID', 'name']
      })
      .then(proj => resolve(proj))
      .catch(err => {
        console.log(err);
        reject(err);
      })
    })
  }
}
