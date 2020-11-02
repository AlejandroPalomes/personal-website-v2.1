const projectsModel = require('../models/projectsModel.js');

module.exports = {
    projectsAll(req, res, next){
        projectsModel.getAllProjects().then(proj => res.send(proj))
    },
    projectById(req, res, next){
        projectsModel.getProjectById(req.params.id).then(proj => res.send(proj))
    },
}