const express = require('express');
const router = express.Router();

const contactController = require('../controllers/contact.js');

router.get('/', contactController.getAllContacts);
router.get('/:contactId', contactController.getContactById);
router.post('/create', contactController.createContact);

module.exports = router;
