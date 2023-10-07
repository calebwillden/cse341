// Include .env vars
const dotenv = require('dotenv');
dotenv.config();

// Setup swaggerAutogen
const swaggerAutogen = require('swagger-autogen')();
let host = 'cse341-b19z.onrender.com';
const endpointsFiles = ['../server.js'];

// Create deployable swagger JSON
let deployedDoc = {
    info: {
        title: 'Contacts API',
        description: 'This API returns contact information stored in a test database.'
    },
    host: host,
    schemes: ['http', 'https'],
    tags: ['Contacts'],
    definitions: {
        id: '650f46b8270b40a1fb152952',
        ContactOutput: {
            firstName: 'Caleb',
            lastName: 'Willden',
            email: 'wil17001@byui.edu',
            favoriteColor: 'blue',
            birthday: '1997-04-11T00:00:00.000Z',
            __v: 0
        },
        ContactInput: {
            firstName: 'Caleb',
            lastName: 'Willden',
            email: 'wil17001@byui.edu',
            favoriteColor: 'blue',
            birthday: '1997-04-11T00:00:00.000Z'
        },
        ContactArrayOutput: [{ $ref: '#/definitions/ContactInput' }]
    }
};
const deployedOutputFile = './swagger-output.json';

swaggerAutogen(deployedOutputFile, endpointsFiles, deployedDoc);

// Create dev swagger JSON
let devDoc = deployedDoc;
devDoc.host = `localhost:${process.env.PORT}`; // Change the host
const localOutputFile = './swagger-output-dev.json'; // Change the output file

swaggerAutogen(localOutputFile, endpointsFiles, devDoc).then(() => {
    // Run the server
    require('../server.js');
});
