const express = require('express');
const categoriesController = require('../../controllers/categoriesController');

const router = express.Router();

router.get('/all', categoriesController.categoriesAll)

module.exports = router;