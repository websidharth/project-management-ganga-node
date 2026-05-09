import { Router } from "express";
import { container } from "../config/ioc.config";
import { TYPES } from "../config/ioc.types";
import { AttributeController } from "../controllers/attribute.controller";
import asyncHandler from "../middleware/asyncHandler.middleware";
import { authenticateToken } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { createAttributeSchema, updateAttributeSchema } from "../schemas/attributeSchema";

const attributeRouter = Router();
const attributeController = container.get<AttributeController>(TYPES.AttributeController);

/**
 * @swagger
 * tags:
 *   - name: Attribute
 *     description: Attribute Management
 */

/**
 * @swagger
 * /attributes:
 *   get:
 *     summary: Get all attributes
 *     tags: [Attribute]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Attributes fetched successfully
 */
attributeRouter.get("/", authenticateToken, asyncHandler(attributeController.getAll));

/**
 * @swagger
 * /attributes/{id}:
 *   get:
 *     summary: Get attribute by ID
 *     tags: [Attribute]
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
 *         description: Attribute fetched successfully
 *       404:
 *         description: Attribute not found
 */
attributeRouter.get("/:id", authenticateToken, asyncHandler(attributeController.getById));

/**
 * @swagger
 * /attributes:
 *   post:
 *     summary: Create a new attribute
 *     tags: [Attribute]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *               unit:
 *                 type: string
 *     responses:
 *       201:
 *         description: Attribute created successfully
 */
attributeRouter.post("/", authenticateToken, validate(createAttributeSchema), asyncHandler(attributeController.create));

/**
 * @swagger
 * /attributes/{id}:
 *   put:
 *     summary: Update an attribute
 *     tags: [Attribute]
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
 *               unit:
 *                 type: string
 *     responses:
 *       200:
 *         description: Attribute updated successfully
 */
attributeRouter.put("/:id", authenticateToken, validate(updateAttributeSchema), asyncHandler(attributeController.update));

/**
 * @swagger
 * /attributes/{id}:
 *   delete:
 *     summary: Delete an attribute
 *     tags: [Attribute]
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
 *         description: Attribute deleted successfully
 */
attributeRouter.delete("/:id", authenticateToken, asyncHandler(attributeController.delete));

export default attributeRouter;
