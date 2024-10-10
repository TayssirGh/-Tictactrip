import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API pour justification du text',
            version: '1.0.0',
            description: 'API pour justification du text et génération du token ',
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    in: 'header',
                    name: 'Authorization',
                    description: 'Bearer token to access these api endpoints',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                BearerAuth: [],
            },
        ],
        servers: [
            {
                url: 'http://168.63.104.167:80/api',
            },
        ],
    },
    apis: ['./src/routes/ApiRoutes.ts', './src/controllers/*.ts'],
};

const SwaggerSpec = swaggerJsDoc(options);

export function setupSwagger(app: Express) {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(SwaggerSpec));
    console.log('Swagger docs available at http://168.63.104.167:80/api-docs');
}
