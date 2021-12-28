const Technologies = require('../sequelizers/technologies');

module.exports = {
  getAllTechnologies(){
    return new Promise ((resolve, reject) => {
      Technologies.findAll({
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
