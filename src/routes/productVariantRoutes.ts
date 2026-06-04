import { Router } from "express";
import { container } from "../config/ioc.config";
import { TYPES } from "../config/ioc.types";
import { ProductVariantController } from "../controllers/product-variant.controller";
import asyncHandler from "../middleware/asyncHandler.middleware";
import { authenticateToken } from "../middleware/authentication.middleware";
import { validate } from "../middleware/validate";
import { createProductVariantSchema, updateProductVariantSchema } from "../schemas/productVariantSchema";

const productVariantRouter = Router();
const productVariantController = container.get<ProductVariantController>(TYPES.ProductVariantController);

/**
 * @swagger
 * tags:
 *   - name: ProductVariant
 *     description: Product Variant Management
 */

/**
 * @swagger
 * /product-variants:
 *   get:
 *     summary: Get all product variants
 *     tags: [ProductVariant]
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
 *         required: false
 *         description: Page number for pagination (optional)
 *       - in: query
 *         name: recordPerPage
 *         schema:
 *           type: integer
 *         required: false
 *         description: Number of records per page (optional)
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         required: false
 *         description: Search term to filter product variants (optional)
 *       - in: query
 *         name: productId
 *         schema:
 *           type: integer
 *         required: false
 *         description: Filter by product ID (optional)
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [Published, Draft, Trash]
 *         required: false
 *         description: Filter by status (optional)
 *       - in: query
 *         name: showAllRecords
 *         schema:
 *           type: boolean
 *         required: false
 *         description: Show all records without pagination (optional)
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date-time
 *         required: false
 *         description: Filter by start date (optional)
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date-time
 *         required: false
 *         description: Filter by end date (optional)
 *     responses:
 *       200:
 *         description: Product variants fetched successfully
 */
productVariantRouter.get("/", authenticateToken, asyncHandler(productVariantController.getAll));

/**
 * @swagger
 * /product-variants/product/{productId}:
 *   get:
 *     summary: Get variants by product ID
 *     tags: [ProductVariant]
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
 *         name: productId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product variants fetched successfully
 */
productVariantRouter.get("/product/:productId", authenticateToken, asyncHandler(productVariantController.getByProductId));

/**
 * @swagger
 * /product-variants/{id}:
 *   get:
 *     summary: Get product variant by ID
 *     tags: [ProductVariant]
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
 *         description: Product variant fetched successfully
 *       404:
 *         description: Product variant not found
 */
productVariantRouter.get("/:id", authenticateToken, asyncHandler(productVariantController.getById));

/**
 * @swagger
 * /product-variants:
 *   post:
 *     summary: Create a new product variant
 *     tags: [ProductVariant]
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
 *             required: [productId]
 *             properties:
 *               name:
 *                 type: string
 *                 description: Variant display name (optional)
 *               slug:
 *                 type: string
 *                 description: Unique slug (optional)
 *               productId:
 *                 type: integer
 *                 description: Parent product ID (required)
 *               brandNameId:
 *                 type: integer
 *               attributeId:
 *                 type: integer
 *               productAttributeId:
 *                 type: integer
 *               cost:
 *                 type: number
 *                 description: Cost value (optional)
 *               Price:
 *                 type: number
 *                 description: Selling price (note: field name is `Price` in DB)
 *               extraPrice:
 *                 type: number
 *               lowStockThreshold:
 *                 type: integer
 *               stock:
 *                 type: integer
 *               extraSku:
 *                 type: string
 *               size:
 *                 type: string
 *               material:
 *                 type: string
 *               voltage:
 *                 type: string
 *               color:
 *                 type: string
 *               isDefault:
 *                 type: boolean
 *               status:
 *                 type: string
 *                 enum: [Published, Draft, Trash]
 *               displayOrder:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Product variant created successfully
 *     description: Creates a new product variant. The `storeCode` is automatically taken from the authenticated user's token or derived from the parent product.
 */
productVariantRouter.post("/", authenticateToken, validate(createProductVariantSchema), asyncHandler(productVariantController.create));

/**
 * @swagger
 * /product-variants/{id}:
 *   put:
 *     summary: Update a product variant
 *     tags: [ProductVariant]
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
 *               productId:
 *                 type: integer
 *               brandNameId:
 *                 type: integer
 *               attributeId:
 *                 type: integer
 *               productAttributeId:
 *                 type: integer
 *               cost:
 *                 type: number
 *               Price:
 *                 type: number
 *               extraPrice:
 *                 type: number
 *               lowStockThreshold:
 *                 type: integer
 *               stock:
 *                 type: integer
 *               extraSku:
 *                 type: string
 *               size:
 *                 type: string
 *               material:
 *                 type: string
 *               voltage:
 *                 type: string
 *               color:
 *                 type: string
 *               isDefault:
 *                 type: boolean
 *               status:
 *                 type: string
 *                 enum: [Published, Draft, Trash]
 *               displayOrder:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Product variant updated successfully
 */
productVariantRouter.put("/:id", authenticateToken, validate(updateProductVariantSchema), asyncHandler(productVariantController.update));

/**
 * @swagger
 * /product-variants/{id}:
 *   delete:
 *     summary: Delete a product variant
 *     tags: [ProductVariant]
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
 *         description: Product variant deleted successfully
 */
productVariantRouter.delete("/:id", authenticateToken, asyncHandler(productVariantController.delete));

export default productVariantRouter;
