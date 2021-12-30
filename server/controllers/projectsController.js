const projectsModel = require('../models/projectsModel.js');

module.exports = {
    projectsAll(req, res, next) {
        projectsModel.getAllProjects().then(proj => res.send(proj))
    },
    projectsFiltered(req, res, next) {
        console.log(req.query);
        const { category, technologies } = req.query;
        console.log(technologies?.split(','))
        projectsModel.getProjectsFiltered(category, technologies?.split(',')).then(proj => res.send(proj))
    },
    projectById(req, res, next) {
        projectsModel.getProjectById(req.params.id).then(proj => res.send(proj))
    },
}
