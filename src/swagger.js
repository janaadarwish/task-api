const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Task API',
            version: '1.0.0',
            description: 'A simple CRUD API for managing tasks'
        },
        servers: [
            { url: 'http://localhost:3000', description: 'Local server' }
        ]
    },
    apis: ['./src/route.js']
};

module.exports = swaggerJsdoc(options);