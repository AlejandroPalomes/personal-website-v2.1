const categoriesModel = require('../models/categoriesModel.js');

module.exports = {
    categoriesAll(req, res, next){
        categoriesModel.getAllCategories().then(proj => res.send(proj))
    }
    // projectById(req, res, next){
    //     categoriesModel.getProjectById(req.params.id).then(proj => res.send(proj))
    // },
}
