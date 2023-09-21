/*******************************************************************************
 * Dependencies
 *******************************************************************************/
const Express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

/*******************************************************************************
 * Start Express and Cors
 *******************************************************************************/
const app = new Express();
app.use(bodyParser.json());
app.use(cors());

/*******************************************************************************
 * Connection
 *******************************************************************************/
const port = process.env.PORT;

/*******************************************************************************
 * Routes
 *******************************************************************************/
app.get('/', (req, res) => {
    res.send(
        "Hello, World! This is Caleb Willden's web server. Caleb Willden is someone I know, because he is me."
    );
});

/*******************************************************************************
 * Listener
 *******************************************************************************/
app.listen(port, async () => {
    try {
        console.log(`Listening at port ${port}`);
    } catch (e) {
        console.log(e);
    }
});
