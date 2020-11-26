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

// router.get('/all', (req, res) => res.send('dd'))
// router.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));
router.get('/pepe', (req, res) => res.sendFile(__dirname + "/public/index.html"));
router.post('/all', projectsController.projectsAll)
router.get('/:id', projectsController.projectById)

module.exports = router;