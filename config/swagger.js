/*
-----------------------------------------------------------------------------------------------------------------------
file name           :   swagger.js
author              :   Joel Cunha Faria
creation date       :   24.08.2026
modification date   :   04.09.2026
-----------------------------------------------------------------------------------------------------------------------
*/
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Products API',
            version: '1.0.0',
            description: 'RESTful API for product management (SQLite, Express).'
        },
        servers: [
            { url: 'http://localhost:3000', description: 'Local dev server' }
        ]
    },
    apis: ['./routes/*.js', './controllers/*.js'] // pick up JSDoc in routes/controllers
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;