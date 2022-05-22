const projectsModel = require('../models/projectsModel.js');

module.exports = {
    projectsAll(req, res, next) {
        projectsModel.getAllProjects().then(proj => res.send(proj))
    },
    projectsFiltered(req, res, next) {
        console.log(req.query);
        const { category, technologies } = req.query;
        console.log(technologies?.split(','));
        console.log(category?.split(','));
        const technologiesArray = technologies ? technologies.split(',') : [];
        const categoriesArray = category ? category.split(',') : [];
        //TODO Add DTO's, to send the projects formatted with the cloudinary url inside the object. ie.: add property preview: www.image.com/project/etc/ect
        projectsModel.getProjectsFiltered(categoriesArray, technologiesArray).then(proj => res.send(proj))
    },
    projectById(req, res, next) {
        projectsModel.getProjectById(req.params.id).then(proj => res.send(proj))
    },
}
