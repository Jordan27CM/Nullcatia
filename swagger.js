// swagger.js
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Configuración de la documentación
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Nullcatia',
      version: '1.0.0',
      description: 'Documentación de la API RESTful para clanes, gatos.',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor local',
      },
    ],
  },
  apis: ['./routes/*.js'], // Aquí le indicas dónde buscar los comentarios con documentación
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs
};
