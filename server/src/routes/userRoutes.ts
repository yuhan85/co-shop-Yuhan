import express, { Request, Response, NextFunction } from 'express';
import { body, param } from 'express-validator';
import { validateRequest } from '../middleware/validateRequest';
import {
    getUserbyID,
    updateUser,
    deleteUser
} from '../controllers/userController';
import AuthMiddleware from '../middleware/auth.middleware';

const router = express.Router();
const authMiddleware = new AuthMiddleware();

/** 
 * @route GET /api/users/profile
 * @desc get a user profile
 * @access Protected
 */
router.get(
    '/profile',
    validateRequest,
    getUserbyID
);

/** 
 * @route PUT /api/users/profile
 * @desc Update a user profile
 * @access Protected
 */
router.put(
    '/profile',
    authMiddleware.verifyToken,
    body('name').optional().isString(),
    body('family_name').optional().isString(),
    body('email').optional().isEmail(),
    body('avatar').optional().isString(),
    validateRequest,
    updateUser
);

/** 
 * @route DELETE /api/users/account
 * @desc Delete a user
 * @access Protected
 */
router.delete(
    '/account',
    authMiddleware.verifyToken,
    validateRequest,
    deleteUser
);

export default router;



