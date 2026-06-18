import { Router } from 'express';
import { authenticateToken } from '../middleware/authentication.middleware';
import { container } from '../config/ioc.config';
import { TYPES } from '../config/ioc.types';
import { UserController } from '../controllers/user.controller';
import asyncHandler from '../middleware/asyncHandler.middleware';
import { Role } from '../enum/user.enum';
import authorization from '../middleware/authorization.middleware';
import { validate } from '../middleware/validate';
import { updateRoleSchema, createUserByAdminSchema } from '../schemas/userSchema';

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

/**
 * @swagger
 * /users/role/{userId}:
 *   put:
 *     summary: Update User Role
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
 *             required:
 *               - role
 *             properties:
 *               role:
 *                 type: string
 *                 enum: [SUPER_ADMIN, ADMIN, USER, STAFF]
 *     responses:
 *       200:
 *         description: User role updated successfully
 *       400:
 *         description: Bad request - missing or invalid role
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Not enough permissions
 *       404:
 *         description: User not found
 */
userRouter.put('/role/:userId', authenticateToken, authorization([Role.SUPER_ADMIN, Role.ADMIN]), validate(updateRoleSchema), asyncHandler(usersController.updateRole));

/**
 * @swagger
 * /users/create-user:
 *   post:
 *     summary: Create User by Admin
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
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *             properties:
 *               firstName: { type: string }
 *               lastName: { type: string }
 *               email: { type: string }
 *               password: { type: string }
 *               phone: { type: string }
 *               role: { type: string, enum: [SUPER_ADMIN, ADMIN, USER, STAFF] }
 *     responses:
 *       201:
 *         description: User created successfully by admin
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Not enough permissions
 *       409:
 *         description: User already exists
 */
userRouter.post('/create-user', authenticateToken, authorization([Role.SUPER_ADMIN, Role.ADMIN]), validate(createUserByAdminSchema), asyncHandler(usersController.createUser));

export default userRouter;
