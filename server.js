/*******************************************************************************
 * Dependencies
 *******************************************************************************/
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

/*******************************************************************************
 * Express
 *******************************************************************************/
dotenv.config(); // TO-DO: Implement this in a /db/connect.js file
const port = process.env.PORT || 3000;
const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cse341-caleb-willden.aw05k4k.mongodb.net/`;
const app = express();

// TODO: Add a config folder and move the URI and env variable import to a db.config.js folder
/*const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  url: process.env.MONGODB_URI,
};
*/

/*******************************************************************************
 * Swagger — Documentation generation
 *******************************************************************************/
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./api-docs/swagger-output.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/*******************************************************************************
 * Body Parser, Cors, and Router
 *******************************************************************************/
app.use(bodyParser.json());
app.use(cors());
app.use('/', require('./routes')); // SOURCE: This line is based on code by Nathan Birch seen at https://www.youtube.com/watch?v=68ubggfsQlE

/*******************************************************************************
 * Listener
 *******************************************************************************/
app.listen(port, async () => {
    try {
        await mongoose.connect(uri);
        console.log('Connected to database!');
    } catch (e) {
        console.log(e);
    }
    console.log(`Listening at port ${port}...`);
});
