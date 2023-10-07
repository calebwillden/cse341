const router = require('express').Router();

// Get a different swagger JSON for dev vs deployed environent
const swaggerUi = require('swagger-ui-express');
const swaggerDocumentPath =
    process.env.HOST == 'localhost'
        ? '../api-docs/swagger-output-dev.json'
        : '../api-docs/swagger-output.json';
const swaggerDocument = require(swaggerDocumentPath);

// Middleware to prepare swaggerUI
router.use('/', swaggerUi.serve);

// Route to access the documentation
router.get(
    '/',
    swaggerUi.setup(swaggerDocument)
    // #swagger.ignore = true
);

module.exports = router;
