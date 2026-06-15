// export default router;

import { Router } from "express";
import { signupSchema, loginSchema } from "../schemas/userSchema";
import { validate } from "../middleware/validate";
import asyncHandler from "../middleware/asyncHandler.middleware";
import { AccountController } from "../controllers/auth.controller";
import { container } from "../config/ioc.config";
import { TYPES } from "../config/ioc.types";
import { authenticateToken } from "../middleware/authentication.middleware";

const accountRouter = Router();

const accountController = container.get<AccountController>(
  TYPES.AccountController
);

/**
 * @swagger
 * tags:
 *   - name: Account
 *     description: Authentication
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login
 *     tags: [Account]
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
 *             properties:
 *               email: { type: string }
 *               password: { type: string }
 *             example:
 *               email: admin@test.com
 *               password: "Admin123!@#"
 *     responses:
 *       200: { description: Success }
 */
accountRouter.post("/login", [validate(loginSchema)], asyncHandler(accountController.login));

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout the current user
 *     tags: [Account]
 *     parameters:
 *       - in: header
 *         name: clientId
 *         schema:
 *           type: string
 *         required: true
 *         description: Enter Client Id
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
accountRouter.post("/logout", authenticateToken, asyncHandler(accountController.logout));

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Create User
 *     tags: [Account]
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
 *             properties:
 *               firstName: { type: string }
 *               lastName: { type: string }
 *               email: { type: string }
 *               password: { type: string }
 *               phone: { type: string }
 *               isRegisterbyShop: { type: boolean }
 *     responses:
 *       201: { description: Created }
 */
accountRouter.post("/signup", [validate(signupSchema)], asyncHandler(accountController.register));

/**
 * @swagger
 * /auth/refreshToken:
 *   post:
 *     summary: Refresh JWT Token
 *     tags: [Account]
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
 *               - token
 *             properties:
 *               token:
 *                 type: string
 *                 example: ""
 *     responses:
 *       200:
 *         description: OTP sent (or masked success response)
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
accountRouter.post("/refreshToken", authenticateToken, asyncHandler(accountController.refreshToken));

/**
 * @swagger
 * /auth/otp/send:
 *   post:
 *     summary: Request OTP for password reset
 *     tags: [Account]
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
 *         description: OTP sent (or masked success response)
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
accountRouter.post("/otp/send", authenticateToken, asyncHandler(accountController.sentOtp));

/**
 * @swagger
 * /auth/verify:
 *   post:
 *     summary: Reset password using OTP
 *     tags: [Account]
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
 *               - email
 *               - otp
 *             properties:
 *               email:
 *                 type: string
 *                 example: "kumar@gmail.com"
 *               otp:
 *                 type: string
 *                 example: "7452"
 *                 description: OTP received on email
 *     responses:
 *       200:
 *         description: Password reset successful
 *       400:
 *         description: Invalid OTP / expired OTP / password mismatch
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
accountRouter.get("/verify/:otp", authenticateToken, asyncHandler(accountController.otpVerify));

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Request OTP for password reset
 *     tags: [Account]
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
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *     responses:
 *       200:
 *         description: OTP sent (or masked success response)
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
accountRouter.post("/forgot-password", asyncHandler(accountController.forgotPassword));

/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Reset password using OTP
 *     tags: [Account]
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
 *               - otp
 *               - newPassword
 *               - confirmPassword
 *             properties:
 *               otp:
 *                 type: string
 *                 example: "7452"
 *                 description: OTP received on email
 *               newPassword:
 *                 type: string
 *                 example: "NewStrong@123"
 *               confirmPassword:
 *                 type: string
 *                 example: "NewStrong@123"
 *     responses:
 *       200:
 *         description: Password reset successful
 *       400:
 *         description: Invalid OTP / expired OTP / password mismatch
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
accountRouter.post("/reset-password", asyncHandler(accountController.resetPassword));

export default accountRouter;