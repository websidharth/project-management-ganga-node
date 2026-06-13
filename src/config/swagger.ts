import path from 'path';
import swaggerJsdoc from 'swagger-jsdoc';

const isProduction = process.env.NODE_ENV === 'production';

const routeFiles = isProduction
  ? [path.join(process.cwd(), 'dist/routes/*.js')]
  : [path.join(process.cwd(), 'src/routes/*.ts')];

export const swaggerOptions: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TCI API 🏨',
      version: '1.0.0',
      description: 'API documentation for TCI Platform',
    },

    tags: [
      { name: 'Account', description: 'Authentication endpoints' },
      { name: 'User', description: 'User endpoints' },
      { name: 'HealthCheck', description: 'Health check endpoints' },
      { name: 'Category', description: 'Category endpoints' },
      { name: 'Product', description: 'Product endpoints' },
      { name: 'Attribute', description: 'Attribute endpoints' },
      { name: 'Dashboard', description: 'Dashboard endpoints' },
      { name: 'BrandName', description: 'Brand name endpoints' },
      { name: 'Staff', description: 'Staff endpoints' },
      { name: 'StaffAttendance', description: 'Staff attendance endpoints' },
      { name: 'Order', description: 'Order endpoints' },
      { name: 'OrderItem', description: 'Order item endpoints' },
      { name: 'Payment', description: 'Payment endpoints' },
      { name: 'StaffSalary', description: 'Staff salary endpoints' },
    ],

    servers: [
      {
        url: 'http://localhost:4000',
        description: 'Local Development Server',
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },

      schemas: {
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: 'USR-2025-0001',
            },
            name: {
              type: 'string',
              example: 'John Doe',
            },
            email: {
              type: 'string',
              example: 'john@example.com',
            },
            role: {
              type: 'string',
              enum: ['ADMIN', 'USER'],
              example: 'USER',
            },
          },
        },

        LoginRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              example: 'admin@example.com',
            },
            password: {
              type: 'string',
              example: '123456',
            },
          },
        },

        Product: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1,
            },
            name: {
              type: 'string',
              example: 'iPhone 15 Pro',
            },
            slug: {
              type: 'string',
              example: 'iphone-15-pro',
            },
            description: {
              type: 'string',
              example: 'Latest Apple flagship device',
            },
            sku: {
              type: 'string',
              example: 'IPH15PRO256',
            },
            price: {
              type: 'number',
              example: 129999,
            },
            stock: {
              type: 'integer',
              example: 50,
            },
            status: {
              type: 'string',
              enum: ['Published', 'Draft', 'Trash'],
              example: 'Published',
            },
          },
        },

        CreateProductRequest: {
          type: 'object',
          required: ['name', 'slug', 'sku', 'price'],
          properties: {
            name: {
              type: 'string',
            },
            slug: {
              type: 'string',
            },
            description: {
              type: 'string',
            },
            sku: {
              type: 'string',
            },
            price: {
              type: 'number',
            },
            stock: {
              type: 'integer',
            },
            categoryId: {
              type: 'integer',
            },
            status: {
              type: 'string',
              enum: ['Published', 'Draft', 'Trash'],
            },
          },
        },
      },
    },

    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  apis: routeFiles,
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);