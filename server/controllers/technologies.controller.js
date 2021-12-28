const TechnologiesModel = require('../models/technologies.model.js');

module.exports = {
  technologiesAll(req, res, next){
    TechnologiesModel.getAllTechnologies().then(proj => res.send(proj))
  }
}
