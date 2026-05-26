import { Router } from 'express';
import { container } from '../config/ioc.config';
import { TYPES } from '../config/ioc.types';
import { ProductController } from '../controllers/product.controller';
import asyncHandler from '../middleware/asyncHandler.middleware';
import { authenticateToken } from '../middleware/authentication.middleware';
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
 *       - in: header
 *         name: clientId
 *         schema:
 *           type: string
 *         required: true
 *         description: Enter Client Id
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: recordPerPage
 *         schema:
 *           type: integer
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by name or SKU
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: integer
 *       - in: query
 *         name: brandNameId
 *         schema:
 *           type: integer
 *       - in: query
 *         name: storeId
 *         schema:
 *           type: integer
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [Published, Draft, Trash]
 *       - in: query
 *         name: showAllRecords
 *         schema:
 *           type: boolean
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date-time
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date-time
 *     responses:
 *       200:
 *         description: Products fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalRecord:
 *                       type: integer
 *                     data:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Product'
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
 *       - in: header
 *         name: clientId
 *         schema:
 *           type: string
 *         required: true
 *         description: Enter Client Id
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
 *       - in: header
 *         name: clientId
 *         schema:
 *           type: string
 *         required: true
 *         description: Enter Client Id
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Product'
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
 *     parameters:
 *       - in: header
 *         name: clientId
 *         schema:
 *           type: string
 *         required: true
 *         description: Enter Client Id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateProductRequest'
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Product'
 */
productRouter.post('/', authenticateToken, validate(createProductSchema), asyncHandler(productController.create));

/**
* @swagger
* /products:
*   post:
*     summary: Create a new product
*     tags: [Product]
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: header
*         name: clientId
*         schema:
*           type: string
*         required: true
*         description: Enter Client Id
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             required:
*               - name
*               - slug
*               - sku
*               - price
*               - categoryId
*             properties:
*               name:
*                 type: string
*                 minLength: 1
*                 example: "iPhone 15 Pro"
*                 description: Product name (required)
*               slug:
*                 type: string
*                 minLength: 1
*                 example: "iphone-15-pro"
*                 description: URL-friendly slug (required, unique)
*               description:
*                 type: string
*                 example: "Latest iPhone with A17 Pro chip"
*                 description: Product description (optional)
*               sku:
*                 type: string
*                 minLength: 1
*                 example: "IP15P-256-BLK"
*                 description: Stock Keeping Unit (required, unique)
*               price:
*                 type: number
*                 minimum: 0
*                 example: 999.99
*                 description: Selling price (required, must be >= 0)
*               cost:
*                 type: number
*                 minimum: 0
*                 example: 750.00
*                 description: Cost price (optional, must be >= 0)
*               stock:
*                 type: integer
*                 minimum: 0
*                 example: 50
*                 description: Available stock quantity (optional)
*               lowStockThreshold:
*                 type: integer
*                 minimum: 0
*                 example: 10
*                 description: Alert when stock falls below this number (optional)
*               categoryId:
*                 type: integer
*                 minimum: 1
*                 example: 5
*                 description: Category ID (required, must be a valid category)
*               brandNameId:
*                 type: integer
*                 minimum: 1
*                 example: 3
*                 description: Brand ID (optional)
*               images:
*                 type: array
*                 items:
*                   type: string
*                 example: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"]
*                 description: Array of image URLs (optional)
*               status:
*                 type: string
*                 enum: [Published, Draft, Trash]
*                 example: "Draft"
*                 description: Product status (optional, defaults to Draft)
*           example:
*             name: "iPhone 15 Pro"
*             slug: "iphone-15-pro"
*             description: "Latest iPhone with A17 Pro chip and titanium design"
*             sku: "IP15P-256-BLK"
*             price: 999.99
*             cost: 750.00
*             stock: 50
*             lowStockThreshold: 10
*             categoryId: 5
*             brandNameId: 3
*             status: "Published"
*     responses:
*       201:
*         description: Product created successfully
*       400:
*         description: Validation error or store code not found
*       401:
*         description: Unauthorized - Invalid or missing token
*       409:
*         description: Conflict - SKU or slug already exists
*     description: Creates a new product. The storeCode and userId are automatically taken from the authenticated user's token.
*/
productRouter.post('/', authenticateToken, validate(createProductSchema), asyncHandler(productController.create));


/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product (soft delete — sets status to Trash)
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: clientId
 *         schema:
 *           type: string
 *         required: true
 *         description: Enter Client Id
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 */
productRouter.delete('/:id', authenticateToken, asyncHandler(productController.delete));

export default productRouter;
