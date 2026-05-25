import { Router } from 'express';
import { authenticateToken } from '../middleware/authentication.middleware';
import { container } from '../config/ioc.config';
import { TYPES } from '../config/ioc.types';
import { UserController } from '../controllers/user.controller';
import asyncHandler from '../middleware/asyncHandler.middleware';

const userRouter = Router();
const usersController = container.get<UserController>(TYPES.UserController);

/**
 * @swagger
 * tags:
 *     - name: User
 *       description: User Management
 */

/**
 * @swagger
 * /users/:
 *   get:
 *     summary: Get all users
 *     tags: [User]
 *     parameters:
 *       - in: header
 *         name: clientId
 *         schema:
 *           type: string
 *         required: true
 *         description: Enter Client Id
 *     responses:
 *       200:
 *         description: List of all users
 */

userRouter.get('/', authenticateToken, asyncHandler(usersController.getAllUsers));

/**
 * @swagger
 * /users/email/{email}:
 *   get:
 *     summary: Get a user by email
 *     tags: [User]
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
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         example: websidharth@gmail.com
 *         description: The user email
 *     responses:
 *       200:
 *         description: The user description by email
 *       404:
 *         description: User not found
 */
userRouter.get('/email/:email', authenticateToken, usersController.getUserByEmail);

/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [User]
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
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: The user description by id
 *       404:
 *         description: User not found
 */
userRouter.get('/:userId', authenticateToken, asyncHandler(usersController.getUserById));

/**
 * @swagger
 * /users/status/{userId}:
 *   put:
 *     summary: Update User
 *     tags: [User]
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
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: User updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
userRouter.put('/status/:userId', authenticateToken, asyncHandler(usersController.updateStatusById));

/**
 * @swagger
 * /users/{userId}:
 *   put:
 *     summary: Update User
 *     tags: [User]
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
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               userName:
 *                 type: string
 *               password:
 *                 type: string
 *               phone:
 *                 type: string
 *               profileImageUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */

userRouter.put('/:userId', authenticateToken, asyncHandler(usersController.updateUserById));

/**
 * @swagger
 * /users/{userId}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [User]
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
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: The user description by id
 *       404:
 *         description: User not found
 */

userRouter.delete('/:userId', authenticateToken, asyncHandler(usersController.deleteUserById));

/**
 * @swagger
 * /users/assign-store:
 *   patch:
 *     summary: Assign a store to the authenticated user
 *     tags: [User]
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
 *               - storeId
 *             properties:
 *               storeId:
 *                 type: number
 *                 example: 1
 *                 description: The ID of the store to assign
 *     responses:
 *       200:
 *         description: Store assigned successfully
 *       400:
 *         description: Bad request - missing storeId
 *       404:
 *         description: Store not found
 *       401:
 *         description: Unauthorized
 */
userRouter.patch('/assign-store', authenticateToken, asyncHandler(usersController.assignStore));

export default userRouter;
