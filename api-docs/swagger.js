const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Contacts API',
        description: 'This API returns contact information stored in a test database.'
    },
    host: 'localhost:8080',
    schemes: ['http'],
    definitions: {
        Contact: {
            firstName: 'Caleb',
            lastName: 'Willden',
            email: 'wil17001@byui.edu',
            favoriteColor: 'blue',
            birthday: '1997-04-11T00:00:00.000Z'
        }
    }
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['../server.js'];

// Output the Swagger.JSON file and run the server
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('../server.js');
});
