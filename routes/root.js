// SOURCE: This file is based on code by Nathan Birch seen at https://www.youtube.com/watch?v=68ubggfsQlE
const express = require('express');
const router = express.Router();

const rootController = require('../controllers/root.js');

router.get('/', rootController.getName);

module.exports = router;
