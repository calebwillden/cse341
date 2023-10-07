// Swagger Autogen Setup
const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Contacts API',
        description: 'This API returns contact information stored in a test database.'
    },
    host: 'cse341-b19z.onrender.com',
    schemes: ['https'],
    tags: ['Contacts'],
    definitions: {
        id: '650f46b8270b40a1fb152952',
        ContactInput: {
            firstName: 'Caleb',
            lastName: 'Willden',
            email: 'wil17001@byui.edu',
            favoriteColor: 'blue',
            birthday: '1997-04-11T00:00:00.000Z'
        },
        ContactOutput: {
            _id: '650f46b8270b40a1fb152952',
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
