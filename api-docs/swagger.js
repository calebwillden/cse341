// Include .env vars
const dotenv = require('dotenv');
dotenv.config();

// Setup swaggerAutogen
const swaggerAutogen = require('swagger-autogen')();
const host = 'cse341-b19z.onrender.com'; // TODO: Move to a config file?
const schemes = ['https'];
const endpointsFiles = ['../server.js'];

// Create deployable swagger JSON
let doc = {
    info: {
        title: 'Contacts API',
        description: 'This API returns contact information stored in a test database.'
    },
    host: host,
    schemes: schemes,
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
const deployedSwaggerJsonFilePath = './api-docs/swagger-output.json';
const devSwaggerJsonFilePath = './api-docs/swagger-output-dev.json';

swaggerAutogen(deployedSwaggerJsonFilePath, endpointsFiles, doc).then(() => {
    // Create a Dev swagger JSON
    // Copy the JSON file
    const fs = require('fs');
    const deployedSwaggerJsonFileData = fs.readFileSync(deployedSwaggerJsonFilePath, 'utf8');
    const deployedSwaggerJson = JSON.parse(deployedSwaggerJsonFileData);
    const devSwaggerJson = Object.assign({}, deployedSwaggerJson);

    // Modify the host and scheme
    devSwaggerJson.host = `localhost:${process.env.PORT}`;
    devSwaggerJson.schemes = ['http'];

    // Save it to a new file
    fs.writeFileSync(devSwaggerJsonFilePath, JSON.stringify(devSwaggerJson));

    // Run the server
    require('../server.js');
});
