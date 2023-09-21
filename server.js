// SOURCE: Based on code by Nathan Birch combined with my own modifications

/*******************************************************************************
 * Dependencies
 *******************************************************************************/
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

/*******************************************************************************
 * Express
 *******************************************************************************/
dotenv.config(); // TO-DO: Implement in a /db/connect.js file
const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use('/', require('./routes'));

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
