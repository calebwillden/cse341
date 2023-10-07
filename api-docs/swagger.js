// Add 'dev' when running the script to make it compatible for a local run.
// Otherwise, it'll generate to operate on Render.
const mode = process.argv[2];
let host = mode == 'dev' ? 'localhost:8080' : 'cse341-b19z.onrender.com';
let scheme = mode == 'dev' ? 'http' : 'https';

// Swagger Autogen Setup
const swaggerAutogen = require('swagger-autogen')();
const doc = {
    info: {
        title: 'Contacts API',
        description: 'This API returns contact information stored in a test database.'
    },
    host: host,
    schemes: [scheme],
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
const outputFile = './swagger-output.json';
const endpointsFiles = ['../server.js'];

// Output the Swagger.JSON file and run the server
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('../server.js');
});
