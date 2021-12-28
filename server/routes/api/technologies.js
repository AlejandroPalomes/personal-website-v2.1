const express = require('express');
const TechnologiesController = require('../../controllers/technologies.controller.js');

const router = express.Router();

router.get('/all', TechnologiesController.technologiesAll)

module.exports = router;
