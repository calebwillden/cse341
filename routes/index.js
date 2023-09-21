// SOURCE: Partially based on code by Nathan Birch
const express = require('express');
const router = express.Router();

router.use('/', require('./root'));

module.exports = router;
