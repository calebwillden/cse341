const express = require('express');
const router = express.Router();

const controller = require('../controllers/contact.js');

router.get('/', controller.getAll);
router.post('/create', controller.create);
router.get('/:id', controller.getById);

module.exports = router;
