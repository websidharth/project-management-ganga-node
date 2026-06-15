
const port = process.env.PORT || 4000;

// Determine the server URL used in Swagger UI. When deployed on Vercel,
// VERCEL_URL is set to <project>.vercel.app. Prefer an explicit PUBLIC_URL
// if provided (useful for custom domains). Fallback to localhost for dev.
//const publicUrl = 'https://backend-ruddy-tau-76.vercel.app/docs';

export const swaggerOptions = {
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
    // Use a relative server URL so Swagger UI uses the current origin.
    // This avoids localhost being embedded at build time when deployed to Vercel.
    // servers: [{ url: '/' }],
    components: {
      securitySchemes: {
        bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      },
      // --- MOVED SCHEMAS INSIDE COMPONENTS ---
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'STU-2025-1234' },
            name: { type: 'string', example: 'John Doe' },
            email: { type: 'string', example: 'john@example.com' },
            role: {
              type: 'string',
              enum: ['ADMIN', 'STUDENT'],
              example: 'STUDENT',
            },
          },
        },
        LoginRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string' },
            password: { type: 'string' },
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
  apis: [
    './src/routes/*.ts',
    './src/routes/*.js',
    './dist/routes/*.js',
    './api/*.ts', // if vercel uses api folder
  ],
};
