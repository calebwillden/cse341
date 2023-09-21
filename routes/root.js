// SOURCE: Partially based on code by Nathan Birch
const express = require('express');
const router = express.Router();

const rootController = require('../controllers/root.js');

router.get('/', rootController.getName);

module.exports = router;
