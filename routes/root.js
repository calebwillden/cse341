// SOURCE: Partially based on code by Nathan Birch
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send(
        "Hello, World! This is Caleb Willden's web server. Caleb Willden is someone I know, because he is me."
    );
});

module.exports = router;
