import { Router } from 'express';
import { container } from '../config/ioc.config';
import { TYPES } from '../config/ioc.types';
import { ProductController } from '../controllers/product.controller';
import asyncHandler from '../middleware/asyncHandler.middleware';
import { authenticateToken } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { createProductSchema, updateProductSchema } from '../schemas/productSchema';

const productRouter = Router();
const productController = container.get<ProductController>(TYPES.ProductController);

/**
 * @swagger
 * tags:
 *   - name: Product
 *     description: Product Management
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default:
 *         description:
 *       - in: query
 *         name: recordPerPage
 *         schema:
 *           type: integer
 *           default:
 *         description:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description:
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: integer
 *         description:
 *       - in: query
 *         name: status
 *         schema:
 *           type: boolean
 *         description:
 *       - in: query
 *         name: showAllRecords
 *         schema:
 *           type: boolean
 *         description:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date-time
 *         description:
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date-time
 *         description:
 *     responses:
 *       200:
 *         description: Products fetched successfully
 */
productRouter.get('/', authenticateToken, asyncHandler(productController.getAll));

/**
 * @swagger
 * /products/slug/{slug}:
 *   get:
 *     summary: Get product by slug
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product fetched successfully
 *       404:
 *         description: Product not found
 */
productRouter.get('/slug/:slug', authenticateToken, asyncHandler(productController.getBySlug));

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product fetched successfully
 *       404:
 *         description: Product not found
 */
productRouter.get('/:id', authenticateToken, asyncHandler(productController.getById));

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, slug, sku, price, categoryId]
 *             properties:
 *               name:
 *                 type: string
 *               slug:
 *                 type: string
 *               description:
 *                 type: string
 *               sku:
 *                 type: string
 *               price:
 *                 type: number
 *               cost:
 *                 type: number
 *               stock:
 *                 type: integer
 *               lowStockThreshold:
 *                 type: integer
 *               categoryId:
 *                 type: integer
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *               status:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Product created successfully
 */
productRouter.post('/', authenticateToken, validate(createProductSchema), asyncHandler(productController.create));

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update a product
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               slug:
 *                 type: string
 *               description:
 *                 type: string
 *               sku:
 *                 type: string
 *               price:
 *                 type: number
 *               cost:
 *                 type: number
 *               stock:
 *                 type: integer
 *               lowStockThreshold:
 *                 type: integer
 *               categoryId:
 *                 type: integer
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *               status:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Product updated successfully
 */
productRouter.put('/:id', authenticateToken, validate(updateProductSchema), asyncHandler(productController.update));

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product deleted successfully
 */
productRouter.delete('/:id', authenticateToken, asyncHandler(productController.delete));

export default productRouter;
