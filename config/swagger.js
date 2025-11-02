import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import pkg from './package.json' assert { type: 'json' };

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Librairie de Jeux Vidéo',
      version: pkg.version,
      description: 'Documentation de l’API LibrairieJV (Node.js, Express, Sequelize, Mongoose, Docker)',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Serveur local',
      },
    ],
  },
  // 👉 indique où chercher les annotations JSDoc
  apis: ['./routes/*.js', './controllers/*.js', './models/*.js'],
};

export const swaggerSpec = swaggerJsdoc(options);

export function setupSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
