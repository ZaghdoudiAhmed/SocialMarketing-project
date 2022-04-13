const express = require('express');
const router = express.Router();
const filterController = require('../controllers/filterController');

router.get('/product/search', filterController.searchByQueryType);

module.exports = router;