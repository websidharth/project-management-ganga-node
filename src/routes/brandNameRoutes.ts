import { Router } from "express";
import { container } from "../config/ioc.config";
import { TYPES } from "../config/ioc.types";
import { BrandNameController } from "../controllers/brand-name.controller";
import asyncHandler from "../middleware/asyncHandler.middleware";
import { authenticateToken } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { createBrandNameSchema, updateBrandNameSchema } from "../schemas/brandNameSchema";

const brandNameRouter = Router();
const brandNameController = container.get<BrandNameController>(TYPES.BrandNameController);

/**
 * @swagger
 * tags:
 *   - name: BrandName
 *     description: Brand Name Management
 */

/**
 * @swagger
 * /brand-names:
 *   get:
 *     summary: Get all brand names
 *     tags: [BrandName]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: clientId
 *         schema:
 *           type: string
 *         required: true
 *         description: Enter Client Id
 *     responses:
 *       200:
 *         description: Brand names fetched successfully
 */
brandNameRouter.get("/", authenticateToken, asyncHandler(brandNameController.getAll));

/**
 * @swagger
 * /brand-names/{id}:
 *   get:
 *     summary: Get brand name by ID
 *     tags: [BrandName]
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
 *         description: Brand name fetched successfully
 *       404:
 *         description: Brand name not found
 */
brandNameRouter.get("/:id", authenticateToken, asyncHandler(brandNameController.getById));

/**
 * @swagger
 * /brand-names:
 *   post:
 *     summary: Create a new brand name
 *     tags: [BrandName]
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
 *             required: [brandName]
 *             properties:
 *               brandName:
 *                 type: string
 *               status:
 *                 type: boolean
 *               displayOrder:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Brand name created successfully
 */
brandNameRouter.post("/", authenticateToken, validate(createBrandNameSchema), asyncHandler(brandNameController.create));

/**
 * @swagger
 * /brand-names/{id}:
 *   put:
 *     summary: Update a brand name
 *     tags: [BrandName]
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
 *               brandName:
 *                 type: string
 *               status:
 *                 type: boolean
 *               displayOrder:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Brand name updated successfully
 */
brandNameRouter.put("/:id", authenticateToken, validate(updateBrandNameSchema), asyncHandler(brandNameController.update));

/**
 * @swagger
 * /brand-names/{id}:
 *   delete:
 *     summary: Delete a brand name (soft delete)
 *     tags: [BrandName]
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
 *         description: Brand name deleted successfully
 */
brandNameRouter.delete("/:id", authenticateToken, asyncHandler(brandNameController.delete));

export default brandNameRouter;
