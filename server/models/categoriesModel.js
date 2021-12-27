const Categories = require('../sequelizers/categories');

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
