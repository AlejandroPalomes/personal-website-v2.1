const categoriesModel = require('../models/categoriesModel.js');

module.exports = {
  categoriesAll(req, res, next){
    categoriesModel.getAllCategories().then(proj => res.send(proj))
  }
}
