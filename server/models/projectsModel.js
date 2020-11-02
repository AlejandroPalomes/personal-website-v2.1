const Projects = require('../sequelizers/projects');
const Technologies = require('../sequelizers/technologies');
const Project_Tech = require('../sequelizers/project_tech')
const Images = require('../sequelizers/images')
const Project_Images = require('../sequelizers/project_images');

module.exports = {
    getAllProjects(){
        return new Promise ((resolve, reject) =>{
            Projects.findAll({
                attributes: ['ID', 'title', 'description', 'repo', 'preview'],
                include: [{
                    model: Technologies,
                    attributes: ['name']
                }],
                // include: [{
                //     model: Images,
                //     attributes: ['name']
                // }],
                where:{
                    show: 1
                }
            })
                .then(proj=>resolve(proj))
                .catch(err => {
                    console.log(err);
                    reject(err);
                })
        })
    },
    getProjectById(id){
        return new Promise ((resolve, reject) =>{
            Projects.findAll({
                attributes: ['title', 'description', 'collaborators', 'completion_date', 'repo', 'preview'],
                include: [{
                    model: Technologies,
                    // required: true,
                    attributes: ['name']
                }],
                where:{
                    ID: id,
                    show: 1
                }
            })
                .then(proj=>resolve(proj))
                .catch(err => {
                    console.log(err);
                    reject(err);
                })
        })
    }
}