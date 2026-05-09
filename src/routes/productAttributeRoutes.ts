import { Router } from "express";
import { container } from "../config/ioc.config";
import { TYPES } from "../config/ioc.types";
import { ProductAttributeController } from "../controllers/product-attribute.controller";
import asyncHandler from "../middleware/asyncHandler.middleware";
import { authenticateToken } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { createProductAttributeSchema, updateProductAttributeSchema } from "../schemas/productAttributeSchema";

const productAttributeRouter = Router();
const productAttributeController = container.get<ProductAttributeController>(TYPES.ProductAttributeController);

/**
 * @swagger
 * tags:
 *   - name: ProductAttribute
 *     description: Product Attribute Management
 */

/**
 * @swagger
 * /product-attributes/product/{productId}:
 *   get:
 *     summary: Get attributes by product ID
 *     tags: [ProductAttribute]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product attributes fetched successfully
 */
productAttributeRouter.get("/product/:productId", authenticateToken, asyncHandler(productAttributeController.getByProductId));

/**
 * @swagger
 * /product-attributes/{id}:
 *   get:
 *     summary: Get product attribute by ID
 *     tags: [ProductAttribute]
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
 *         description: Product attribute fetched successfully
 *       404:
 *         description: Product attribute not found
 */
productAttributeRouter.get("/:id", authenticateToken, asyncHandler(productAttributeController.getById));

/**
 * @swagger
 * /product-attributes:
 *   post:
 *     summary: Create a product attribute
 *     tags: [ProductAttribute]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [productId, attributeId, value]
 *             properties:
 *               productId:
 *                 type: integer
 *               attributeId:
 *                 type: integer
 *               value:
 *                 type: string
 *     responses:
 *       201:
 *         description: Product attribute created successfully
 */
productAttributeRouter.post("/", authenticateToken, validate(createProductAttributeSchema), asyncHandler(productAttributeController.create));

/**
 * @swagger
 * /product-attributes/{id}:
 *   put:
 *     summary: Update a product attribute
 *     tags: [ProductAttribute]
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
 *             required: [value]
 *             properties:
 *               value:
 *                 type: string
 *     responses:
 *       200:
 *         description: Product attribute updated successfully
 */
productAttributeRouter.put("/:id", authenticateToken, validate(updateProductAttributeSchema), asyncHandler(productAttributeController.update));

/**
 * @swagger
 * /product-attributes/{id}:
 *   delete:
 *     summary: Delete a product attribute
 *     tags: [ProductAttribute]
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
 *         description: Product attribute deleted successfully
 */
productAttributeRouter.delete("/:id", authenticateToken, asyncHandler(productAttributeController.delete));

export default productAttributeRouter;
