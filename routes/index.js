// SOURCE: This file is based on code by Nathan Birch seen at https://www.youtube.com/watch?v=68ubggfsQlE
const express = require('express');
const router = express.Router();

router.use('/contacts', require('./contacts'));
router.use('/', require('./root'));

module.exports = router;
