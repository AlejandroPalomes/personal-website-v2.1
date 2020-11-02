const express = require('express');
// const mysql = require('mysql');
// const db = require('../../config/db-connect')
// const Projects = require('../../sequelizers/projects')
// const Technologies = require('../../sequelizers/technologies')
// const Project_Tech = require('../../sequelizers/project_tech')
// const Images = require('../../sequelizers/images')
// const Project_Images = require('../../sequelizers/project_images');
const projectsController = require('../../controllers/projectsController');

const router = express.Router();

router.get('/all', projectsController.projectsAll)
router.get('/:id', projectsController.projectById)

module.exports = router;