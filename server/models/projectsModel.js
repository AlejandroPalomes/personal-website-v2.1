const { Op, fn, col, Sequelize, QueryTypes } = require('sequelize');
const Categories = require('../sequelizers/categories');
const Images = require('../sequelizers/images')
const Projects = require('../sequelizers/projects');
const Project_Images = require('../sequelizers/project_images');
const Project_Tech = require('../sequelizers/project_tech')
const Technologies = require('../sequelizers/technologies');
const db = require('../config/db-connect');

module.exports = {
  getAllProjects(){
    return new Promise ((resolve, reject) => {
      Projects.findAll({
        attributes: ['ID', 'title', 'description', 'repo', 'preview'],
        include: [
          {
            model: Technologies,
            attributes: ['name']
          },
          {
            model: Categories,
            attributes: ['name']
          }
        ],
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
  // getProjectsFiltered(category, technologies){
  //   return new Promise ((resolve, reject) => {
  //     Projects.findAll({
  //       attributes: ['ID', 'title', 'description', 'repo', 'preview'],
  //       include: [
  //         {
  //           model: Technologies,
  //           attributes: ['name'],
  //           where: technologies && { ID: { [Op.in]: technologies} }
  //         },
  //         {
  //           model: Categories,
  //           attributes: ['name'],
  //           where: category && { ID: category }
  //         }
  //       ],
  //       where: {
  //         show: 1
  //       },
  //       group: 'title'
  //     })
  //       .then(proj => resolve(proj))
  //       .catch(err => {
  //         console.log(err);
  //         reject(err);
  //       })
  //   })
  // },
  getProjectsFiltered(categories, technologies){
    return new Promise ((resolve, reject) => {
      db.query(`SELECT p.ID, p.title, p.description, p.description, p.preview, GROUP_CONCAT(pt.tech_id) as technologies
      FROM projects p
      LEFT JOIN project_tech as pt ON p.ID = pt.project_id LEFT JOIN technologies t ON t.ID=pt.tech_id AND t.ID IN (${technologies})
      WHERE p.show = TRUE
      GROUP BY p.ID,p.title
      HAVING COUNT(pt.tech_id) >= COUNT(t.ID) AND COUNT(t.ID) = ${technologies.length}`,
      {
        type: QueryTypes.SELECT,
        raw: true,
        plain: false,
        logging: console.log,
        nest: true,
      }
      )
        .then(proj => { console.log('projects: ', proj); return resolve(proj); })
        .catch(err => {
          console.log(err);
          reject(err);
        })
    })
  },
  getProjectById(id){
    return new Promise ((resolve, reject) => {
      Projects.findAll({
        attributes: ['ID', 'title', 'description', 'collaborators', 'completion_date', 'repo', 'preview'],
        include: [
          {
            model: Technologies,
            // required: true,
            attributes: ['name']
          },
          {
            model: Categories,
            // required: true,
            attributes: ['name']
          }
        ],
        where:{
          ID: id,
          show: 1
        }
      })
        .then(proj => resolve({
            ...proj[0].dataValues,
            technologies: proj[0].dataValues.technologies.map(technology => technology.name),
            categories: proj[0].dataValues.categories.map(category => category.name),
          })
        )
        .catch(err => {
          console.log(err);
          reject(err);
        })
    })
  }
}

// FILTER by CODINGLANGID --> NO auth required
//     getProjectsByCodingLangsIds: async (codingLangsIds, response) => {
//           try{
//               const projects = await Sequelize.query(
//                   `SELECT p.id, p.title, p.customer, GROUP_CONCAT(pcl.codinglangId) as codinglangs
//                   FROM projects p
//                   LEFT JOIN project_codingLangs as pcl ON p.id = pcl.projectId LEFT JOIN codinglangs cl ON cl.id=pcl.codinglangId AND cl.id IN (${codingLangsIds})
//                   WHERE p.show = TRUE
//                   GROUP BY p.id,p.title
//                   HAVING COUNT(pcl.codinglangId) >= COUNT(cl.id) AND COUNT(cl.id) = ${codingLangsIds.length}`,
//                   {
//                       type: QueryTypes.SELECT,
//                       raw: true,
//                       plain: false,
//                       logging: console.log,
//                       nest: true,
//                   }
//               )
//               response(null, projects)
//           }catch(err){
//               response(err, null)
//           }
//       },
